import React, { useState, useEffect, useContext } from "react";
import jsCookie from "js-cookie";
import { REQUEST_GET_ORDER_REQUESTS } from "../../API";
import Router from "next/router";
// import "./Requests_page.scss";
import Request_cart from "./request_cart";
import Requests_filter from "./Requests_filter";
import Modal_context from "../../../src/context/Modal_context";
import Auth_context from "../../../src/context/Auth_context";
import PleaseLogin from "../../components/PleaseLogin";
import Requests_page_Loading from "../../components/cartPlaceholder/requestLoading";

let filter_id = [];
let page = 1;

const Requests_page = () => {
  const [result, setResult] = useState([]);
  const [Authorize, setAuthorize] = useState(false);
  const [showMoreButton, setShowMoreButton] = useState(false);

  const MODAL_CONTEXT = useContext(Modal_context);
  const AUTH_CONTEXT = useContext(Auth_context);

  useEffect(() => {
    if (jsCookie.get("complete_register") === "true") {
      setAuthorize(true);
      fetchAPI({
        page,
      });
    } else {
      MODAL_CONTEXT.modalHandler("Login");
    }
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
    const token = jsCookie.get("token");
    if (data.page <= 1) {
      setResult([]);
    }
    try {
      const res: any = await REQUEST_GET_ORDER_REQUESTS({
        ...data,
        token: token,
      });
      if (page > 1) {
        setResult((result) => result.concat(res.items));
      } else {
        setResult(res.items);
        console.log(res);
      }
      if (res.total_count > 14 && res.remained_count > 0) {
        setShowMoreButton(true);
      } else setShowMoreButton(false);
    } catch (e) {
      console.log(e.response);
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

  return Authorize || AUTH_CONTEXT.Auth ? (
    <article className="responsive ">
      <section className="requests_page_container">
        <Requests_filter filter_list={filterHandler} />
        <section className="requests_section">
          {result.length > 0 ? (
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
          ) : (
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
          نمایش ماشین‌های بیشتر
        </span>
      ) : null}
    </article>
  ) : (
    <PleaseLogin />
  );
};

export default Requests_page;
