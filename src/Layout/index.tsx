import React, { useEffect, useReducer, useState } from "react";
import Router from "next/router";
import Footer from "../components/Footer";
import Header from "../containers/header";
import "../styles/main.scss";
import modal_context from "../context/Modal_context";

const ShowModalReducer = (current, action) => {
  if (action.type === "SET") return !current;
};

const Layout = props => {
  const [modalType, setModalType] = useState("Login");
  const [Show_Modal, dispatch] = useReducer(ShowModalReducer, false);

  useEffect(() => {
    if (Router.router.query.utm_source) {
      localStorage["utm_source"] = Router.query.utm_source;
      localStorage["utm_medium"] = Router.query.utm_medium;
      localStorage["utm_campaign"] = Router.query.utm_campaign;
      localStorage["utm_term"] = Router.query.utm_term;
      localStorage["utm_content"] = Router.query.utm_content;
      localStorage["utm_landing_url"] = "https://otoli.net/join-us";
    }
  }, []);

  const modal_handler = type => {
    dispatch({ type: "SET" });
    setModalType(type);
  };

  return (
    <>
      <modal_context.Provider
        value={{
          show_modal: Show_Modal,
          modalHandler: type => {
            console.log();
            modal_handler(type);
          }
        }}
      >
        <Header modalType={modalType} Show_Modal={Show_Modal}></Header>
        <main>{props.children}</main>
      </modal_context.Provider>
      <Footer />
    </>
  );
};

export default Layout;
