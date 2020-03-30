import React, { useState, useEffect } from "react";
import jsCookie from "js-cookie";
import { REQUEST_GET_ORDER_REQUESTS } from "../../API";
import Router from "next/router";
import "./Requests_page.module.scss";
import Request_cart from "./request_cart";

const Requests_page = () => {
  const [result, setResult] = useState([]);

  useEffect(() => {
    const complete_register = jsCookie.get("complete_register");

    if (!complete_register) {
      alert("you are mot login ");
      return;
    }
    fetchAPI();
  }, []);

  const fetchAPI = async () => {
    const token = jsCookie.get("token");
    try {
      const res: any = await REQUEST_GET_ORDER_REQUESTS({
        token: token
      });
      console.log(res.items);
      setResult(res.items);
    } catch (e) {
      console.log(e.response);
    }
  };

  return (
    <article>
      {result.length > 0 ? (
        result.map((item, i) => {
          return (
            <div key={i}>
              <Request_cart data={item} />
            </div>
          );
        })
      ) : (
        <p>jsj</p>
      )}
    </article>
  );
};

export default Requests_page;
