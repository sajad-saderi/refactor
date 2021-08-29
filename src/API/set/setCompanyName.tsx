import axios from "axios";
import Error_middleware from "../ApiUtils";

const DOMAIN = process.env.PRODUCTION_ENDPOINT;
const SET_COMPANY_NAME = "/core/user/set-company-name";

export const REQUEST_SET_COMPANY_NAME = (data: ICompanyName) => {
  return new Promise((resolve, reject) => {
    axios
      .post(
        DOMAIN + SET_COMPANY_NAME,
        {
          company_name: data.company_name,
        },
        {
          headers: {
            Authorization: "Bearer " + data.token,
          },
        }
      )
      .then((response) => {
        if (response.data.success) {
          resolve(response.data.data);
        }
      })
      .catch((e) => {
        Error_middleware(e);
        reject(
          e.response
            ? e.response.data.message
            : e.message === "Network Error"
            ? "خطا در اتصال به شبکه، لطفا از اتصال دستگاه به اینترنت مطمئن شوید."
            : e.message
        );
      });
  });
};

interface ICompanyName {
  token: string;
  company_name: string;
}
