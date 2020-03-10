import React, { useEffect } from "react";
import Router from "next/router";
import Footer from "../components/Footer";

const Layout = props => {
  useEffect(() => {
    if (Router.query.utm_source) {
      localStorage["utm_source"] = Router.query.utm_source;
      localStorage["utm_medium"] = Router.query.utm_medium;
      localStorage["utm_campaign"] = Router.query.utm_campaign;
      localStorage["utm_term"] = Router.query.utm_term;
      localStorage["utm_content"] = Router.query.utm_content;
      localStorage["utm_landing_url"] = "https://otoli.net/join-us";
    }
  }, []);

  return (
    <>
      <header>هدر</header>
      <main>{props.children}</main>
      <footer>
        <Footer/>
      </footer>
    </>
  );
};

export default Layout;
