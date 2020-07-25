import React, { useState, useEffect, useContext } from "react";
import jsCookie from "js-cookie";
import { REQUEST_GET_ORDER_REQUESTS } from "../../API";
import Router from "next/router";
// import "./Requests_page.scss";
import Request_cart from "./request_cart";
import Requests_filter from "./Requests_filter";
import Auth_context from "../../../src/context/Auth_context";
import PleaseLogin from "../../components/PleaseLogin";
import Requests_page_Loading from "../../components/cartPlaceholder/requestLoading";
import Spinner from "../../components/Spinner";

let filter_id = [];
let page = 1;

const Requests_page = () => {
  const [result, setResult] = useState(null);
  const [Authorize, setAuthorize] = useState(false);
  const [show, setShow] = useState(false);
  const [showMoreButton, setShowMoreButton] = useState(false);
  const [show_spinner_loadMore, setShow_spinner_loadMore] = useState(false);

  const AUTH_CONTEXT = useContext(Auth_context);

  const token = jsCookie.get("token");

  useEffect(() => {
    const complete_register = jsCookie.get("complete_register")
    if (complete_register !== "true") {
      Router.push("/complete-register")
    } else if (jsCookie.get("complete_register") === "true") {
      setAuthorize(true);
      fetchAPI({
        page,
      });
    }
    setShow(true);
    return () => {
      filter_id = [];
      page = 1;
    };
  }, []);

  useEffect(() => {
    if (AUTH_CONTEXT.Auth) {
      fetchAPI({
        page,
      });
    }
  }, [AUTH_CONTEXT.Auth]);

  const fetchAPI = async (data) => {
    if (data.page <= 1) {
      setResult(null);
    }
    try {
      const res: any = await REQUEST_GET_ORDER_REQUESTS({
        ...data,
        token: token,
      });
      if (page > 1) {
        setShow_spinner_loadMore(false);
        setResult((result) => result.concat(res.items));
      } else {
        setResult(res.items);
        console.log(res);
      }
      if (res.total_count > 14 && res.remained_count > 0) {
        setShowMoreButton(true);
      } else setShowMoreButton(false);
    } catch (e) {
      console.log(e);
    }
  };

  const filterHandler = (value, option) => {
    if (option === "add") {
      filter_id.push(value);
    } else {
      filter_id = filter_id.filter((i) => i !== value);
    }
    page = 1;
    fetchAPI({
      page: 1,
      status_id: filter_id.join(","),
    });
  };

  const nextPage = () => {
    page = 1 + page;
    setShow_spinner_loadMore(true);
    if (filter_id.length > 0) {
      fetchAPI({
        page,
        status_id: filter_id.join(","),
      });
    } else {
      fetchAPI({
        page,
      });
    }
  };

  return show ? (
    Authorize || AUTH_CONTEXT.Auth ? (
      <article className="responsive ">
        <section className="requests_page_container">
          <Requests_filter filter_list={filterHandler} />
          <section className="requests_section">
            {result
              ? result.length > 0 ? (
                <>
                  {result.map((item, i) => {
                    return (
                      <div className="Request_car" key={i}>
                        <Request_cart
                          data={item}
                          getDataAgain={() => {
                            page = 1;
                            fetchAPI({
                              page: 1,
                              status_id: filter_id.join(","),
                            });
                          }}
                        />
                      </div>
                    );
                  })}
                </>
              ) : <p className="NoResult">تا به حال سفارشی نداشته‌اید.</p> : (
                <>
                  <Requests_page_Loading />
                  <Requests_page_Loading />
                  <Requests_page_Loading />
                  <Requests_page_Loading />
                </>
              )}
          </section>
        </section>
        {showMoreButton ? (
          <span className="Load_more_car" onClick={nextPage}>
            {show_spinner_loadMore ? (
              <Spinner display="block" width={20} color="#9E9E9E" />
            ) : (
                "نمایش ماشین‌های بیشتر"
              )}
          </span>
        ) : null}
      </article>
    ) : (
        <PleaseLogin />
      )
  ) : <article className="minHeight"></article>
};

export default Requests_page;
