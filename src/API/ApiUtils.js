import Router from "next/router";

const Error_middleware = (error) => {
  console.log("ERROR LOG", error);
  if (error.response.status === 500 || error.status === 500) {
    Router.push("/500");
  }
};

export default Error_middleware;
