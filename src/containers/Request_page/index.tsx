import React, { useState, useEffect } from "react";
import jsCookie from "js-cookie";
import { GET_ORDER_REQUEST } from "../../API";
import Router from "next/router";
import "./Requests_page.module.scss";
import Request_cart from "./request_cart";

const token = jsCookie.get("token");

const Request_page = () => {
  const [result, setResult] = useState([]);

  useEffect(() => {
    fetchAPI(Router.router.query.id);
    // const complete_register = jsCookie.get("complete_register");
    // if (!complete_register) {
    //   alert("you are mot login ");
    //   return;
    // }
  }, []);

  const fetchAPI = async id => {
    try {
      const res: any = await GET_ORDER_REQUEST({
        id,
        token
      });
      console.log(res);
      setResult([res.data]);
    } catch (e) {
      console.log(e.response);
    }
  };

  return (
    <article className="responsive minHeight requests_page_container">
      {result ? (
        <>
          <section className="requests_section">
            {result.map((item, i) => {
              return (
                <div className="Request_car" key={i}>
                  <Request_cart data={item} />
                </div>
              );
            })}
          </section>
        </>
      ) : (
        <p>jsj</p>
      )}
    </article>
  );
};

export default Request_page;
