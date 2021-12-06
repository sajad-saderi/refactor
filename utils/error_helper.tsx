import { useContext } from 'react';
import languageCTX from '../src/context/languageCTX';
import fa from '../public/languages/fa.json'
import en from '../public/languages/en.json'

const ErrorHelper = ({ errorObj, _400Message = null, authMessage = null }) => {
  const { activeLanguage } = useContext(languageCTX)
  if (errorObj.status === 400) {
    return _400Message ? _400Message : activeLanguage === 'fa' ? fa.COMMON.noResultFind : en.COMMON.noResultFind;
  } else if (errorObj.status === 401) {
    return authMessage
      ? authMessage
      : activeLanguage === 'fa' ? fa.COMMON.loginFirst : en.COMMON.loginFirst;
  }
};

export default ErrorHelper;
