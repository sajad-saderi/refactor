import { useContext, useEffect, useState } from "react";
import languageCTX from "../src/context/languageCTX";
import { PageHeadBuilder } from "../src/components/pageHeadBuilder/pageHeadBuilder";
import Layout from "../src/Layout";
import ConfirmCode from "../src/containers/header/modals/ConfirmCode";
import GetUserCellPhone from "../src/containers/header/modals/GetUserCellPhone";
import { pageViewDataLayer } from "../utils/dataLayer";
import styles from "../src/styles/pages/login.module.scss";

const LoginPage = ({ locale }) => {
  const [cellPhone, setCellPhone] = useState("");
  const [getCell, setGetCell] = useState(true);
  const [deactivate_form, set_deactivate_form] = useState(false);
  const { activeLanguage } = useContext(languageCTX);

  const panelController = () => {
    setGetCell(!getCell);
  };

  useEffect(() => {
    pageViewDataLayer({
      pageURL: window.location.href,
      pagePath: "/login",
      pageTitle: locale.LOGIN.login,
    });
    if (window["auth"]) {
      set_deactivate_form(true);
    } else {
      set_deactivate_form(false);
    }
  }, []);

  return (
    <Layout>
      <PageHeadBuilder
        title={locale.LOGIN.login}
        description={locale.LOGIN.login}
      />
      <div className={styles.container}>
        <div className={styles.boxContainer}>
          {getCell ? (
            <GetUserCellPhone
              cellPhone={cellPhone}
              language={locale}
              inactivateForm={deactivate_form}
              panelController={panelController}
              setCellPhone={(arg) => setCellPhone(arg)}
            />
          ) : (
            <ConfirmCode
              cellPhone={cellPhone}
              language={locale}
              inactivateForm={deactivate_form}
              panelController={panelController}
            />
          )}
        </div>
      </div>
    </Layout>
  );
};

export default LoginPage;
