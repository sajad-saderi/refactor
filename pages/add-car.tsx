import React, { useEffect } from "react";
import Layout from "../src/Layout";
import Add_car from "../src/containers/Add_car";
import { NextSeo } from "next-seo";
import language from "../public/languages/fa/addcar.json";
import Router from "next/router";

const AddCar = ({ edit }) => {
  useEffect(() => {
    if (window["auth"]) {
      // const edit = router.
      window["dataLayer"].push({
        event: "page_view",
        pageURL: window.location.href,
        pagePath: "/add-car",
        pageTitle: edit ? language.next_seo.editTitle : language.next_seo.title,
      });
    } else {
      Router.push("/login");
    }
  }, []);
  return (
    <Layout LinkControl={true}>
      <NextSeo
        title={edit ? language.next_seo.editTitle : language.next_seo.title}
        description={language.next_seo.description}
        openGraph={{
          title: language.next_seo.title,
          description: language.next_seo.description,
          site_name: language.next_seo.site_name,
        }}
        twitter={{
          handle: language.next_seo.handle,
          site: language.next_seo.site,
          cardType: language.next_seo.cardType,
        }}
      />
      <Add_car language={language} />
    </Layout>
  );
};

export async function getServerSideProps(props) {
  try {
    return {
      props: {
        edit: props.query?.mode === "edit" ? true : false,
      },
    };
  } catch (error) {
    return {
      props: {
        edit: false,
      },
    };
  }
}

export default AddCar;
