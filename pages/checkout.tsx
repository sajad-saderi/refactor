import React, { useState, useEffect } from "react";
import { REQUEST_GET_CAR } from "../src/API";
import Router from "next/router";
import Link from "next/link";
import Layout from "../src/Layout";

const Checkout = () => {
  const [carInfo, setCarInfo] = useState(null);

  useEffect(() => {
    const { search_id } = Router.router.query;
    fetchData(search_id);
  }, []);

  const fetchData = async search_id => {
    const res: any = await REQUEST_GET_CAR({ search_id });
    console.log(res);
    setCarInfo(res);
  };

  return (
    <Layout>
      {carInfo && (
        <figure>
          <img src={carInfo.media_set[0].thumbnail_url} alt={carInfo.car.name.fa} />
        </figure>
      )}
    </Layout>
  );
};

export default Checkout;
