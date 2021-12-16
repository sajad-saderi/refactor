import { useContext } from 'react';
import languageCTX from '../src/context/languageCTX';
import fa from '../public/languages/fa.json'
import en from '../public/languages/en.json'
import Router from 'next/router';

const ErrorHelper = ({ errorObj, _400Message = null, authMessage = null }) => {

  if (errorObj.status === 400) {
    return _400Message ? _400Message : Router.router.locale === 'fa' ? fa.COMMON.noResultFind : en.COMMON.noResultFind;
  } else if (errorObj.status === 401) {
    return authMessage
      ? authMessage
      : Router.router.locale === 'fa' ? fa.COMMON.loginFirst : en.COMMON.loginFirst;
  }
};

export default ErrorHelper;
