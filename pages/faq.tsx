import React, { useState, useEffect } from "react";
import { NextSeo } from "next-seo";
import Layout from "../src/Layout";
import { REQUEST_GET_FAQ } from "../src/API";
import Accordion from "../src/components/Accordion";
import "../src/styles/pages/faq.scss";
import Spinner from "../src/components/Spinner";

const FAQ = () => {
  const [items, setItems] = useState([]);
  useEffect(() => {
    fetchAPI();
  }, []);
  const fetchAPI = async () => {
    const faq_res: any = await REQUEST_GET_FAQ();
    setItems(faq_res.items);
  };
  return (
    <Layout>
      <NextSeo
        title="سوال‌های پرتکرار | اتولی"
        description="پاسخگوی تمام سوالات شما در بخش پرسش و پاسخ اتولی هستیم"
        openGraph={{
          title: "سوال‌های پرتکرار | اتولی",
          description: "پاسخگوی تمام سوالات شما در بخش پرسش و پاسخ اتولی هستیم",
        }}
        twitter={{
          handle: "@otoli_net",
          site: "@otoli_net",
          cardType: "summary_large_image",
        }}
      />
      <article className="responsive minHeight FAQ_Page">
        <h1>{"سوالات پرتکرار"}</h1>
        {items.length > 0 ? (
          items.map((item, i) => {
            return (
              <div className="FQ_WRAPPER" key={item.id}>
                {/* The first box shouldn't have title */}
                {i === 0 ? null : <h2>{item.name.fa}</h2>}
                <Accordion question_set={item.question_set} />
              </div>
            );
          })
        ) : (
          <div className="load_content">
            <Spinner display="inline-block" width={20} color="#737373" />
            <span>در حال بارگذاری</span>
          </div>
        )}
      </article>
    </Layout>
  );
};

export default FAQ;
