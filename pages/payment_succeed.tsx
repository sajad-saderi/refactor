import { useState, useEffect } from "react";
import dynamic from "next/dynamic";

const Layout = dynamic(() => import("../src/Layout"));
// import Layout from "../src/Layout";
import { GET_ORDER_REQUEST } from "../src/API";
import jsCookie from "js-cookie";
import moment from "moment-jalaali";
import Router from "next/router";
import { IoMdCheckmarkCircleOutline } from "react-icons/io";
import "../src/styles/pages/Success_payment.scss";
import carImage from "../public/image/car-image-thumbnail.jpg";
import { NextSeo } from "next-seo";
import language from "../public/languages/fa/paymentsucceed.json";
// import { logPageView } from "../utils/analytics";

moment.loadPersian({ dialect: "persian-modern" });

const Success_payment = () => {
  const [renter, setRenter] = useState(null);
  const [rent_search_dump, setRent_search_dump] = useState(null);
  const token = jsCookie.get("token");

  useEffect(() => {
    window["dataLayer"].push({
      event: "page_view",
      pageURL: window.location.href,
      pagePath: "/payment-success",
      pageTitle: language.next_seo.title,
    });
    // logPageView();
    console.log(Router.router.query.id);

    // fetchAPI(Router.router.query.id);
    fetchAPI(1380);
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
      console.log(
        Order_res.data.id,
        Order_res.data.rent_search_dump.total_price,
        Order_res.data.rent_search_dump.id,
        Order_res.data.rent_search_dump.car.name.fa,
        Order_res.data.rent_search_dump.car.category_set[0].name.fa,
        Order_res.data.rent_search_dump.avg_price_per_day,
        Order_res.data.rent_search_dump.no_of_days
      );
      window["dataLayer"].push({
        event: "purchase",
        transactionId: Order_res.data.id,
        transactionTotal: Order_res.data.rent_search_dump.total_price,
        transactionProducts: [
          {
            sku: Order_res.data.rent_search_dump.id,
            name: Order_res.data.rent_search_dump.car.name.fa,
            category:
              Order_res.data.rent_search_dump.car.category_set[0].name.fa,
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
            <IoMdCheckmarkCircleOutline size='10rem' color='#73af55' />
            <div>
              <h4>{language.h4}</h4>
              {rent_search_dump.media_set.length > 0 && (
                <img
                  alt={language.car_image}
                  src={
                    rent_search_dump.media_set.length > 0
                      ? rent_search_dump.media_set[0].thumbnail_url
                      : carImage
                  }
                />
              )}
              <h2 className='center'>{rent_search_dump.car.name.fa}</h2>
              <h3 className='center'>
                {rent_search_dump.owner.company_name
                  ? rent_search_dump.owner.company_name
                  : rent_search_dump.owner.name}
              </h3>
              <br />
            </div>
            <p>
              <span>{language.span_1}</span>
              <span>{rent_search_dump.total_price.toLocaleString()} تومان</span>
            </p>
            <p>
              <span>{language.span_2}</span>
              <span>
                {rent_search_dump.deliver_at_renters_place
                  ? language.span_3
                  : rent_search_dump.location.name.fa}
              </span>
            </p>
            <p>
              <span>{language.az}</span>
              <span>
                {moment(rent_search_dump.start_date, "jYYYY/jMM/jDD").format(
                  "jD jMMMM jYYYY"
                )}
              </span>
            </p>
            <p>
              <span>{language.ta}</span>
              <span>
                {moment(rent_search_dump.end_date, "jYYYY/jMM/jDD").format(
                  "jD jMMMM jYYYY"
                )}
              </span>
            </p>
            <p>
              <span>{language.time}</span>
              <span>
                {rent_search_dump.no_of_days} {language.day}
              </span>
            </p>
            <p>
              <span>{language.limit}</span>
              <span className='float-left'>
                {rent_search_dump.max_km_per_day} {language.kilometer}
              </span>
            </p>
          </section>
        ) : (
          <p className='loading_text'>{language.loading}</p>
        )}
      </article>
    </Layout>
  );
};

export default Success_payment;
