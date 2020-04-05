import React, { useState, useEffect } from "react";
import { NextSeo } from "next-seo";
import Layout from "../src/Layout";
import { REQUEST_GET_FAQ } from "../src/API";
import Accordion from "../src/components/Accordion";
import "../src/styles/pages/faq.scss";

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
        description=" پاسخگوی تمام سوالات شما در بخش پرسش و پاسخ اتولی هستیم "
        openGraph={{
          title: "سوال‌های پرتکرار | اتولی",
          description:
            " پاسخگوی تمام سوالات شما در بخش پرسش و پاسخ اتولی هستیم ",
        }}
        twitter={{
          handle: "@otoli_net",
          site: "@otoli_net",
          cardType: "summary_large_image",
        }}
      />
      <article className="responsive minHeight FAQ_Page">
        <h1 style={{ fontSize: "22px" }}>{"سوالات پرتکرار"}</h1>
        {items.length > 0 ? (
          items.map((item, i) => {
            return (
              <div className="FQ_WRAPPER" key={item.id}>
                {i === 0 ? null : (
                  <h2 style={{ fontSize: "22px" }}>{item.name.fa}</h2>
                )}
                <Accordion question_set={item.question_set} />
              </div>
            );
          })
        ) : (
          <>
            <p>در حال باگذاری</p>
          </>
        )}
      </article>
    </Layout>
  );
};

export default FAQ;
