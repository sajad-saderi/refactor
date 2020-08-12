import Router from "next/router";
import * as Sentry from "@sentry/browser";

const Error_middleware = (error) => {
  window.hj =
    window.hj ||
    function() {
      (hj.q = hj.q || []).push(arguments);
    };
  if (error.response) {
    if (error.response.status === 500) {
      hj("tagRecording", ["505 PAGE"]);
      Sentry.captureException(error);
      Router.push("/500");
    }
    if (error.response.status === 404) {
      hj("tagRecording", ["404 API NOT FOUND"]);
      Sentry.captureException(error);
      Router.push("/500");
    }
  }
};

export default Error_middleware;
