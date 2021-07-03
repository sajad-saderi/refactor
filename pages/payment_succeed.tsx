import { useState, useEffect } from "react";
import dynamic from "next/dynamic";

const Layout = dynamic(() => import("../src/Layout"));
// import Layout from "../src/Layout";
import { GET_ORDER_REQUEST } from "../src/API";
import jsCookie from "js-cookie";
import moment from "moment-jalaali";
import Router from "next/router";
import check_icon from "../public/image/check.png";
import paper_check from "../public/image/paper_check.png";
import return_icon from "../public/image/return.png";
import key from "../public/image/key.png";
import paper from "../public/image/paper.png";
import "../src/styles/pages/Success_payment.scss";
import carImage from "../public/image/car-image-thumbnail.jpg";
import { NextSeo } from "next-seo";
import language from "../public/languages/fa/paymentsucceed.json";
// import { logPageView } from "../utils/analytics";

moment.loadPersian({ dialect: "persian-modern" });

const Success_payment = () => {
  const [renter, setRenter] = useState(null);
  const [rent_search_dump, setRent_search_dump] = useState(null);
  const [bank_id_track, set_bank_id_track] = useState(null);
  const token = jsCookie.get("token");

  useEffect(() => {
    window["dataLayer"].push({
      event: "page_view",
      pageURL: window.location.href,
      pagePath: "/payment-success",
      pageTitle: language.next_seo.title,
    });
    // logPageView();

    fetchAPI(window.location.search.match(/(\d+)/)[0]);
  }, []);

  /**
   *
   * @param id
   * Get the order info
   */
  const fetchAPI = async (id) => {
    try {
      const Order_res: any = await GET_ORDER_REQUEST({ token, id });

      setRent_search_dump(Order_res.data.rent_search_dump);
      setRenter(Order_res.data.renter);
      set_bank_id_track(Order_res.data.id);
      // console.log({
      //   event: "purchase",
      //   transactionId: Order_res.data.id,
      //   transactionTotal: Order_res.data.rent_search_dump.total_price,
      //   transactionProducts: [
      //     {
      //       sku: Order_res.data.rent_search_dump.id,
      //       name: Order_res.data.rent_search_dump.car.name.fa,
      //       category: Order_res.data.rent_search_dump.car.body_style.name.fa,
      //       price: Order_res.data.rent_search_dump.avg_price_per_day,
      //       quantity: Order_res.data.rent_search_dump.no_of_days,
      //     },
      //   ],
      // });

      window["dataLayer"].push({
        event: "purchase",
        transactionId: Order_res.data.id,
        transactionTotal: Order_res.data.rent_search_dump.total_price,
        transactionProducts: [
          {
            sku: Order_res.data.rent_search_dump.id,
            name: Order_res.data.rent_search_dump.car.name.fa,
            category: Order_res.data.rent_search_dump.car.body_style.name.fa,
            price: Order_res.data.rent_search_dump.avg_price_per_day,
            quantity: Order_res.data.rent_search_dump.no_of_days,
          },
        ],
      });
    } catch (error) {
      console.log("!Error", error);
    }
  };

  return (
    <Layout>
      <NextSeo
        title={language.next_seo.title}
        description={language.next_seo.description}
        openGraph={{
          title: language.next_seo.title,
          description: language.next_seo.description,
        }}
        twitter={{
          handle: language.next_seo.handle,
          site: language.next_seo.site,
          cardType: language.next_seo.cardType,
        }}
      />
      <article className='responsive minHeight local_payment'>
        {renter ? (
          <section className='payment_cart'>
            <div className='title  '>
              <img src={check_icon} alt='پرداخت موفق' />
              <h4>{language.h4}</h4>
            </div>
            <div className='bank_track_id '>
              <p>شماره پیگیری: {bank_id_track}</p>
            </div>
            <div className='details_section'>
              <div>
                <div className='reserve_information '>
                  <div className='section_title margin_bottom_24'>
                    <img src={paper_check} className='مشخصات خودرو' />
                    <p>مشخصات رزرو</p>
                  </div>
                  <div className='car_info padding_right_24'>
                    <div>
                      <p>خودرو:</p>
                      <span className='center'>
                        {rent_search_dump.car.name.fa}
                      </span>
                    </div>
                    <div>
                      <p>میزبان:</p>
                      <span className='center'>
                        {rent_search_dump.owner.company_name
                          ? rent_search_dump.owner.company_name
                          : rent_search_dump.owner.name}
                      </span>
                    </div>
                    <div>
                      <p>تاریخ تحویل:</p>
                      <span>
                        {moment(
                          rent_search_dump.start_date,
                          "jYYYY/jMM/jDD"
                        ).format("jYYYY/jMM/jD")}
                      </span>
                    </div>
                    <div>
                      <p>تاریخ بازگشت:</p>
                      <span>
                        {moment(
                          rent_search_dump.end_date,
                          "jYYYY/jMM/jDD"
                        ).format("jYYYY/jMM/jD")}
                      </span>
                    </div>
                    <div>
                      <p>مدت اجاره:</p>
                      <span>
                        {rent_search_dump.no_of_days} {language.day}
                      </span>
                    </div>
                    <div>
                      <p>محدودیت مسافت:</p>
                      <span className='float-left'>
                        {rent_search_dump.max_km_per_day} {language.kilometer}
                      </span>
                    </div>
                  </div>
                </div>
                <div className='paid_price '>
                  <p>{language.span_1}</p>
                  <div>
                    <h3>{rent_search_dump.total_price.toLocaleString()}</h3>
                    <span className='toman'> تومان</span>
                  </div>
                </div>
              </div>
              <div className='figure_section'>
                <img
                  alt={language.car_image}
                  src={
                    rent_search_dump.media_set.length > 0
                      ? rent_search_dump.media_set[0].thumbnail_url
                      : carImage
                  }
                />
              </div>
            </div>
            <div className='delivery_section margin_top_24'>
              <div className='section_title margin_bottom_16'>
                <img src={key} className='تحویل خودرو' />
                <p>تحویل خودرو:</p>
              </div>
              <div className='delivery_condition'>
                {rent_search_dump.deliver_at_renters_place ? (
                  <p className='margin_bottom_16'>
                    {language.span_3}
                    {/* {rent_search_dump.location.name.fa} */}
                  </p>
                ) : null}
                <p>
                  میزبان برای هماهنگی در مورد تحویل خودرو با شما تماس خواهد
                  گرفت.
                </p>
              </div>
            </div>
            <div className='return_section margin_top_24'>
              <div className='section_title margin_bottom_16'>
                <img src={return_icon} className='بازگشت خودرو' />
                <p>بازگشت خودرو:</p>
              </div>
              <div className='return_condition'>
                <p className='margin_bottom_8'>
                  شروع مدت اجاره از ساعت تحویل خودرو آغاز می‌شود لذا لازم است در
                  روز بازگشت در همان ساعت خودرو را بازتحویل دهید. در صورت
                  دیرکرد، برای این خودرو به ازای{" "}
                  <span>
                    هر ساعت {rent_search_dump.extra_hour_price_name} هزینه
                    دیرکرد{" "}
                  </span>
                  محاسبه خواهد شد.
                </p>
                <p>
                  محدودیت مسافت در نظر گرفته شده برای این خودرو{" "}
                  {rent_search_dump.max_km_per_day} {language.kilometer} است.
                  برای
                  <span>
                    {" "}
                    هر کیلومتر بیشتر {rent_search_dump.extra_km_price_name}{" "}
                    هزینه اضافه{" "}
                  </span>
                  محاسبه خواهد شد.
                </p>
              </div>
            </div>
            <div className='contract_section margin_top_24'>
              <div className='section_title margin_bottom_16'>
                <img src={paper} className='قرارداد اجاره' />
                <p>قرارداد اجاره:</p>
              </div>
              <div className='return_condition'>
                <p className='margin_bottom_16'>
                  سپریس نمونه قراردادی برای طرفین آماده کرده است. میزبان در روز
                  تحویل خودرو این قرارداد را در دو نسخه تهیه می‌کند و به امضای
                  دو طرف می‌رسد.
                </p>
              </div>
            </div>
          </section>
        ) : (
          <p className='loading_text'>{language.loading}</p>
        )}
      </article>
    </Layout>
  );
};

export default Success_payment;
