import { useState, useEffect, useContext } from "react";
import jsCookie from "js-cookie";
import { GET_ORDER_REQUEST } from "../../API";
import { useRouter } from "next/router";
import dynamic from "next/dynamic";

const Requests_page_Loading = dynamic(() =>
  import("../../components/cartPlaceholder/requestLoading")
);
// import Requests_page_Loading from "../../components/cartPlaceholder/requestLoading";
import context_user from "../../context/User_info";
import { guard_controller } from "../../../utils/guard_controller";
const Request_cart = dynamic(() => import("./request_cart"));
// import Request_cart from "./request_cart";

const Request_page = ({ language }: IRequest_page) => {
  const [result, setResult] = useState([]);
  const [show, setShow] = useState(false);
  const router = useRouter();
  const token = jsCookie.get("token");
  const user_info = useContext(context_user);

  useEffect(() => {
    const guard = guard_controller();
    if (guard !== "auth") {
      router.push(`/${guard}`);
      return;
    }
    if (user_info.data) {
      if (window["auth"] && user_info.data?.first_name) {
        if (user_info.data.first_name) {
          fetchAPI(router.query.id);
        }
      } else {
        if (
          router.asPath !== "/login" &&
          router.asPath !== "/complete-register"
        )
          localStorage["last_location"] = router.asPath;
        else {
          localStorage["last_location"] = "/";
        }
        router.push("/login");
      }
      setShow(true);
    }
  }, [user_info]);

  const fetchAPI = async (id) => {
    try {
      const res: any = await GET_ORDER_REQUEST({
        id,
        token,
      });
      if (res.data.status.id !== "new") {
        router.push("/requests");
      } else {
        setResult([res.data]);
      }
    } catch (error) {
      console.log("!Error", error);
    }
  };

  return show ? (
    <article className='responsive minHeight request_page_container'>
      <section className='request_section'>
        {result.length > 0 ? (
          <>
            {result.map((item, i) => {
              return (
                <div className='Request_car' key={i}>
                  <Request_cart
                    language={language.request_cart}
                    data={item}
                    getDataAgain={(id) => {
                      fetchAPI(id);
                    }}
                  />
                </div>
              );
            })}
          </>
        ) : (
          <Requests_page_Loading />
        )}
      </section>
    </article>
  ) : (
    <article className='minHeight'></article>
  );
};

interface IRequest_page {
  language?: any;
}

export default Request_page;
