import React from "react";
import Layout from "../../src/Layout";
import CarPage from "../../src/containers/car/carpage";
import { NextSeo } from "next-seo";
import language from "../../public/languages/fa/carpage.json";
// import { logPageView } from "../../utils/analytics";
import { REQUEST_GET_RENTAL_CAR } from "../../src/API";

const Car = ({ car_Information, is_mine, initial_search_id, id, expired }) => {
  React.useEffect(() => {
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
        <NextSeo title={language.next_seo.load_title} noindex={true} />
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
  let { search_id, id, owner } = props.query;
  try {
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
  } catch (error) {
    let init_props = {
      car_Information: null,
      is_mine: false,
      initial_search_id: null,
      id,
    };
    if (error === "Invalid search_id.") {
      init_props["expired"] = true;
    }
    return {
      props: init_props,
    };
  }
}

export default Car;
