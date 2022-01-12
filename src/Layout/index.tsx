import { useEffect, useReducer, useState, useContext } from 'react';
import Router from 'next/router';

import { supportedLanguages } from '../../utils/types'

import dynamic from 'next/dynamic';
// import Footer from "../components/Footer";
// import Header from "../containers/header";

const Footer = dynamic(() => import('../components/Footer'));
const Header = dynamic(() => import('../containers/header'));

import fa from '../../public/languages/fa.json';
import en from '../../public/languages/en.json';
import modal_context from '../context/Modal_context';

// Auth Context
import auth_context from '../context/Auth_context';

// Toast Context
import toast_context from '../context/Toast_context';
import net_CTX from '../context/internetConnectionCTX';
import languageCTX from '../context/languageCTX';

// Toast Component
const Toast = dynamic(() => import('../components/Toast'));
// import Toast from "../components/Toast";

import * as Sentry from '@sentry/browser';
import ErrorBounderies from '../../utils/error_bounderies';
import InternetConnection from '../components/InternetConnection';


const ShowModalReducer = (current, action) => {
  /* 
    This reducer control the display of the modal.
      "SET" type set the status for the modal component
        true : show 
        false : will not render at the page
        */
  if (action.type === 'SET') return !current;
};

let deferredPrompt = null;
let pwa_flag = false;
let google_tag_manager_flag = true;

const Layout = ({ children, hide, showToTop, LinkControl }: ILayout) => {
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
  const [modalType, setModalType] = useState('Login');
  const [data, setData] = useState(null);
  const [showPwaBanner, setShowPwaBanner] = useState(false);

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
  const [confirm_id, use_confirm_id] = useState(null);

  const TOAST_CONTEXT = useContext(toast_context);
  const netCTX = useContext(net_CTX);
  const localeCTX = useContext(languageCTX);

  useEffect(() => {
    // checking internet connection
    if (!window.navigator.onLine) {
      netCTX.toggleTheContainer(true);
    }
   
try{

  const queryString = window.location.search;
  const urlParams = new URLSearchParams(queryString);
  if (urlParams.has('utm_source')) {
    localStorage['utm_source'] = urlParams.get('utm_source');
    localStorage['utm_medium'] = urlParams.get('utm_medium');
    localStorage['utm_campaign'] = urlParams.get('utm_campaign');
    localStorage['utm_term'] = urlParams.get('utm_term');
    localStorage['utm_content'] = urlParams.get('utm_content');
  }
}catch(e){
  console.log('error in URLSearchParams, your browser is not supporting URLSearchParams');
  
}
  
    if (localeCTX.activeLanguage !== Router.router.locale) {
      localeCTX.changingLanguage(Router.router.locale as supportedLanguages);
    }
    checkToast();
    return () => {
      if (!!!window['google_tag_manager'] && google_tag_manager_flag) {
        Sentry.captureException('گوگل تگ مننجر بر روی مرورگر کاربر نبود');
        google_tag_manager_flag = false;
      }
    };
  }, []);

  const modal_handler = (type, data) => {
    dispatch({ type: 'SET' });
    setModalType(type);
    setData(data);
  };

  const toast_handler = (data) => {
    if (data.message === 'Network Error') {
      setToast(false);
      netCTX.toggleTheContainer(true);
    } else {
      setToastData(data);
      setToast(true);
      sessionStorage['TOAST'] = JSON.stringify({ ...data });
    }
  };

  const checkToast = () => {
    if (sessionStorage['TOAST']) {
      setToast(true);
      let data = JSON.parse(sessionStorage['TOAST']);
      if (data?.color === '#ed9026') {
        sessionStorage.removeItem('TOAST');
      } else {
        setToast(true);
        setToastData(data);
      }
    }
  };

  const AnalyticsEvent = (eventCategory, eventAction, eventLabel) => {
    if (window['ga']) {
      window['ga']('send', {
        hitType: 'event',
        eventCategory,
        eventAction,
        eventLabel,
      });
    }
  };

  const customPwaPrompt = () => {
    if (deferredPrompt) {
      // Show the install prompt
      deferredPrompt.prompt();
      deferredPrompt.userChoice.then((choiceResult) => {
        if (choiceResult.outcome === 'accepted') {
          console.log('User accepted the install prompt');
          AnalyticsEvent('pwa', 'install-prompt', 'accepted');
        } else {
          console.log('User dismissed the install prompt');
          AnalyticsEvent('pwa', 'install-prompt', 'rejected');
        }
        pwa_flag = true;
        deferredPrompt = null;
        setShowPwaBanner(false);
      });
    }
  };

  return (
    <>
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
            id: confirm_id,
            modalHandler: (type, data) => {
              modal_handler(type, data);
            },
            confirm_id: (status) => {
              use_confirm_id(status);
            },
          }}
        >
          <auth_context.Provider
            value={{
              Auth: Auth,
              Auth_Manager: (v) => setAuth(v),
            }}
          >
            <ErrorBounderies
              language={
                localeCTX.activeLanguage === 'fa'
                  ? fa.COMMON.errorParagraph1
                  : en.COMMON.errorParagraph1
              }
            >
              <Header
                modalType={modalType}
                Show_Modal={Show_Modal}
                // data information is just needed for owner and renter modals
                data={data}
                language={
                  localeCTX.activeLanguage === 'fa' ? fa : en
                }
              ></Header>
            </ErrorBounderies>
            <ErrorBounderies
              language={
                localeCTX.activeLanguage === 'fa'
                  ? fa.COMMON.errorParagraph1
                  : en.COMMON.errorParagraph1
              }
            >
              <main className="minHeight">{children}</main>
            </ErrorBounderies>
          </auth_context.Provider>
        </modal_context.Provider>
        {netCTX.showInternetConnectionNotification && <InternetConnection language={localeCTX.activeLanguage === 'fa' ? fa : en} />}
        {toast && toastData ? (
          <Toast
            message={toastData.message}
            closeHandler={() => {
              if (sessionStorage['TOAST']) sessionStorage.removeItem('TOAST');
              setToast(false);
            }}
            time={toastData.time}
            color={toastData.color}
						hideTimeBar={toastData.hideTimeBar}
            autoClose={toastData.autoClose}
          />
        ) : null}
      </toast_context.Provider>
      {/* 
        NOTE
          IF you need to hide the footer at the page just pass {true} for "hide".
          you can set the "hide" property anywhere you imported the "layout" component
      */}
      <ErrorBounderies
        language={
          localeCTX.activeLanguage === 'fa'
            ? fa.COMMON.errorParagraph1
            : en.COMMON.errorParagraph1
        }
      >
        <Footer
          hide={hide}
          showToTop={showToTop}
          LinkControl={LinkControl}
          locale={localeCTX.activeLanguage}
          language={localeCTX.activeLanguage === 'fa' ? fa : en}
        />
      </ErrorBounderies>
    </>
  );
};

interface ILayout {
  children?: any;
  hide?: boolean;
  showToTop?: boolean;
  LinkControl?: boolean;
}

export default Layout;
