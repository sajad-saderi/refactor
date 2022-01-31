import { NextSeo } from "next-seo";
import dynamic from "next/dynamic";
import moment from 'moment-jalaali';

const Layout = dynamic(() => import("../../src/Layout"));
// const CarPage = dynamic(() => import("../../src/containers/car/carpage"));
// import Layout from "../../src/Layout";
// import { logPageView } from "../../utils/analytics";
import { REQUEST_GET_RENTAL_CAR } from "../../src/API";
import { useRouter } from "next/router";
import { initialDate, payBackInString } from "../../utils/date-range-creator";
import { useContext, useEffect } from "react";
import languageCTX from '../../src/context/languageCTX';

import CarPage from "../../src/containers/car/carpage";
import { twoWayDateConvertor } from '../../src/helpers/dateControler';

const Car = ({
  car_Information,
  is_mine,
  initial_search_id,
  id,
  expired,
  owner_name,
  car_name,
  start_date,
  end_date,
  _404,
	dateChanged,
  locale
}) => {
  const { activeLanguage } = useContext(languageCTX)
  const router = useRouter();
  useEffect(() => {
    if (_404) {
      router.push("/404");
    } else {
      window["dataLayer"].push({
        event: "page_view",
        pageURL: window.location.href,
        pagePath: `/car/${id}`,
        pageTitle: car_Information
          ? `${car_Information.owner.company_name
            ? car_Information.owner.company_name
            : car_Information.owner.first_name +
            " " +
            car_Information.owner.last_name
          } - ${car_Information.car.name[activeLanguage]}${locale.PAGE_HEADER.carPage.title}`
          : `${owner_name} - ${car_name}${locale.PAGE_HEADER.carPage.title}`,
        searchedLocation: localStorage["searchedLocation"]
          ? localStorage["searchedLocation"]
          : "",
      });
    }
    // logPageView();
  }, []);

  return (
    <Layout>
      {car_Information ? (
        <NextSeo
          noindex={true}
          title={`${car_Information.owner.company_name
            ? car_Information.owner.company_name
            : car_Information.owner.first_name +
            " " +
            car_Information.owner.last_name
            } - ${car_Information.car.name[activeLanguage]}${locale.PAGE_HEADER.carPage.title}`}
          // description={locale.carPage.next_seo.description}
          openGraph={{
            title: `${car_Information.owner.company_name
              ? car_Information.owner.company_name
              : car_Information.owner.first_name +
              " " +
              car_Information.owner.last_name
              } - ${car_Information.car.name[activeLanguage]}${locale.PAGE_HEADER.carPage.title}`,
            // description: locale.carPage.next_seo.description,
            images:
              car_Information.media_set.length !== 0
                ? [
                  {
                    url: car_Information.media_set[0].thumbnail_url,
                    width: car_Information.media_set[0].thumbnail_width,
                    height: car_Information.media_set[0].thumbnail_height,
                    alt: `${activeLanguage === 'fa' ? "تصویر خودرو" : "Image of"} ${car_Information.car.slug[activeLanguage]}`,
                  },
                ]
                : [],
            site_name: locale.COMMON.sepris,
          }}
          twitter={{
            handle: locale.PAGE_HEADER.handle,
            site: locale.PAGE_HEADER.site,
            cardType: locale.PAGE_HEADER.cardType,
          }}
        />
      ) : (
        <NextSeo
          noindex={true}
          title={`${owner_name} - ${car_name}${locale.PAGE_HEADER.carPage.title}`}
          description={locale.PAGE_HEADER.carPage.description}
          openGraph={{
            title: `${owner_name} - ${car_name}${locale.PAGE_HEADER.carPage.title}`,
            description: locale.PAGE_HEADER.carPage.description,
            site_name: locale.COMMON.sepris,
          }}
          twitter={{
            handle: locale.PAGE_HEADER.handle,
            site: locale.PAGE_HEADER.site,
            cardType: locale.PAGE_HEADER.cardType,
          }}
        />
      )}
      <CarPage
        language={locale}
        is_mine={is_mine}
        car_Information={car_Information}
        initial_search_id={initial_search_id}
        id={id}
        start_date={start_date}
        searchDate={start_date ? {
          from: start_date,
          to: end_date,
        } : { from: null, to: null }}
        end_date={end_date}
        expired={expired}
				dateChanged={dateChanged}
      />
    </Layout>
  );
};

export async function getServerSideProps(props) {
  let {
    search_id,
    id,
    owner,
    owner_name,
    car_name,
    start_date,
    end_date,
  } = props.query;
let dateChanged=false
  try {
    const generated_start_date = initialDate(6, 3).from;
    const generated_end_date = initialDate(6, 3).to;
		
		if(start_date){
		const temp_start_date = twoWayDateConvertor(start_date)
		const temp_end_date = twoWayDateConvertor(end_date)
		if (props.locale === 'fa') {			
			if (temp_start_date.fa.dump.day >= moment().jDate()) {
				if (temp_start_date.fa.dump.month >= moment().jMonth() + 1) {
					if (temp_start_date.fa.dump.year >= moment().jYear()) {
          }
          else { 
            dateChanged=true
            start_date= generated_start_date.fa.name;
            end_date= generated_end_date.fa.name
          }
				} else {
          if (temp_start_date.fa.dump.year >= moment().jYear()) {
          }else{

            dateChanged=true
            start_date= generated_start_date.fa.name;
            end_date= generated_end_date.fa.name
          } 
				}
			} else if (temp_start_date.fa.dump.month > moment().jMonth() + 1) {
        if (temp_start_date.fa.dump.year >= moment().jYear()) {
        }else{
          dateChanged=true
				start_date= generated_start_date.fa.name;
					end_date= generated_end_date.fa.name
        }
			} else if (temp_start_date.fa.dump.year > moment().jYear()) {
        
      }else {
				dateChanged=true
				start_date= generated_start_date.fa.name;
					end_date= generated_end_date.fa.name
			}
		} else {
			let date = new Date()
			if (temp_start_date.en.dump.day >= date.getDate()) {
				if (temp_start_date.en.dump.month >= date.getMonth() + 1) {
          if (temp_start_date.en.dump.year >= date.getFullYear()) {
          }else{
            dateChanged=true
					start_date= generated_start_date.en.name;
					end_date= generated_end_date.en.name
          }
				}else {
          if (temp_start_date.en.dump.year >= date.getFullYear()) {
          }else{

            dateChanged=true
            start_date= generated_start_date.en.name;
            end_date= generated_end_date.en.name
          }
				}
			} else if (temp_start_date.en.dump.month > date.getMonth() + 1) {
        if (temp_start_date.en.dump.year >= date.getFullYear()) {}
        else{
          dateChanged=true
				start_date= generated_start_date.en.name;
					end_date= generated_end_date.en.name
        }
			} else if (temp_start_date.en.dump.year > date.getFullYear()) {
      }
      else {
				dateChanged=true
				start_date= generated_start_date.en.name;
					end_date= generated_end_date.en.name
			}
		}
	}

    if (owner_name) {
      return {
        props: {
          owner_name,
          car_name,
          car_Information: null,
          is_mine: owner ? owner : null,
          initial_search_id: search_id ? search_id : null,
          expired: false,
          start_date: start_date ? twoWayDateConvertor(start_date) : generated_start_date,
          end_date: end_date ? twoWayDateConvertor(end_date) : generated_end_date,
          id,
					dateChanged
        },
      };
    } else {
      let param = null;
      if (search_id) {
        param = { search_id };
      } else {
        if (start_date) {
          param = {
            id,
            start_date: twoWayDateConvertor(start_date)[props.locale].name,
            end_date: twoWayDateConvertor(end_date)[props.locale].name
          };
        } else {
          param = {
            id,
            start_date: generated_start_date[props.locale].name,
            end_date: generated_end_date[props.locale].name,
          };
        }
      }

      const res: any = await REQUEST_GET_RENTAL_CAR(param);
      return {
        props: {
          car_Information: res,
          is_mine: owner ? owner : null,
          initial_search_id: search_id ? search_id : null,
          start_date: res.start_date
            ? twoWayDateConvertor(res.start_date)
            : start_date
              ? twoWayDateConvertor(start_date)
              : generated_start_date,
          end_date: res.end_date
            ? twoWayDateConvertor(res.end_date)
            : end_date
              ? twoWayDateConvertor(end_date)
              : generated_end_date,
          id,
					dateChanged
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
    if (error === "INVALID_SEARCH_ID") {
      init_props["expired"] = true;
    }
    return {
      props: init_props,
    };
  }
}

export default Car;
