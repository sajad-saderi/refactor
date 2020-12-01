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
      localStorage["last_location"] = Router.router.asPath;
    }
    return "login";
  }
};
