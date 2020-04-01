import React, { useState, useEffect } from "react";
import Layout from "../src/Layout";
import { GET_ORDER_REQUEST } from "../src/API";
import jsCookie from "js-cookie";
import moment from "moment-jalaali";
import Router from "next/router";
import { IoMdCheckmarkCircleOutline } from "react-icons/io";
import "../src/styles/pages/Success_payment.module.scss";

moment.loadPersian({ dialect: "persian-modern" });

const token = jsCookie.get("token");

const Success_payment = () => {
  const [renter, setRenter] = useState(null);
  const [rent_search_dump, setRent_search_dump] = useState(null);

  useEffect(() => {
    fetchAPI(Router.router.query.id);
  }, []);

  const fetchAPI = async id => {
    try {
      const Order_res: any = await GET_ORDER_REQUEST({ token, id });
      setRent_search_dump(Order_res.data.rent_search_dump);
      console.log(Order_res);

      setRenter(Order_res.data.renter);
    } catch (e) {
      console.log(e);
    }
  };

  return (
    <Layout>
      <article className="responsive minHeight local_payment">
        {renter ? (
          <section className="payment_cart">
            <IoMdCheckmarkCircleOutline size="10rem" color="#73af55" />
            <div>
              <h4>پرداخت با موفقیت انجام شد</h4>
              {rent_search_dump.media_set.length > 0 && (
                <img src={rent_search_dump.media_set[0].thumbnail_url} />
              )}
              <h2 className="center">{rent_search_dump.car.name.fa}</h2>
              <h3 className="center">
                {rent_search_dump.owner.company_name
                  ? rent_search_dump.owner.company_name
                  : rent_search_dump.owner.name}
              </h3>
              <br />
            </div>
            <p>
              <span>هزینه پرداختی</span>
              <span>{rent_search_dump.total_price.toLocaleString()} تومان</span>
            </p>
            <p>
              <span>محل تحویل</span>
              <span>
                {rent_search_dump.deliver_at_renters_place
                  ? "در محدوده تهران، خودرو در محل شما تحویل می‌شود."
                  : rent_search_dump.location.name.fa}
              </span>
            </p>
            <p>
              <span>از</span>
              <span>
                {moment(rent_search_dump.start_date, "jYYYY/jMM/jDD").format(
                  "jD jMMMM jYYYY"
                )}
              </span>
            </p>
            <p>
              <span>تا</span>
              <span>
                {moment(rent_search_dump.end_date, "jYYYY/jMM/jDD").format(
                  "jD jMMMM jYYYY"
                )}
              </span>
            </p>
            <p>
              <span>مدت زمان</span>
              <span>{rent_search_dump.no_of_days} روز</span>
            </p>
            <p>
              <span>محدودیت مسافت در روز</span>
              <span className="float-left">
                {rent_search_dump.max_km_per_day} کیلومتر
              </span>
            </p>
          </section>
        ) : (
          <p className="loading_text">در حال دریافت اطلاعات پرداخت...</p>
        )}{" "}
      </article>
    </Layout>
  );
};

export default Success_payment;
