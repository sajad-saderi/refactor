import React from "react";
import Landing_page_container from "../../src/containers/LandignPageContainer";
import Layout from "../../src/Layout";
import { REQUEST_GET_LANDING_PAGE } from "../../src/API";

const Rent_dynamic = (props) => {
  return (
    <Layout>
      <Landing_page_container landing_data={props.Landing_page} />
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
