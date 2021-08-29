const ErrorHelper = ({ errorObj, _400Message = null, authMessage = null }) => {
  if (errorObj.status === 400) {
    return _400Message ? _400Message : "نتیجه ای برای درخواست شما یافت نشد.";
  } else if (errorObj.status === 401) {
    return authMessage
      ? authMessage
      : "برای دسترسی به این بخش به حساب کاربری خود وارد شوید.";
  }
};

export default ErrorHelper;
