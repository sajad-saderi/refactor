import { useContext, useEffect, useState } from 'react';
import dynamic from 'next/dynamic';

const Profile_info = dynamic(() => import('./Profile_info'));
// const Profile_Cars = dynamic(() => import("./Profile_Cars"));
// import Profile_info from "./Profile_info";
import Profile_Cars from './Profile_Cars';
import jsCookie from 'js-cookie';
import Router from 'next/router';
import { REQUEST_GET_USER_INFO } from '../../API';
import context_user from '../../context/User_info.js';
import context_toast from '../../context/Toast_context';
import { NextSeo } from 'next-seo';
import { guard_controller } from '../../../utils/guard_controller';
import ErrorHelper from '../../../utils/error_helper';
import net_CTX from '../../context/internetConnectionCTX';
import { dynamicString } from '../../helpers/dynamicString';

const Profile_container = ({ language }: IProfile_container) => {
  const [is_mine, setIs_mine] = useState(false);
  const [profile_Id, setProfile_Id] = useState(null);
  const [data, setData] = useState(null);
  const user = useContext(context_user);
  const toastCTX = useContext(context_toast);
  const netCTX = useContext(net_CTX);

  useEffect(() => {
    fetchApi();
  }, []);

  const fetchApi = async () => {
    const user_id = jsCookie.get('user_id');
    try {
      const user_cars_info: any = await REQUEST_GET_USER_INFO({
        id: Router.router.query.id
          ? Router.router.query.id
          : Router.router.locale !== 'fa'
          ? location.pathname.split('/')[3]
          : location.pathname.split('/')[2],
      });
      // window['dataLayer'].push({
      //   event: 'page_view',
      //   pageURL: window.location.href,
      //   pagePath: `/user/${user_cars_info.id}`,
      //   pageTitle: dynamicString([user_cars_info.company_name
      //     ? user_cars_info.company_name
      //     : user_cars_info.name], language.PAGE_HEADER.user.title),
      // });
      if (user_id == user_cars_info.id) {
        setIs_mine(true);
        const guard = guard_controller();
        if (guard !== 'auth') {
          Router.router.push(`/${guard}`);
          return;
        }
      }
      setProfile_Id(user_cars_info.id);
      setData(user_cars_info);
    } catch (error) {
      if (error === 111) {
        netCTX.toggleTheContainer(true);
      } else
        toastCTX.toast_option({
          message: error.response
            ? ErrorHelper({
                errorObj: error.response,
                _400Message: language.USER.error1,
              })
            : error,
          color: '#ed9026',
          time: 0,
          autoClose: false,
        });
    }
  };

  return (
    <article className='responsive minHeight profile_container'>
      {data ? (
        <>
          <NextSeo
            title={dynamicString(
              [data.company_name ? data.company_name : data.name],
              language.PAGE_HEADER.user.title
            )}
            description={language.PAGE_HEADER.user.description}
            openGraph={{
              title: dynamicString(
                [data.company_name ? data.company_name : data.name],
                language.PAGE_HEADER.user.title
              ),
              description: language.PAGE_HEADER.user.description,
              site_name: language.COMMON.sepris,
            }}
            twitter={{
              handle: language.PAGE_HEADER.handle,
              site: language.PAGE_HEADER.site,
              cardType: language.PAGE_HEADER.cardType,
            }}
          />
          <Profile_info data={data} is_mine={is_mine} language={language} />
          <Profile_Cars
            is_mine={is_mine}
            profile_Id={profile_Id}
            language={language}
            user_data={data}
          />
        </>
      ) : (
        <NextSeo
          title={dynamicString(['کاربر'], language.PAGE_HEADER.user.title)}
          description={language.PAGE_HEADER.user.description}
        />
      )}
    </article>
  );
};

interface IProfile_container {
  language: any;
}

export default Profile_container;
