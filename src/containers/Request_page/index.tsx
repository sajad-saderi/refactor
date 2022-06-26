import { useState, useEffect, useContext } from 'react';
import jsCookie from 'js-cookie';
import { GET_ORDER_REQUEST } from '../../API';
import { useRouter } from 'next/router';
import net_CTX from '../../context/internetConnectionCTX';
import languageCTX from '../../context/languageCTX';
import Requests_page_Loading from '../../components/cartPlaceholder/requestLoading';
import context_user from '../../context/User_info';
import { guard_controller } from '../../../utils/guard_controller';
import ErrorHelper from '../../../utils/error_helper';
import toast_context from '../../context/Toast_context';
import { ILocale } from '../../../types';
import Request_cart from './request_cart';

const Request_page: React.FC<{
  language: ILocale;
  id: string;
}> = ({ language, id }) => {
  const [result, setResult] = useState([]);
  const [show, setShow] = useState(false);
  const router = useRouter();
  const token = jsCookie.get('token');
  const user = useContext(context_user);
  const toastCTX = useContext(toast_context);
  const netCTX = useContext(net_CTX);
  const { activeLanguage } = useContext(languageCTX);

  useEffect(() => {
    const guard = guard_controller();
    if (guard !== 'auth') {
      router.push(`/${guard}`);
      return;
    }
    if (user.data) {
      if (window['auth'] && user.data?.first_name) {
        if (user.data.first_name) {
          fetchAPI(id);
        }
      } else {
        if (
          router.asPath !== '/login' &&
          router.asPath !== '/complete-register'
        )
          localStorage['last_location'] = router.asPath;
        else {
          localStorage['last_location'] = '/';
        }
        router.push('/login');
      }
      setShow(true);
    }
  }, [user]);

  const fetchAPI = async (id: string) => {
    try {
      const res: any = await GET_ORDER_REQUEST({
        id,
        token
      });
      setResult([res.data]);
    } catch (error) {
      if (error === 111) {
        netCTX.toggleTheContainer(true);
      } else
        toastCTX.toast_option({
          message: error.response
            ? ErrorHelper({ errorObj: error.response })
            : error,
          color: '#ed9026',
          time: 0,
          autoClose: false
        });
    }
  };

  return show ? (
    <article className='responsive minHeight request_page_container'>
      <section className='request_section'>
        {result.length > 0 ? (
          <>
            {result.map((item, i) => {
              return (
                <div
                  className='Request_car'
                  key={i}
                  dir={activeLanguage === 'fa' ? 'rtl' : 'ltr'}>
                  <Request_cart
                    language={language}
                    data={item}
                    getDataAgain={(id) => {
                      fetchAPI(id);
                    }}
                  />
                </div>
              );
            })}
          </>
        ) : (
          <Requests_page_Loading />
        )}
      </section>
    </article>
  ) : (
    <article className='minHeight'></article>
  );
};

export default Request_page;
