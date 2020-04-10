import React from "react";
import Landing_page_container from "../../src/containers/LandignPageContainer";
import Layout from "../../src/Layout";
import { REQUEST_GET_LANDING_PAGE } from "../../src/API";
import { NextSeo } from "next-seo";
import Landing_Page_Content from "../../src/containers/LandignPageContainer/landingPageContent";

const Rent_dynamic = (props) => {
  return (
    <Layout>
      <NextSeo
        title={props.Landing_page.meta_title}
        description={props.Landing_page.meta_description}
        canonical={props.Landing_page.canonical_url}
        openGraph={{
          title: `${props.Landing_page.meta_title}`,
          description: props.Landing_page.meta_description,
          site_name: "اتولی",
        }}
        twitter={{
          handle: "@otoli_net",
          site: "@otoli_net",
          cardType: "summary_large_image",
        }}
      />
      <Landing_page_container landing_data={props.Landing_page} />
      <Landing_Page_Content data={props.Landing_page} />
    </Layout>
  );
};

export async function getServerSideProps(props) {
  const landing_res: any = await REQUEST_GET_LANDING_PAGE({
    name: props.query.id,
  });
  return {
    props: {
      Landing_page: landing_res.data,
    },
  };
}

export default Rent_dynamic;
