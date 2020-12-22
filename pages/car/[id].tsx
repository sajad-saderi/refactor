import React from "react";
import Layout from "../../src/Layout";
import CarPage from "../../src/containers/car/carpage";
import { NextSeo } from "next-seo";
import language from "../../public/languages/fa/carpage.json";
// import { logPageView } from "../../utils/analytics";
import { REQUEST_GET_RENTAL_CAR } from "../../src/API";
import { useRouter } from "next/router";

const Car = ({
  car_Information,
  is_mine,
  initial_search_id,
  id,
  expired,
  owner_name,
  car_name,
  _404,
}) => {
  const router = useRouter();
  React.useEffect(() => {
    if (_404) {
      router.push("/404");
    } else {
      window["dataLayer"].push({
        event: "page_view",
        pageURL: window.location.href,
        pagePath: `/car/${id}`,
        pageTitle: car_Information
          ? `${
              car_Information.owner.company_name
                ? car_Information.owner.company_name
                : car_Information.owner.first_name +
                  " " +
                  car_Information.owner.last_name
            } - ${car_Information.car.name.fa}${language.next_seo.title.otoli}`
          : `${owner_name} - ${car_name}${language.next_seo.title.otoli}`,
      });
    }
    // logPageView();
  }, []);

  return (
    <Layout>
      {car_Information ? (
        <NextSeo
          noindex={true}
          title={`${
            car_Information.owner.company_name
              ? car_Information.owner.company_name
              : car_Information.owner.first_name +
                " " +
                car_Information.owner.last_name
          } - ${car_Information.car.name.fa}${language.next_seo.title.otoli}`}
          description={language.next_seo.description}
          openGraph={{
            title: `${
              car_Information.owner.company_name
                ? car_Information.owner.company_name
                : car_Information.owner.first_name +
                  " " +
                  car_Information.owner.last_name
            } - ${car_Information.car.name.fa}${language.next_seo.title.otoli}`,
            description: language.next_seo.description,
            site_name: language.next_seo.site_name,
          }}
          twitter={{
            handle: language.next_seo.handle,
            site: language.next_seo.site,
            cardType: language.next_seo.cardType,
          }}
        />
      ) : (
        <NextSeo
          noindex={true}
          title={`${owner_name} - ${car_name}${language.next_seo.title.otoli}`}
          description={language.next_seo.description}
          openGraph={{
            title: `${owner_name} - ${car_name}${language.next_seo.title.otoli}`,
            description: language.next_seo.description,
            site_name: language.next_seo.site_name,
          }}
          twitter={{
            handle: language.next_seo.handle,
            site: language.next_seo.site,
            cardType: language.next_seo.cardType,
          }}
        />
      )}
      <CarPage
        language={language}
        is_mine={is_mine}
        car_Information={car_Information}
        initial_search_id={initial_search_id}
        id={id}
        expired={expired}
      />
    </Layout>
  );
};

export async function getServerSideProps(props) {
  let { search_id, id, owner, owner_name, car_name } = props.query;
  try {
    if (owner_name) {
      return {
        props: {
          owner_name,
          car_name,
          car_Information: null,
          is_mine: owner ? owner : null,
          initial_search_id: search_id ? search_id : null,
          expired: false,
          id,
        },
      };
    } else {
      let param = null;
      if (search_id) {
        param = { search_id };
      } else {
        param = { id };
      }
      const res: any = await REQUEST_GET_RENTAL_CAR(param);
      return {
        props: {
          car_Information: res,
          is_mine: owner ? owner : null,
          initial_search_id: search_id ? search_id : null,
          id,
        },
      };
    }
  } catch (error) {
    let init_props = {
      car_Information: null,
      is_mine: false,
      initial_search_id: null,
      id,
    };
    if (error === "Not found!") {
      init_props["expired"] = true;
      init_props["_404"] = true;
    }
    if (error === "Invalid search_id.") {
      init_props["expired"] = true;
    }
    return {
      props: init_props,
    };
  }
}

export default Car;
