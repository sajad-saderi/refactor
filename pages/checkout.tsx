import React from "react";
import Layout from "../src/Layout";
import Checkout_Container from "../src/containers/Checkout_Container";
import language from "../public/languages/fa/checkout.json";
import { logPageView } from "../utils/analytics";

const Checkout = () => {
  React.useEffect(() => {
    logPageView();
  }, []);
  return (
    <Layout hide={true}>
      <Checkout_Container language={language} />
    </Layout>
  );
};

export default Checkout;
