import { useContext, useEffect, useState } from "react";

import { useRouter } from "next/router";

import { NextSeo } from "next-seo";

import context_user from "../src/context/User_info";
import languageCTX from "../src/context/languageCTX";
import dynamic from "next/dynamic";
import Icon from "../src/components/Icons";

// import { logPageView } from "../utils/analytics";
// import jsCookie from "js-cookie";
// import Layout from "../src/Layout";

const Layout = dynamic(() => import("../src/Layout"));
const ConfirmCode = dynamic(() =>
  import("../src/containers/header/modals/ConfirmCode")
);
const GetUserCellPhone = dynamic(() =>
  import("../src/containers/header/modals/GetUserCellPhone")
);

const LoginPage = ({ locale }) => {
  const [change, setChange] = useState(false);
  const [deactivate_form, set_deactivate_form] = useState(false);
  const user = useContext(context_user);
  const { activeLanguage } = useContext(languageCTX);
  const router = useRouter();

  const panelController = () => {
    setChange(!change);
  };

  useEffect(() => {
    window["dataLayer"].push({
      event: "page_view",
      pageURL: window.location.href,
      pagePath: "/login",
      pageTitle: locale.LOGIN.login,
    });

    if (window["auth"]) {
      set_deactivate_form(true);
      // if (localStorage["history"] !== "/add-car") window.history.go(-1);
      // else router.push("/add-car");
      // if (window["complete_register"]) {
      //   let id = user.data?.id;
      //   router.push(`/user/${id}`);
      // }
    } else {
      set_deactivate_form(false);
    }
  }, []);

  return (
    <Layout>
      <NextSeo
        title={locale.LOGIN.login}
        description={locale.LOGIN.login}
        openGraph={{
          title: locale.LOGIN.login,
          description: locale.LOGIN.login,
          site_name: locale.COMMON.sepris,
        }}
        twitter={{
          handle: locale.PAGE_HEADER.handle,
          site: locale.PAGE_HEADER.site,
          cardType: locale.PAGE_HEADER.cardType,
        }}
      />
      <div
        className="Please_login_container minHeight"
        dir={activeLanguage === "fa" ? "rtl" : "ltr"}
      >
        <div
          className={[
            "modal_box",
            change ? "confirm_code" : "login_modal",
          ].join(" ")}
        >
          {change ? (
            <div className="login_modal_title_confirm_code">
              <span className="login_person_icon" onClick={panelController}>
                <Icon name="arrow" width="30px" height="30px" color="#4ba3ce" rotate={180}/>
              </span>
              <h2>{locale.LOGIN.title}</h2>
            </div>
          ) : (
            <div className="login_modal_title">
              <span className="login_person_icon">
                <Icon name="avatar" width="20px" height="20px" color="#fff" />
              </span>
              <h2>{locale.LOGIN.login}</h2>
            </div>
          )}
          {change ? (
            <ConfirmCode
              language={locale}
              panelController={panelController}
              customModalControl={true}
              deactivate_form={deactivate_form}
            />
          ) : (
            <GetUserCellPhone
              language={locale}
              data-test-id="GetUserCellPhone"
              panelController={panelController}
              deactivate_form={deactivate_form}
            />
          )}
        </div>
      </div>
    </Layout>
  );
};

export default LoginPage;
