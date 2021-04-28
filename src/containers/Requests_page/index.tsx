import React, { useState, useEffect, useContext } from "react";
import { REQUEST_GET_ORDER_REQUESTS } from "../../API";
import { useRouter } from "next/router";
// import "./Requests_page.scss";
import Request_cart from "./request_cart";
import Requests_filter from "./Requests_filter";
import context_user from "../../../src/context/User_info";
import PleaseLogin from "../../components/PleaseLogin";
import Requests_page_Loading from "../../components/cartPlaceholder/requestLoading";
import Spinner from "../../components/Spinner";
import { IoIosArrowDown } from "react-icons/io";
import { guard_controller } from "../../../utils/guard_controller";
import moment from "moment-jalaali";

let filter_id = [];
let page = 1;
let start_date = null;
let end_date = null;
let until_date = null;
let initial_fetch = false;

const Requests_page = ({ language }: IRequests_page) => {
  const [result, setResult] = useState(null);
  const [show, setShow] = useState(false);
  const [totalCount, setTotalCount] = useState(0);
  const [showMoreButton, setShowMoreButton] = useState(false);
  const [show_spinner_loadMore, setShow_spinner_loadMore] = useState(false);
  const [active_filters, setActive_filters] = useState(null);
  const [active_orders, setActive_orders] = useState(null);

  const [deactivate_orders, setDeactivate_orders] = useState(null);
  const [activeTab, setActiveTab] = useState(1);

  const user = useContext(context_user);
  const token = user.data?.token;
  const router = useRouter();

  useEffect(() => {
    const guard = guard_controller();
    if (guard !== "auth") {
      router.push(`/${guard}`);
      return;
    }

    if (user.data) {
      // if (router.query.status_id) {
      //   fetchAPI({
      //     page,
      //     status_id: router.query.status_id,
      //   });
      //   filter_id = (router.query.status_id as string).split(",");
      //   setActive_filters(filter_id);
      // } else {
      let t_start_date = moment()
        .subtract(7, "d")
        .format("jYYYY/jM/jD");
      start_date = t_start_date;
      let t_end_date = moment().format("jYYYY/jM/jD");
      fetchAPI({
        page: 1,
        creation_time_from: t_start_date,
      });
      end_date = t_end_date;
      // }
      setShow(true);
      return () => {
        filter_id = [];
        page = 1;
        start_date = null;
        end_date = null;
        until_date = null;
        initial_fetch = false;
      };
    }
  }, [user]);

  // useEffect(() => {
  //   if (AUTH_CONTEXT.Auth) {
  //     fetchAPI({
  //       page,
  //     });
  //   }
  // }, [AUTH_CONTEXT.Auth]);

  const fetchAPI = async (data, tab = 1) => {
    if (tab === 2 && initial_fetch && data.page <= 1) {
      return;
    }
    if (data.page <= 1) {
      setActive_orders(null);
    }
    try {
      const res: any = await REQUEST_GET_ORDER_REQUESTS({
        ...data,
        token: token,
      });
      let res_100_orders: any = null;
      if (tab === 1) {
        res_100_orders = await REQUEST_GET_ORDER_REQUESTS({
          page: 1,
          creation_time_to: end_date,
          token: token,
          limit: 200,
        });
      }
      Promise.all([res, res_100_orders]).then((promise_response) => {
        if (tab === 1) {
          res.items = promise_response[0].items.concat(
            custom_result(promise_response[1].items, {
              get_new_array: false,
              get_approved_array: true,
              get_rejected_array: false,
              get_expired_array: false,
              get_paid_array: true,
              get_delivered_array: true,
              get_returned_array: false,
            })
          );
        } else {
          res.items = custom_result(promise_response[0].items, {
            get_new_array: false,
            get_approved_array: false,
            get_rejected_array: true,
            get_expired_array: true,
            get_paid_array: false,
            get_delivered_array: false,
            get_returned_array: true,
          });
        }

        setTotalCount(res.total_count);
        if (page > 1) {
          setShow_spinner_loadMore(false);
          if (tab === 1) {
            result_regulator(res.items, true);
          } else {
            setDeactivate_orders((deactivate_orders) =>
              deactivate_orders.concat(res.items)
            );
          }
        } else {
          if (tab === 1) {
            result_regulator(res.items, false);
          } else {
            initial_fetch = true;
            setDeactivate_orders(res.items);
          }
        }
        if (res.total_count > 14 && res.remained_count > 0) {
          setShowMoreButton(true);
        } else setShowMoreButton(false);
      });
    } catch (e) {
      console.log(e);
    }
  };

  // get custom result
  const custom_result = (
    data,
    {
      get_new_array,
      get_approved_array,
      get_rejected_array,
      get_expired_array,
      get_paid_array,
      get_delivered_array,
      get_returned_array,
    }
  ) => {
    // در انتظار تایید
    let new_array = [];
    // در انتظار پرداخت
    let approved_array = [];
    // رد شده
    let rejected_array = [];
    // منقضی شده
    let expired_array = [];
    // در انتظار تحویل
    let paid_array = [];
    // در حال سفر
    let delivered_array = [];
    // برگشت داده شده
    let returned_array = [];
    let neat_order_list = [];

    data.forEach((element) => {
      if (element.status.id === "delivered") {
        delivered_array.push(element);
      }
      if (element.status.id === "paid") {
        paid_array.push(element);
      }
      if (element.status.id === "approved") {
        approved_array.push(element);
      }
      if (element.status.id === "new") {
        new_array.push(element);
      }
      if (element.status.id === "rejected") {
        rejected_array.push(element);
      }
      if (element.status.id === "expired") {
        expired_array.push(element);
      }
      if (element.status.id === "returned") {
        returned_array.push(element);
      }
    });

    // update neat order list
    if (get_delivered_array) {
      neat_order_list = neat_order_list.concat(delivered_array);
    }
    if (get_paid_array) {
      neat_order_list = neat_order_list.concat(paid_array);
    }
    if (get_approved_array) {
      neat_order_list = neat_order_list.concat(approved_array);
    }
    if (get_new_array) {
      neat_order_list = neat_order_list.concat(new_array);
    }
    if (get_rejected_array) {
      neat_order_list = neat_order_list.concat(rejected_array);
    }
    if (get_expired_array) {
      neat_order_list = neat_order_list.concat(expired_array);
    }
    if (get_returned_array) {
      neat_order_list = neat_order_list.concat(returned_array);
    }
    return neat_order_list;
  };

  // VV
  const result_regulator = (data, rest_of_list) => {
    // در انتظار تایید
    let new_array = [];
    // در انتظار پرداخت
    let approved_array = [];
    // رد شده
    let rejected_array = [];
    // منقضی شده
    let expired_array = [];
    // در انتظار تحویل
    let paid_array = [];
    // در حال سفر
    let delivered_array = [];
    // برگشت داده شده
    let returned_array = [];
    let neat_order_list = [];

    data.forEach((element) => {
      if (element.status.id === "delivered") {
        delivered_array.push(element);
      }
      if (element.status.id === "paid") {
        paid_array.push(element);
      }
      if (element.status.id === "approved") {
        approved_array.push(element);
      }
      if (element.status.id === "new") {
        new_array.push(element);
      }
      if (element.status.id === "rejected") {
        rejected_array.push(element);
      }
      if (element.status.id === "expired") {
        expired_array.push(element);
      }
      if (element.status.id === "returned") {
        returned_array.push(element);
      }
    });

    // update neat order list
    if (delivered_array.length > 0) {
      neat_order_list = neat_order_list.concat(delivered_array);
    }
    if (paid_array.length > 0) {
      neat_order_list = neat_order_list.concat(paid_array);
    }
    if (approved_array.length > 0) {
      neat_order_list = neat_order_list.concat(approved_array);
    }
    if (new_array.length > 0) {
      neat_order_list = neat_order_list.concat(new_array);
    }
    if (rejected_array.length > 0) {
      neat_order_list = neat_order_list.concat(rejected_array);
    }
    if (expired_array.length > 0) {
      neat_order_list = neat_order_list.concat(expired_array);
    }
    if (returned_array.length > 0) {
      neat_order_list = neat_order_list.concat(returned_array);
    }
    // data.map(item =>{

    // })

    if (rest_of_list) {
      setActive_orders((active_orders) =>
        active_orders.concat(neat_order_list)
      );
    } else {
      setActive_orders(neat_order_list);
    }
    // let active_orders = data.filter((item, index) => {
    //   if (
    //     +(
    //       (Math.round(Date.now() / 1000) - item.creation_time.timestamp) /
    //       86400
    //     ).toFixed(2) <= 6 &&
    //     item.status.id !== "returned"
    //   ) {
    //     return item;
    //   } else {
    //     deactivate_orders.push(item);
    //   }
    // });
  };
  // ^^

  // const filterHandler = (value, option) => {
  //   if (option === "add") {
  //     filter_id.push(value);
  //     window.history.replaceState(
  //       null,
  //       "",
  //       `${router.pathname}?status_id=${filter_id}`
  //     );
  //   } else {
  //     filter_id = filter_id.filter((i) => i !== value);
  //     if (filter_id.length === 0) {
  //       window.history.replaceState(null, "", `${router.pathname}`);
  //     } else {
  //       window.history.replaceState(
  //         null,
  //         "",
  //         `${router.pathname}?status_id=${filter_id}`
  //       );
  //     }
  //   }
  //   page = 1;
  //   fetchAPI({
  //     page: 1,
  //     status_id: filter_id.join(","),
  //   });
  // };

  const nextPage = () => {
    page = 1 + page;
    setShow_spinner_loadMore(true);
    // if (filter_id.length > 0) {
    //   fetchAPI({
    //     page,
    //     status_id: filter_id.join(","),
    //   });
    // } else {
    if (activeTab === 1) {
      fetchAPI({
        page,
        creation_time_from: start_date,
      });
    } else {
      fetchAPI(
        {
          page,
          creation_time_to: until_date,
        },
        2
      );
    }

    // }
  };

  const getOlderOrder = (tab) => {
    let t_until_date = moment()
      .subtract(7, "d")
      .format("jYYYY/jM/jD");
    until_date = t_until_date;
    fetchAPI(
      {
        page,
        creation_time_to: t_until_date,
      },
      2
    );
  };

  return show ? (
    <article>
      <section className='requests_page_container'>
        {/* <Requests_filter
          language={language.filters}
          filter_list={filterHandler}
          active_filters={active_filters}
          // total_count={totalCount}
          // result={result}
        /> */}
        <section
          className={[
            "requests_section",
            totalCount === 0 ? "blockSection" : null,
          ].join(" ")}
        >
          <div className='orders_tabs'>
            <p
              onClick={() => {
                page = 1;
                setActiveTab(1);
                fetchAPI({
                  page: 1,
                  creation_time_from: start_date,
                });
              }}
              className={activeTab === 1 ? "active" : null}
            >
              {language.activeOrders}
            </p>
            <p
              onClick={() => {
                page = 1;
                setActiveTab(2);
                getOlderOrder(2);
              }}
              className={activeTab === 2 ? "active" : null}
            >
              {language.deactivateOrders}
            </p>
          </div>
          {activeTab === 1 ? (
            <div className='active_tab_container'>
              {active_orders ? (
                active_orders.length > 0 ? (
                  <>
                    {active_orders.map((item, i) => {
                      return (
                        <div className='Request_car' key={i}>
                          <Request_cart
                            language={language.request_cart}
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
                  <p className='NoResult'>{language.no_order}</p>
                )
              ) : (
                <>
                  <Requests_page_Loading />
                  <Requests_page_Loading />
                  <Requests_page_Loading />
                  <Requests_page_Loading />
                </>
              )}
            </div>
          ) : (
            <div className='active_tab_container'>
              {deactivate_orders ? (
                deactivate_orders.length > 0 ? (
                  <>
                    {deactivate_orders.map((item, i) => {
                      return (
                        <div className='Request_car' key={i}>
                          <Request_cart
                            language={language.request_cart}
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
                ) : null
              ) : (
                <>
                  <Requests_page_Loading />
                  <Requests_page_Loading />
                  <Requests_page_Loading />
                  <Requests_page_Loading />
                </>
              )}
            </div>
          )}
        </section>
      </section>
      {showMoreButton ? (
        <span
          className={[
            "Load_more_car",
            show_spinner_loadMore ? "no_padding" : null,
          ].join(" ")}
          onClick={nextPage}
        >
          {show_spinner_loadMore ? (
            <Spinner display='block' width={20} color='#9E9E9E' />
          ) : (
            <>
              <IoIosArrowDown color='#202020' size='1.8rem' />
              {language.show_more}
            </>
          )}
        </span>
      ) : null}
    </article>
  ) : (
    <article className='minHeight'></article>
  );
};

interface IRequests_page {
  language: any;
}

export default Requests_page;
