import Router from "next/router";

export const guard_controller = () => {
  if (window["auth"]) {
    if (!window["complete_register"]) {
      return "complete-register";
    } else {
      return "auth";
    }
  } else {
    if (window.localStorage) {
      if (
        Router.router.asPath !== "/login" &&
        Router.router.asPath !== "/complete-register"
      )
        localStorage["last_location"] = Router.router.asPath;
      else {
        localStorage["last_location"] = "/";
      }
    }
    return "login";
  }
};
