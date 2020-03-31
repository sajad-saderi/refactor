import React, { useState, useEffect } from "react";
import jsCookie from "js-cookie";
import { REQUEST_GET_ORDER_REQUESTS } from "../../API";
import Router from "next/router";
import "./Requests_page.module.scss";
import Request_cart from "./request_cart";
import Requests_filter from "./Requests_filter";

let filter_id = [];
let page = 1;
const token = jsCookie.get("token");

const Requests_page = () => {
  const [result, setResult] = useState([]);

  useEffect(() => {
    const complete_register = jsCookie.get("complete_register");

    if (!complete_register) {
      alert("you are mot login ");
      return;
    }
    fetchAPI({
      page
    });
  }, []);

  const fetchAPI = async data => {
    try {
      const res: any = await REQUEST_GET_ORDER_REQUESTS({
        ...data,
        token: token
      });
      console.log(res.items);
      if (data.page > 1) {
        setResult(result => result.concat(res.items));
      } else {
        setResult(res.items);
      }
    } catch (e) {
      console.log(e.response);
    }
  };

  const filterHandler = (value, option) => {
    console.log(value, option);
    if (option === "add") {
      filter_id.push(value);
    } else {
      filter_id = filter_id.filter(i => i !== value);
    }
    page = 1;
    fetchAPI({
      page: 1,
      status_id: filter_id.join(",")
    });
  };

  const nextPage = () => {
    page = 1 + page;
    if (filter_id.length > 0) {
      fetchAPI({
        page,
        status_id: filter_id.join(",")
      });
    } else {
      fetchAPI({
        page
      });
    }
  };

  return (
    <article className="responsive ">
      <section className="requests_page_container">
        <section className="filter_section">
          <Requests_filter filter_list={filterHandler} />
        </section>
        {result.length > 0 ? (
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
      </section>
      <p onClick={nextPage}>نمایش بیشتر</p>
    </article>
  );
};

export default Requests_page;
