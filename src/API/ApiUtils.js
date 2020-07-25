import Router from "next/router";

const flag = 0;
const Error_middleware = (error) => {
  // console.log(flag);
  // if (error.response) {
  //   if (error.response.status === 500) {
  //     Router.push("/500");
  //   }
  // }
};

export default Error_middleware;
