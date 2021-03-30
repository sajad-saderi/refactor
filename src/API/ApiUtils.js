import Router from "next/router";
import * as Sentry from "@sentry/browser";

const Error_middleware = (error) => {
  if (process.env.NODE_ENV !== "development") {
    Sentry.captureException(error);
  }
  if (error.response) {
    if (error.response.status === 500) {
      Router.push("/500");
    }
    if (error.response.status === 404) {
      Router.push("/500");
    }
  }
};

export default Error_middleware;
