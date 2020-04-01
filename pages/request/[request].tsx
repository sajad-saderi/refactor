import React, { useState, useEffect } from "react";
import NextSeo from "next-seo";
import jsCookie from "js-cookie";
import { GET_ORDER_REQUEST } from "../../src/API";
import Router from "next/router";
import Layout from "../../src/Layout";

const Request = () => {
  const [result, setResult] = useState(null);

  useEffect(() => {
    const complete_register = jsCookie.get("complete_register");

    // if (!complete_register) {
    //   alert("you are mot login ");
    //   return;
    // }
    fetchAPI();
  }, []);

  const fetchAPI = async () => {
    const token = jsCookie.get("token");

    const id: string | string[] = Router.query.request;
    try {
      const res: any = await GET_ORDER_REQUEST({
        id: id,
        token: token
      });
      console.log(res);
      setResult(res.data);
    } catch (e) {
      console.log(e.response);
    }
  };

  //   useEffect(() => {
  //     if (!jsCookie.get("token")) {
  //       loginmodal.handleOpenModal();

  //       // toast.error('ابتدا وارد شوید', {
  //       //     position: "bottom-center",
  //       //     autoClose: 3000,
  //       //     hideProgressBar: false,
  //       //     closeOnClick: true,
  //       //     pauseOnHover: true,
  //       //     draggable: true
  //       // });
  //       // Router.push({pathname: '/'})
  //     } else if (!jsCookie.get("first_name")) {
  //       toast.error("ثابت نام خود را کامل کنید", {
  //         position: "bottom-center",
  //         autoClose: 7000,
  //         hideProgressBar: false,
  //         closeOnClick: true,
  //         pauseOnHover: true,
  //         draggable: true
  //       });
  //       Router.push({ pathname: "/complete-register" });
  //     }
  //     fetchAPI();
  //   }, []);

  //   const refcontroller = () => {
  //     myRef.current.focus();
  //   };

  //   const updateInfo = () => {
  //     fetchAPI();
  //   };

  return (
    <Layout>
      {result && (
        <img
          src={result.rent_search_dump.media_set[0].thumbnail_url}
          alt={`${result.rent_search_dump.car.brand.name.fa} ${result.rent_search_dump.car.name.fa}`}
        />
      )}
    </Layout>
  );
};

export default Request;
