import React, { useEffect, useReducer, useState, useContext } from "react";
import Router from "next/router";
import Footer from "../components/Footer";
import Header from "../containers/header";

// Main Scss file
// All Scss files are imported to the main.scss
import "../styles/main.scss";

// Modal Context
import modal_context from "../context/Modal_context";

// Auth Context
import auth_context from "../context/Auth_context";

// Toast Context
import toast_context from "../context/Toast_context";

// Toast Component
import Toast from "../components/Toast";

// Google Analytics
import { initGA, logPageView } from '../../utils/analytics'

const ShowModalReducer = (current, action) => {
  /* 
    This reducer control the display of the modal.
      "SET" type set the status for the modal component
        true : show 
        false : will not render at the page
  */
  if (action.type === "SET") return !current;
};

const Layout = (props: ILayout) => {
  /*
    NOTE 
      There are multi-status you can set in modals component.

    REVIEW 
      Login: is the default to show login modal first step 
      TellMe: modal to get user cellphone number and save it  
      Renter: client can rate car and renter
      Owner: Owner can rate client rate and review
      Law: show the rules and policies to new user
  */
  const [modalType, setModalType] = useState("Login");
  const [data, setData] = useState(null);

  // By default, no users are authenticated or logged in
  const [Auth, setAuth] = useState(false);

  /* 
    The toast component is not rendered to the page if there is no alert. 
    NOTE The toast component is not hidden by style 
  */
  const [toast, setToast] = useState(false);
  const [toastData, setToastData] = useState(null);

  // Reducers
  const [Show_Modal, dispatch] = useReducer(ShowModalReducer, false);

  useEffect(() => {
    if (Router.router) {
      /*
        It checks the current URL if there are any UTM values in there
        NOTE 
          If user login, these information will sended to API
            "/core/device/send-code"
      */
      if (Router.router.query.utm_source) {
        localStorage["utm_source"] = Router.query.utm_source;
        localStorage["utm_medium"] = Router.query.utm_medium;
        localStorage["utm_campaign"] = Router.query.utm_campaign;
        localStorage["utm_term"] = Router.query.utm_term;
        localStorage["utm_content"] = Router.query.utm_content;
        localStorage["utm_landing_url"] = "https://otoli.net/join-us";
      }
    }


    if (!window["GA_INITIALIZED"]) {
      initGA()
      window["GA_INITIALIZED"] = true
    }
    logPageView()

  }, []);

  const modal_handler = (type, data) => {
    dispatch({ type: "SET" });
    setModalType(type);
    setData(data);
  };

  const toast_handler = (data) => {
    setToastData(data);
    setToast(true);
  };

  return (
    <>
      {/* 
        NOTE 
          context Providers wrap the Header and main section in the app to track data change in content   
      */}
      <toast_context.Provider
        value={{
          show_toast: toast,
          toast_option: (data) => {
            toast_handler(data);
          },
        }}
      >
        <modal_context.Provider
          value={{
            show_modal: Show_Modal,
            modalHandler: (type, data) => {
              modal_handler(type, data);
            },
          }}
        >
          <auth_context.Provider
            value={{
              Auth: Auth,
              Auth_Manager: (v) => setAuth(v),
            }}
          >
            <Header
              modalType={modalType}
              Show_Modal={Show_Modal}
              // data information is just needed for owner and renter modals
              data={data}
            ></Header>
            <main>{props.children}</main>
          </auth_context.Provider>
        </modal_context.Provider>
        {toast ? (
          <Toast
            message={toastData.message}
            closeHandler={() => setToast(false)}
            time={toastData.time}
            autoClose={toastData.autoClose}
          />
        ) : null}
      </toast_context.Provider>
      {/* 
        NOTE
          IF you need to hide the footer at the page just pass {true} for "hide".
          you can set the "hide" property anywhere you imported the "layout" component
      */}
      <Footer hide={props.hide} />
    </>
  );
};

interface ILayout {
  children: any;
  hide?: boolean;
}

export default Layout;
