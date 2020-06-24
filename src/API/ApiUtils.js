import Router from "next/router";

const Error_middleware = (error) => {
  if (error.response) {
    if (error.response.status === 500) {
      Router.push("/500");
    }
  }
};

export default Error_middleware;
