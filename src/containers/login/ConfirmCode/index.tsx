import { useState, useContext, useRef } from 'react';
import toast_context from '../../../context/Toast_context';
import { useRouter } from 'next/router';
import Button from '../../../components/form/Button';
import NumberSeparatedTextInput from '../../../components/form/NumberSeparatedTextInput';
import context_user from '../../../context/User_info';
import jsCookie from 'js-cookie';
import Error_middleware from '../../../API/ApiUtils';
import ErrorHelper from '../../../../utils/error_helper';
import { dynamicString } from '../../../helpers/dynamicString';
import languageCTX from '../../../context/languageCTX';
import { numberChanger } from '../../../../utils/numberChanger';
import { errorCodeFormatter } from '../../../../utils/errorCodeFormatter';
import { axiosInstance } from '../../../../utils/axiosInstance';
import styles from './confirmCode.module.scss';
import Icon from '../../../components/Icons';
import classNames from 'classnames';

const ConfirmCode: React.FC<{
  cellPhone: string;
  language: any;
  inactivateForm: boolean;
  panelController: () => void;
}> = ({ cellPhone, language, inactivateForm, panelController }) => {
  const [code, setCode] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState({
    status: false,
    message: ''
  });
  const router = useRouter();
  const user = useContext(context_user);
  const toastCTX = useContext(toast_context);
  const buttonRef = useRef(null);
  const { activeLanguage } = useContext(languageCTX);

  const sendConfirmCode = (e) => {
    e.preventDefault();
    if (!code) {
      return;
    }
    setLoading(true);
    const SEND_CONFIRM_CODE = '/core/device/login';
    let cellNumber = cellPhone;
    if (/^[9][0-9][0-9]{8,8}$/.test(cellNumber)) {
      cellNumber = '0' + cellPhone;
    }
    let utm = sessionStorage['send_utm_data']
      ? {
          utm_source: localStorage['utm_source']
            ? localStorage['utm_source']
            : '',
          utm_medium: localStorage['utm_medium']
            ? localStorage['utm_medium']
            : '',
          utm_campaign: localStorage['utm_campaign']
            ? localStorage['utm_campaign']
            : '',
          utm_referrer: localStorage['utm_referrer']
            ? localStorage['utm_referrer']
            : '',
          utm_term: localStorage['utm_term'] ? localStorage['utm_term'] : '',
          utm_content: localStorage['utm_content']
            ? localStorage['utm_content']
            : '',
          utm_landing_url: localStorage['utm_landing_url']
            ? localStorage['utm_landing_url']
            : ''
        }
      : {};
    axiosInstance({
      method: 'POST',
      url: process.env.PRODUCTION_ENDPOINT + SEND_CONFIRM_CODE,
      data: {
        cell: cellNumber,
        code: numberChanger(code, 'en  '),
        ...utm
      }
    })
      .then((response) => {
        // setLoading(false);
        const cook_option = {
          expires: 100
        };
        if (response.data.token) {
          // If the user hasn't completed the registration
          const data = response.data;
          if (!data.user_profile.first_name) {
            // save data in cache
            window['complete_register'] = false;
            // NOTE: save data in cache and active heap
            try {
              if (window['heap']) {
                window['heap'].identify(`${cellNumber}`);
              }
            } catch (e) {
              console.log('Em...I think heap is not work correctly :/');
            }
            router.replace(
              {
                pathname: '/complete-register'
              },
              undefined,
              { locale: activeLanguage }
            );
          }
          // if user completely registered
          else {
            jsCookie.set(
              'first_name',
              data.user_profile.first_name,
              cook_option
            );
            window['complete_register'] = true;
            // NOTE: activate heap
            try {
              if (window['heap']) {
                window['heap'].identify(`${cellNumber}`);
                window['heap'].addUserProperties({
                  Name: `${data.user_profile.first_name}-${data.user_profile.last_name}`
                });
              }
            } catch (e) {
              console.log('Em...I think heap is not work correctly :/');
            }
            if (localStorage['last_location'] !== '/add-car') {
              const url = decodeURIComponent(localStorage['last_location']);

              router.replace(url, undefined, { locale: activeLanguage });
            } else
              router.replace(
                {
                  pathname: '/add-car'
                },
                undefined,
                { locale: activeLanguage }
              );
            // router.push(
            //   localStorage["last_location"]
            //     ? localStorage["last_location"]
            //     : "/"
            // );
          }
          jsCookie.set('token', response.data.token, cook_option);
          jsCookie.set('user_id', data.user_profile.id, cook_option);
          user.update_user_data({
            ...data.user_profile,
            token: response.data.token
          });
          // set authorize to auth context
          window['auth'] = true;
        } else {
          // TODO: handle errors
          console.error('error');
        }
      })
      .catch((error) => {
        Error_middleware(e);
        setLoading(false);
        if (
          error.response.data.error === 'INVALID_CODE' ||
          error.response.data.error === 'EXPIRED_CODE'
        ) {
          setError({
            status: true,
            message:
              activeLanguage === 'fa'
                ? error.response.data.message
                : errorCodeFormatter(error.response.data.error)
          });
        } else
          toastCTX.toast_option({
            message: error.response
              ? ErrorHelper({
                  errorObj: error.response,
                  _400Message: language.COMMON.errorInSendingCode
                })
              : error,
            color: '#ed9026',
            time: 0,
            autoClose: false
          });
      });
  };

  return (
    <>
      <div className={styles.title}>
        <span className={styles.icon} onClick={panelController}>
          <Icon
            name='arrow'
            width='35px'
            height='35px'
            color='#4ba3ce'
            rotate={activeLanguage === 'fa' ? 180 : 0}
          />
        </span>
        <h2>{language.LOGIN.title}</h2>
      </div>
      <form className={styles.form} onSubmit={sendConfirmCode}>
        <NumberSeparatedTextInput
          error={error}
          name='code'
          onChangeHandler={(e) => {
            setCode(e);
          }}
          value={numberChanger(code, activeLanguage)}
          label={numberChanger(
            dynamicString([cellPhone], language.LOGIN.label),
            activeLanguage
          )}
          validation={{
            number: true,
            length: 4,
            messages: {
              required: language.LOGIN.error4,
              length: language.LOGIN.error5
            },
            required: true
          }}
          tabToButton={() => buttonRef.current.focus()}
          language={language}
          locale={activeLanguage}
        />
        <Button
          reference={buttonRef}
          disable={inactivateForm}
          customClass={classNames(
            styles.localClass,
            'actionButton',
            inactivateForm ? 'disable_BTN' : null
          )}
          value={language.LOGIN.enter}
          loading={loading}
          click={() => {}}
        />
      </form>
    </>
  );
};

export default ConfirmCode;
