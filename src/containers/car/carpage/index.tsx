import { useEffect, useState, useRef, useContext } from "react";

import dynamic from "next/dynamic";
const Slider = dynamic(() => import("../../../../src/components/Slider"));
// const Button = dynamic(() => import("../../../components/form/Button"));
const CarPageLoading = dynamic(() =>
  import("../../../components/cartPlaceholder/carPageLoading")
);
const Spinner = dynamic(() => import("../../../components/Spinner"));
const Review = dynamic(() => import("../../../components/Review"));
import {
  REQUEST_GET_CAR_REVIEW,
  REQUEST_GET_RENTAL_CAR,
} from "../../../../src/API";
import { useRouter } from "next/router";
// import Slider from "../../../../src/components/Slider";
import Button from "../../../components/form/Button";
import { IoIosLink, IoIosArrowRoundBack } from "react-icons/io";
import Link from "next/link";
import DatePicker, { DayRange, utils } from "react-modern-calendar-datepicker";
import "react-modern-calendar-datepicker/lib/DatePicker.css";
// import CarPageLoading from "../../../components/cartPlaceholder/carPageLoading";
import jsCookie from "js-cookie";
import moment from "moment-jalaali";
// import Spinner from "../../../components/Spinner";
import carImage from "../../../../public/image/car-image.jpg";
import Icon from "../../../../utils/Icon";
import { initialDate, payBackInObject } from "../../../../utils/date-range-creator";
import { NextSeo } from "next-seo";
import UrlCreator from "../../../../utils/UrlCreator";
import NameAvatar from "../../../components/name_avatar/avatar-name";
import toast_context from "../../../context/Toast_context";
import ErrorHelper from "../../../../utils/error_helper";
// import Review from "../../../components/Review";
import net_CTX from "../../../context/internetConnectionCTX";
import languageCTX from "../../../context/languageCTX";
import appStore from "../../../context/app";
import { dynamicString } from '../../../helpers/dynamicString';
import { dateSlicer } from '../../../helpers/dateSlicer';
import { ICalender } from '../../../../types';
import { twoWayDateConvertor } from '../../../helpers/dateControler';
import { numberChanger } from "../../../../utils/numberChanger"; 

// use شنبه،یک شنبه و ....
moment.loadPersian({ dialect: "persian-modern" });
// import "./carpage.scss";
// let hight_template = 0;
// let initial_slider_hight = 0;
// let initial_offsetY = 0;
// let scrollCount = 0;
let search_id = null;
let calenderClick = null;
let dateObject: ICalender | null = { from: null, to: null }

const CarPage = ({
  language,
  is_mine,
  initial_search_id,
  id,
  expired,
  car_Information,
  start_date,
  end_date,
  searchDate,
	dateChanged
}: ICarPage) => {
  // set date picker date to get new price and availability
  const [dayRange, setDayRange] = useState<DayRange>({
    from: null,
    to: null,
  });
  const [car, setCar] = useState(null);
  const [year, setYear] = useState(null);
  const [media_set, setMedia_set] = useState([]);
  const [capacity, setCapacity] = useState(null);
  const [
    avg_discounted_price_per_day,
    setAvg_discounted_price_per_day,
  ] = useState(null);
  const [avg_price_per_day, setAvg_price_per_day] = useState(null);
  const [unit, setUnit] = useState(`${language.COMMON.thousand}`);
  const [body_style, setBody_style] = useState(null);
  const [transmission_type, setTransmission_type] = useState(null);
  const [with_driver, setWith_driver] = useState(null);
  const [without_driver, setWithout_driver] = useState(null);
  const [description, setDescription] = useState(null);
  const [max_km_per_day, setMax_km_per_day] = useState(null);
  const [extra_km_price_name, setExtra_km_price_name] = useState(null);
  const [is_out_of_service, setIs_out_of_service] = useState(null);
  const [rate, setRate] = useState(null);
  const [deliver_at_renters_place, setDeliver_at_renters_place] = useState(
    null
  );
  const [location, setLocation] = useState(null);
  const [mileage_range, setMileage_range] = useState(null);
  const [extra_hour_price_name, setExtra_hour_price_name] = useState(null);
  const [owner, setOwner] = useState(null);
  const [cylinder, setCylinder] = useState(null);
  const [facility_set, setFacility_set] = useState(null);
  const [cancellation_policy, setCancellation_policy] = useState(null);
  // const [search_id, setSearch_id] = useState(null);
  const [loading, setLoading] = useState(false);
  const [showCalender, setShowCalender] = useState(false);
  const [total_discount, setTotal_discount] = useState(false);
  const [total_discount_percent, setTotal_discount_percent] = useState(false);
  // const [calenderClick, setCalenderClick] = useState(false);
  const [showPriceLoading, setShowPriceLoading] = useState(false);
  const [availableCar, setAvailableCar] = useState(true);
  const [is_verified, setIs_verified] = useState(false);
  const [is_audited, setIs_audited] = useState(false);
  const [showBorder, setShowBorder] = useState(false);
  const [fromDay, setFromDay] = useState("");
  const [toDay, setToDay] = useState("");
  const [no_of_days, setNo_of_days] = useState(null);
  const [showDateText, setShowDateText] = useState(true);
  const [review, setReView] = useState(null);

  // const [move, setMove] = useState(null);
  // const [dummy_div_height, setDummy_div_height] = useState(0);

  // const carousel_section = useRef(null);
  // const context_section = useRef(null);
  const router = useRouter();
  const toastCTX = useContext(toast_context);
  const netCTX = useContext(net_CTX);
  const { activeLanguage } = useContext(languageCTX);
  const { store: { date }, setDate } = useContext(appStore);

  const languageCheck = (id) => {
    if (!searchDate.from) {
      fetchData({ id, from: start_date[activeLanguage].dump, to: end_date[activeLanguage].dump });
    } else {
      fetchData({ id, from: searchDate.from[activeLanguage].dump, to: searchDate.to[activeLanguage].dump });
    }
  }


  useEffect(() => {
		if(dateChanged){
			toastCTX.toast_option({
				message: language.COMMON.datesOfSearchIsChanges,
				color: "#ec7f00",
				time :10,
				hideTimeBar:true,
				autoClose:true,
			});
		}
    if (expired) {
      // DateSetter(id);
      setShowCalender(true);
      languageCheck(id)
    }
    if (!car_Information) {
      if (initial_search_id) {
        fetchData({ search_id: initial_search_id });
      } else if (!router.asPath.includes("start_date")) {
        DateSetter(id);
        setShowCalender(true);
      } else {
        // if doesn't have search id and it's not mine the user can select day range and get price and search id
        setShowCalender(true);
        languageCheck(id)
      }
    } else {
      // fetchData({ search_id });
      if (initial_search_id) {
        search_id = initial_search_id;
      }
          
      setDayRange({
        from: {
          year:   +searchDate.from[activeLanguage].dump.year,
          month:   +searchDate.from[activeLanguage].dump.month,
          day:   +searchDate.from[activeLanguage].dump.day,
        },
        to: {
          year:  +searchDate.to[activeLanguage].dump.year,
          month:  +searchDate.to[activeLanguage].dump.month,
          day:  +searchDate.to[activeLanguage].dump.day,
        },
      })
      setShowCalender(true);
      set_CarInformation(car_Information);
      get_reviews();

      // if (start_date) {
      //   let startDate = start_date.split("/");
      //   let endDate = end_date.split("/");
      //   setDayRange({
      //     from: {
      //       year: +startDate[0],
      //       month: +startDate[1],
      //       day: +startDate[2],
      //     },
      //     to: { year: +endDate[0], month: +endDate[1], day: +endDate[2] },
      //   });
      //   setShowCalender(true);
      // }
      // if (localStorage["start"]) {
      //   let startDate = JSON.parse(localStorage["start"]);
      //   let endDate = JSON.parse(localStorage["end"]);
      //   setDayRange({
      //     from: {
      //       year: startDate.year,
      //       month: startDate.month,
      //       day: startDate.day,
      //     },
      //     to: { year: endDate.year, month: endDate.month, day: endDate.day },
      //   });
      //   setShowCalender(true);
      // }
    }
    // if doesn't have search id and it's not mine the user can select day range and get price and search id
    // else {
    //   // if (localStorage["start"]) {
    //   // get the car information and price based on the start date and the end date, if there are on storage.
    //   DateSetter(id);
    //   // } else {
    //   // just get the main info about the car
    //   // DateSetter(id);
    //   // }
    // }
    const handleRouteChange = (url) => {
      if (url.includes("/search-result")) {
        jsCookie.set("JumpTo", 1);
      }
    };
    router.events.on("routeChangeStart", handleRouteChange);
    // window.addEventListener("scroll", scrollHandler);
    return () => {
      router.events.off("routeChangeStart", handleRouteChange);
      calenderClick = null;
      search_id = null;
      // window.removeEventListener("scroll", scrollHandler);
    };
  }, []);

  // useEffect(() => { 

  //   if (carousel_section.current)
  // }, [carousel_section]);

  const fetchData = async (data) => {
    setNo_of_days("...");
    let localData = null;
    setShowPriceLoading(true);
    try {
      if (data.from && data.to) {
        setDayRange({
          from: data.from,
          to: data.to,
        });
        localData = {
          id: id,
          start_date: `${data.from.year}/${data.from.month}/${data.from.day}`,
          end_date: `${data.to.year}/${data.to.month}/${data.to.day}`,
        };
      } else if (dayRange.from && dayRange.to) {
        localData = {
          id: id,
          start_date: `${dayRange.from.year}/${dayRange.from.month}/${dayRange.from.day}`,
          end_date: `${dayRange.to.year}/${dayRange.to.month}/${dayRange.to.day}`,
        };
      } else if (data.search_id) {
        localData = { search_id: data.search_id };
      } else {
        localData = { id: data.id };
      }
      const res: any = await REQUEST_GET_RENTAL_CAR(localData);
      set_CarInformation(res);
      setShowPriceLoading(false);
      if (res.start_date) {
        let startDate = twoWayDateConvertor(res.start_date)[activeLanguage].dump
        let endDate = twoWayDateConvertor(res.end_date)[activeLanguage].dump
        setDayRange({
          from: {
            year: startDate.year,
            month: startDate.month,
            day: startDate.day,
          },
          to: {
            year: endDate.year,
            month: endDate.month,
            day: endDate.day,
          },
        });
        setShowCalender(true);
      }
      get_reviews();

      // setCalenderClick(false);
    } catch (error) {
      let time = 0;
      let autoClose = false;
      let color = "#ec7f00";
      if (error === 111) {
        netCTX.toggleTheContainer(true);
      }
      let errorMessage = null;
      if (error.response) {
        if (error.response.data.error === "INVALID_SEARCH_ID") {
          initial_search_id = null;
          DateSetter(id);
        } else if (error.response.status === 400) {
          router.push("/404");
          errorMessage = language.COMMON.carNotFound;
          color = "#ed9026";
          toastCTX.toast_option({
            message: errorMessage,
            color: color,
            time,
            autoClose,
          });
        }
      } else {
        errorMessage = error;
        toastCTX.toast_option({
          message: errorMessage,
          color: color,
          time,
          autoClose,
        });
      }
    }
  };

  const get_reviews = async () => {
    try {
      const reviews: any = await REQUEST_GET_CAR_REVIEW(id);
      setReView(reviews.items);
    } catch (error) {
      if (error === 111) {
        netCTX.toggleTheContainer(true);
      } else
        toastCTX.toast_option({
          message: error.response
            ? ErrorHelper({
              errorObj: error.response,
              _400Message:language.COMMON.errorInReviews,
            })
            : error,
          color: "#ed9026",
          time: 0,
          autoClose: false,
        });
    }
  };

  const DateSetter = (id) => {
    let autoGenerateDate = false;
    if (router.asPath.includes("start_date")) {
      const start = twoWayDateConvertor(router.query.start_date as string)[activeLanguage].dump;
      const end = twoWayDateConvertor(router.query.end_date as string)[activeLanguage].dump;
      if (start.day >= moment().jDate()) {
        if (start.month >= moment().jMonth() + 1) {
          fetchData({
            id,
            from: start,
            to: end,
          });
        } else {
          autoGenerateDate = true;
        }
      } else if (start.month > moment().jMonth() + 1) {
        fetchData({
          id,
          from: start,
          to: end,
        });
      } else {
        autoGenerateDate = true;
      }
    } else autoGenerateDate = true;
    if (autoGenerateDate) {
      let { from, to } = initialDate(6, 3);
      // just get the main info about the car
      // show calender if the dates are not on storage
      setShowCalender(true);

      fetchData({ id, from: from[activeLanguage].dump, to: to[activeLanguage].dump });
      toastCTX.toast_option({
        message: language.COMMON.dateIsChanged,
        color: "#ed9026",
        time: 0,
        autoClose: false,
      });
    }
  };

  const set_CarInformation = (res) => {
    setCar(res.car);
    setYear(res.year);
    setCapacity(res.capacity);
    if (res.avg_price_per_day) {
      setAvailableCar(true);
      setAvg_price_per_day(res.avg_price_per_day);
      if (
        res.avg_discounted_price_per_day &&
        res.avg_discounted_price_per_day > 0
      ) {
        setAvg_discounted_price_per_day(
          res.avg_discounted_price_per_day
          // res.avg_discounted_price_per_day >= 10000000
          //   ? res.avg_discounted_price_per_day >= 10100000
          //     ? res.avg_discounted_price_per_day_name.slice(0, 4)
          //     : res.avg_discounted_price_per_day_name.slice(0, 2)
          //   : res.avg_discounted_price_per_day >= 1000000
          //     ? res.avg_discounted_price_per_day_name.slice(2, 3) === "۰"
          //       ? res.avg_discounted_price_per_day_name.toString().slice(0, 1)
          //       : res.avg_discounted_price_per_day_name.toString().slice(0, 3)
          //     : res.avg_discounted_price_per_day.toString().slice(0, 3)
        );
      }
    } else {
      setAvailableCar(false);
    }

    setUnit(
      res.avg_discounted_price_per_day >= 1000000
        ? language.COMMON.million
        : language.COMMON.thousand
    );
    setBody_style(res.body_style);
    setTransmission_type(res.transmission_type);
    setWith_driver(res.with_driver);
    setWithout_driver(res.without_driver);
    setDescription(res.description);
    setMax_km_per_day(res.max_km_per_day?res.max_km_per_day:'');
    if(res.extra_km_price_i18n){
      setExtra_km_price_name(res.extra_km_price_i18n.name_i18n[activeLanguage]);
    }else{
      setExtra_km_price_name(res.extra_km_price_name)
    }

    // setIs_out_of_service(res.is_out_of_service);
    setRate(res.rate);
    setDeliver_at_renters_place(res.deliver_at_renters_place);
    setNo_of_days(res.no_of_days);
    setLocation(res.location);
    setMileage_range(res.mileage_range);
    setIs_verified(res.is_verified);
    setIs_audited(res.is_audited);
    if (res.extra_hour_price > 0)
      if(res.extra_hour_price_i18n){
        setExtra_hour_price_name(res.extra_hour_price_i18n.name_i18n[activeLanguage]);
      }else setExtra_hour_price_name(res.extra_hour_price_name);
    setOwner(res.owner);
    setCylinder(res.cylinder);
    setFacility_set(res.facility_set);
    setCancellation_policy(res.cancellation_policy);
    if (res.has_media) setMedia_set(res.media_set);
    else setMedia_set([{ url: carImage }]);
    // setSearch_id(res.search_id);
    search_id = res.search_id;
    setTotal_discount(res.total_discount);
    setTotal_discount_percent(res.total_discount_percent);
  };

	const dateChecker = () =>{
		if (activeLanguage === 'fa') {
			if (dateObject.from.fa.dump.day >= moment().jDate()) {
				if (dateObject.from.fa.dump.month >= moment().jMonth() + 1) {
					return true
				} else { 
					return false
				}
			} else if (dateObject.from.fa.dump.month > moment().jMonth() + 1) {
				return true
			} else {
				return false 
			}
		} else {
			let date = new Date()
			if (dateObject.from.en.dump.day >= date.getDate()) {
				if (dateObject.from.en.dump.month >= date.getMonth() + 1) {
					return true
				 
				}
				else {
					return false
				}
			} else if (dateObject.from.en.dump.month > date.getMonth() + 1) {
				return true
			} else {
				return false
			}
		}
	}

  const GoToCheckout = () => {
    setLoading(true);
    localStorage["date"] = JSON.stringify(dateObject);
		if(dateChecker()){ 			
			router.push({
				pathname: "/checkout",
				query: { search_id: search_id },
			}, undefined, { locale: activeLanguage });
		}else{
			toastCTX.toast_option({
				message: language.COMMON.dateOfRequestIsNotValid,
				color: "#ec7f00",
				time :10,
				hideTimeBar:true,
				autoClose:true,
			});
			setLoading(false);
			return
		}
    // localStorage["start"] = JSON.stringify(dayRange.from);
    // localStorage["end"] = JSON.stringify(dayRange.to);
  };

  useEffect(() => {
    // if (dayRange.from && dayRange.to) {
    //   setDate(dateObject)
    // }
    if (dayRange.from) {
      setFromDay(convertDate(dayRange.from));
      dateObject.from = twoWayDateConvertor(dayRange.from)
      dateObject.to = null
    } else {
      setFromDay(" ");
      setToDay(" ");
      dateObject = { from: null, to: null }
    }
    if (dayRange.to) {
      setShowBorder(false);
      dateObject.to = twoWayDateConvertor(dayRange.to)
      setToDay(convertDate(dayRange.to));
    } else {
      setToDay(" ");
    }
    if (showCalender && calenderClick) {
      if (dayRange.from?.day && dayRange.to?.day) {
        if (dateObject.from[activeLanguage].dump && dateObject.to[activeLanguage].dump) {
          setDate({ from: dateObject.from[activeLanguage].dump, to: dateObject.to[activeLanguage].dump })
          localStorage['date'] = JSON.stringify(dateObject)
          add_date_to_url();
        }
        calenderClick = false;
        invalidatingSearchId();
        fetchData({ id });
        setShowDateText(true);
      }
    }

  }, [dayRange]);

  const invalidatingSearchId = () => {
    if (router.query?.search_id) {
      delete router.query.search_id;
      UrlCreator({
        query: router.query,
        route: router.asPath,
        cb: (result) => {
          router.replace(decodeURI(result.queryString), undefined, {
            shallow: true,
          });
        },
      });
    }
  };

  const add_date_to_url = () => {
    let start = null;
    let end = null;
    if (router.query.search_id) {
      start = dateObject.from[activeLanguage].name;
      end = dateObject.to[activeLanguage].name;
    } else {
      start = dateObject.from[activeLanguage].name;
      end = dateObject.to[activeLanguage].name;
    }
    router.query = { ...router.query, start_date: start, end_date: end };

    if (router.asPath.includes("start_date")) {
      UrlCreator({
        query: router.query,
        route: router.asPath,
        cb: (result) => {
          router.replace(decodeURI(result.queryString), undefined, {
            shallow: true,
          });
        },
      });
    } else {
      if (router.query.search_id) {
        router.push(
          `${router.asPath}&start_date=${start}&end_date=${end}`,
          undefined,
          {
            shallow: true,
          }
        );
      } else {
        router.push(
          `${router.asPath}?start_date=${start}&end_date=${end}`,
          undefined,
          {
            shallow: true,
          }
        );
      }
    }
  };

  const convertDate = (v) => {
    let value = null
    if (activeLanguage === 'fa') {
      value = moment(`${v.year}/${v.month}/${v.day}`, "jYYYY/jM/jD").format(
        "dddd jDD jMMMM"
      );
    } else {
      value = moment(`${v.year}/${v.month}/${v.day}`, "YYYY/M/D").format(
        "dddd DD MMMM"
      );
    }
    return value;
  };

  const convert_date_to_string_with_slash = (v, change_format) => {
    let value = null;
    if (!change_format) {
      if (activeLanguage === 'fa')
        value = moment(`${v.year}/${v.month}/${v.day}`, "jYYYY/jM/jD").format(
          "jDD/jMM/jYYYY"
        )
      else value = moment(`${v.year}/${v.month}/${v.day}`, "YYYY/M/D").format(
        "DD/MM/YYYY"
      )
    } else {
      if (activeLanguage === 'fa')
        value = moment(`${v.year}/${v.month}/${v.day}`, "jYYYY/jM/jD").format(
          "jYYYY/jMM/jDD"
        )
      else value = moment(`${v.year}/${v.month}/${v.day}`, "YYYY/M/D").format(
        "YYYY/MM/DD"
      )
    }
    return value;
  };

  const convert_string_date_to_object = (str: any) => {


    let convertedDate = null;

    if (str.split("/")[0].length === 4)
      convertedDate = {
        year: +str.split("/")[0],
        month: +str.split("/")[1],
        day: +str.split("/")[2],
      };
    else
      convertedDate = {
        year: +str.split("/")[2],
        month: +str.split("/")[1],
        day: +str.split("/")[0],
      };

    return convertedDate;
  };

  useEffect(() => {
    moment.locale(activeLanguage)
    if (dateObject.from) {
      setDayRange({
        from: {
          year: +dateObject.from[activeLanguage].dump.year,
          month: +dateObject.from[activeLanguage].dump.month,
          day: +dateObject.from[activeLanguage].dump.day
        },
        to: {
          year: +dateObject.to[activeLanguage].dump.year,
          month: +dateObject.to[activeLanguage].dump.month,
          day: +dateObject.to[activeLanguage].dump.day
        }
      })
      // if (dateObject.from[activeLanguage].dump) {
      //   add_date_to_url()
      // }
    }
  }, [
    activeLanguage
  ])

  return (
    <>
      {media_set.length > 0 ? (
        <>
          {expired && (
            <NextSeo
              title={`${owner.company_name
                ? owner.company_name
                : owner.first_name + " " + owner.last_name
                } - ${car.name[activeLanguage]}${language.PAGE_HEADER.carPage.title}`}
              // description={language.next_seo.description}
              noindex={true}
              openGraph={{
                title: `${owner.company_name
                  ? owner.company_name
                  : owner.first_name + " " + owner.last_name
                  } - ${car.name[activeLanguage]}${language.PAGE_HEADER.carPage.title}`,
                // description: language.next_seo.description,
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
                site_name: language.COMMON.sepris,
              }}
              twitter={{
                handle: language.PAGE_HEADER.handle,
                site: language.PAGE_HEADER.site,
                cardType: language.PAGE_HEADER.cardType,
              }}
            />
          )}
          {/* <div style={{ height: `${dummy_div_height}px` }}></div> */}
          {/* <section
            className='slider_portion'
            ref={carousel_section}
            // style={{ height: `${dummy_div_height}px` }}
          > */}
          <Slider
            Feed={media_set}
            alt={`${car.brand.name[activeLanguage]} ${car.name[activeLanguage]}`}
          />
          {/* </section> */}
          {/* car info section */}
          <article className="responsive Car_page_container" dir={activeLanguage === 'fa' ? 'rtl' : 'ltr'}>
            <section className="carInfo_container">
              <div className="first_section_carpage">
                <h1>
                  {car.brand.name[activeLanguage]} {car.name[activeLanguage]}
                  <p className="size_14 year_of_build">({year.name[activeLanguage]})</p>
                  {/* <p className='owner_name_carinfo'>{owner.name}</p> */}
                  {rate?.no_of_received_rates ? (
                    <div className="rate_container">
                      <Icon name="star" />
                      <span>
                        {rate.avg_rate}{" "}
                        <span className="sum_rent">
                          ({rate.no_of_received_rates})
                        </span>
                      </span>
                    </div>
                  ) : null}
                </h1>
                <div className="separate_info">
                  <div className="driver_and_verified">
                    {with_driver && without_driver ? (
                      <div className="driver_container">
                        <span className="tag_class">
                          {language.COMMON.withDriver}
                        </span>
                        <span className="tag_class margin_right_8">
                          {language.COMMON.withoutDriver}
                        </span>
                      </div>
                    ) : with_driver ? (
                      <div className="driver_container">
                        <span className="tag_class">
                          {language.COMMON.withDriver}
                        </span>
                      </div>
                    ) : without_driver ? (
                      <div className="driver_container">
                        <span className="tag_class">
                          {language.COMMON.withoutDriver}
                        </span>
                      </div>
                    ) : null}
                    {is_audited && (
                      <div className="isverified_container tag_class">
                        <span>
                          <Icon name="check" />
                          {language.COMMON.isAudited}
                        </span>
                      </div>
                    )}
                  </div>
                  {showPriceLoading ? (
                    <div className="price_place_holder">
                      <Spinner color="#737373" display="block" width={20} />
                    </div>
                  ) : (
                    availableCar && (
                      <div className="avg_discounted_price_per_day">
                        <div className="discount_part">
                          {total_discount_percent ? (
                            <span className="percentage">
                              {total_discount_percent}%
                            </span>
                          ) : null}
                          <span
                            className={
                              total_discount ? "discount_price" : "normal_price"
                            }
                          >
                            {avg_price_per_day
                              ? numberChanger(avg_price_per_day.toLocaleString(),activeLanguage)
                              : null}
                          </span>
                        </div>
                        {total_discount ? (
                          <p>
                            {avg_discounted_price_per_day
                              ? numberChanger(avg_discounted_price_per_day.toLocaleString(),activeLanguage)
                              : null}
                          </p>
                        ) : null}
                        {/* <span className="unit_name">{unit} تومان</span> */}
                        {avg_price_per_day && (
                          <span className="unit_name">
                            {language.COMMON.tomanPerDay}
                          </span>
                        )}
                      </div>
                    )
                  )}
                </div>
              </div>
              {!is_mine ? (
                showCalender ? (
                  <div className="calender_section_mobile_view">
                    <hr />
                    <h2>
                      <Icon name="calendar" />
                      <span>{language.CAR_PAGE.date}</span>
                    </h2>
                    {showDateText && dayRange.from ? (
                      <div className="Rent_date">
                        <p>
                          <span className="day_name">{`${moment(
                            `${dayRange.from.year}/${dayRange.from.month}/${dayRange.from.day}`,
                            activeLanguage === 'fa' ? "jYYYY/jM/jD" : "YYYY/M/D"
                          ).format("dddd")}،`}</span>
                          {` ${numberChanger((dayRange.from.day).toString(),activeLanguage)} ${moment(
                            dayRange.from.month,
                            activeLanguage === 'fa' ? "jM" : "M"
                          ).format(activeLanguage === 'fa' ? "jMMMM" : "MMMM")}`}
                          <IoIosArrowRoundBack size="2rem" color="#202020" />
                          <span className="day_name">{`${moment(
                            `${dayRange.to.year}/${dayRange.to.month}/${dayRange.to.day}`,
                            activeLanguage === 'fa' ? "jYYYY/jM/jD" : "YYYY/M/D"
                          ).format("dddd")}،`}</span>
                          {` ${numberChanger((dayRange.to.day).toString(),activeLanguage)} ${moment(
                            dayRange.to.month,
                            activeLanguage === 'fa' ? "jM" : "M"
                          ).format(activeLanguage === 'fa' ? "jMMMM" : "MMMM")}`}
                          <br />
                          {no_of_days
                            ? `(${numberChanger((no_of_days).toString(),activeLanguage)} ${dynamicString(null, language.COMMON.day, no_of_days > 1 ? true : false)})`
                            : null}
                        </p>
                        <p
                          className="change_date_in_car_page"
                          onClick={() => {
                            setShowDateText(false);
                            setShowCalender(true);
                          }}
                        >
                          {language.COMMON.change}
                        </p>
                      </div>
                    ) : (
                      <div
                        className="search_box_div"
                        onClick={() => {
                          calenderClick = true;
                          // setCalenderClick(true)
                        }}
                      >
                        <div
                          className={[
                            "date_Input_Container",
                            dayRange.from
                              ? dayRange.to
                                ? activeLanguage === 'fa' ? 'PushToRight' : 'PushToLeft'
                                : activeLanguage === 'fa' ? 'PushToLeft' : 'PushToRight'
                              : activeLanguage === 'fa' ? 'PushToRight' : 'PushToLeft',
                          ].join(" ")}
                          onClick={() => setShowBorder(true)}
                        >
                          <DatePicker
                            value={dayRange}
                            onChange={setDayRange}
                            shouldHighlightWeekends
                            minimumDate={utils(activeLanguage).getToday()}
                            locale={activeLanguage}
                            colorPrimary="#4ba3ce"
                          // disabledDays={[utils("fa").getToday()]}
                          />
                          <div className="input_container">
                            <p className="label">
                              {language.COMMON.pickUpDate}
                            </p>
                            <input
                              data-hj-allow
                              className={
                                showBorder
                                  ? dayRange.from
                                    ? dayRange.to
                                      ? "activeBorder"
                                      : null
                                    : "activeBorder"
                                  : null
                              }
                              readOnly={true}
                              value={fromDay ? numberChanger(fromDay,activeLanguage) : ""}
                            />
                          </div>
                          <div className="input_container">
                            <p className="label">
                              {language.COMMON.dropOffDate}
                            </p>
                            <input
                              data-hj-allow
                              className={[
                                "exception_input",
                                showBorder
                                  ? dayRange.to
                                    ? dayRange.from
                                      ? null
                                      : null
                                    : dayRange.from
                                      ? "activeBorder"
                                      : null
                                  : null,
                              ].join(" ")}
                              readOnly={true}
                              value={toDay ? numberChanger(toDay,activeLanguage) : ""}
                            />
                          </div>
                        </div>
                      </div>
                    )}
                  </div>
                ) : null
              ) : null}
              <hr />
              <h2>
                <Icon name="pin" />
                <span>{language.COMMON.deliver}</span>
              </h2>
              <div className="car_delivery padding_right_24">
                <p className="margin_bottom_16">
                  {location.name[`breadcrumb_${activeLanguage}`]}
                </p>
                {(location.parent_id === 1 || location.id === 1657) && deliver_at_renters_place ? (
                  <p className="margin_bottom_16">
                    {language.COMMON.locationDelivery}
                  </p>
                )
                  //  : location.id === 1657 && deliver_at_renters_place ? (
                  //   <p className="margin_bottom_16">
                  //     {language.deliver_at_tehran_karaj}
                  //     <strong>{language.you_location}</strong>
                  //     {language.mishavad}
                  //   </p>
                  // ) 
                  : (
                    language.COMMON.arrangmentForDelivery
                  )}
              </div>
              <hr />
              <h2>
                <Icon name="document" />
                <span>{language.COMMON.cancellationPolicies}</span>
              </h2>
              <pre className="padding_right_24">{numberChanger(cancellation_policy,activeLanguage)}</pre>
              {/* {with_driver && (
                <>
                  <hr />
                  <h2>{language.with_driver}</h2>
                  <span>{language.just_with_drive}</span>
                </>
              )} */}
              <hr />
              <h2>
                <Icon name="opposite_arrows" />
                <span>{language.COMMON.distance}</span>
              </h2>
              <p className="distance_limitation margin_bottom_16 padding_right_24">
                {language.COMMON.kmLimit}:{" "}
                <strong>
                  {numberChanger((max_km_per_day).toString(),activeLanguage)}
                  {language.COMMON.km}
                </strong>
                {language.COMMON.perDay}
              </p>
              <p className="distance_limitation_penalty margin_bottom_16 padding_right_24">
                {language.COMMON.extraKm}:{" "}
                <strong>{numberChanger((extra_km_price_name).toString(),activeLanguage)}</strong>
              </p>
              {extra_hour_price_name && (
                <p className="margin_bottom_16 hour_limitation_penalty padding_right_24">
                  {language.COMMON.extraTime}:{" "}
                  <strong>{numberChanger((extra_hour_price_name).toString(),activeLanguage)}</strong>
                </p>
              )}
              {description && (
                <>
                  <hr />
                  <h2>
                    <Icon name="car" />
                    <span>{language.COMMON.aboutCar}</span>
                  </h2>
                  <pre className="padding_right_24">{description}</pre>
                </>
              )}
              {facility_set.length > 0 && (
                <>
                  <hr />
                  <h2>
                    <Icon name="boxes" />
                    <span>{language.CAR_PAGE.facilities}</span>
                  </h2>
                  <div className="facilities_container padding_right_24">
                    {facility_set.map((item) => (
                      <p className="tag_class" key={item.id}>
                        {item.name[activeLanguage]}
                      </p>
                    ))}
                  </div>
                </>
              )}
              <hr />
              <h2>
                <Icon name="gear" />
                <span>{language.CAR_PAGE.features}</span>
              </h2>
              <div className="info_container margin_right_24 margin_bottom_24">
                <p className="alignThem">
                  <span className="info_name">{language.COMMON.bodyStyle}</span>{" "}
                  <span className="info_value">{body_style.name[activeLanguage]}</span>
                </p>
                <p className="alignThem">
                  <span className="info_name">{language.CAR_PAGE.transmission}</span>{" "}
                  <span className="info_value">
                    {transmission_type.name[activeLanguage]}
                  </span>
                </p>
                {cylinder ? (
                  <p className="alignThem">
                    <span className="info_name">{language.CAR_PAGE.cylinder}</span>{" "}
                    <span className="info_value">{numberChanger(cylinder.name[activeLanguage],activeLanguage)}</span>
                  </p>
                ) : null}
                <p className="alignThem">
                  <span className="info_name">{language.CAR_PAGE.mileage}</span>{" "}
                  <span className="info_value">{numberChanger(mileage_range.name[activeLanguage],activeLanguage)}</span>
                </p>
                <p className="alignThem">
                  <span className="info_name">{language.CAR_PAGE.capacity}</span>{" "}
                  <span className="info_value">
                    {numberChanger(capacity.toString(),activeLanguage)} {language.CAR_PAGE.persons}
                  </span>
                </p>
              </div>
              {/* <hr /> */}
              {/* <h2>{language.condition_and_cancellation}</h2>
              <pre>{cancellation_policy}</pre> */}
              {/* {car.category_set.length > 0 && (
                <>
                  <hr />
                  <h2>{language.tag}</h2>
                  {car.category_set.map((item) => (
                    <Link
                      key={item.id}
                      href={"/rent/[id]"}
                      as={`/rent/${item.name.en}`}
                    >
                      <a className='car_Tags'>
                        <IoIosLink color='#4ba3ce' size='1.6rem' />
                        {item.name.fa}
                      </a>
                    </Link>
                  ))}
                </>
              )} */}
            </section>
            {/* user info section */}
            <section className="onwnerInfo_container margin_bottom_24">
              {showPriceLoading ? (
                <div className="price_place_holder">
                  <Spinner color="#737373" display="block" width={20} />
                </div>
              ) : (
                availableCar && (
                  <div className="avg_discounted_price_per_day">
                    <div className="discount_part">
                      <span
                        className={
                          total_discount ? "discount_price" : "normal_price"
                        }
                      >
                        {avg_price_per_day
                          ? numberChanger(avg_price_per_day.toLocaleString(),activeLanguage)
                          : null}
                      </span>
                      {total_discount_percent ? (
                        <span className="percentage">
                          {total_discount_percent}%
                        </span>
                      ) : null}
                    </div>
                    {total_discount ? (
                      <p>
                        {avg_discounted_price_per_day
                          ? numberChanger(avg_discounted_price_per_day.toLocaleString(),activeLanguage)
                          : null}
                      </p>
                    ) : null}
                    {/* <span className="unit_name">{unit} تومان</span> */}
                    {avg_price_per_day && (
                      <span className="unit_name">
                        {language.COMMON.tomanPerDay}
                      </span>
                    )}
                  </div>
                )
              )}
              {showDateText && !is_mine && dayRange.from ? (
                <div className="Rent_date">
                  <p>
                    <span className="day_name">
                      {`${moment(
                        `${dayRange.from.year}/${dayRange.from.month}/${dayRange.from.day}`,
                        activeLanguage === 'fa' ? "jYYYY/jM/jD" : "YYYY/M/D"
                      ).format("dddd")}،`}
                    </span>
                    {` ${numberChanger((dayRange.from.day).toString(),activeLanguage)} ${moment(
                      dayRange.from.month,
                      activeLanguage === 'fa' ? "jM" : "M"
                    ).format(activeLanguage === 'fa' ? "jMMMM" : "MMMM")}`}
                    <IoIosArrowRoundBack size="2rem" color="#202020" />
                    <span className="day_name">{`${moment(
                      `${dayRange.to.year}/${dayRange.to.month}/${dayRange.to.day}`,
                      activeLanguage === 'fa' ? "jYYYY/jM/jD" : "YYYY/M/D"
                    ).format("dddd")}،`}</span>
                    {` ${numberChanger((dayRange.to.day).toString(),activeLanguage)} ${moment(
                      dayRange.to.month,
                      activeLanguage === 'fa' ? "jM" : "M"
                    ).format(activeLanguage === 'fa' ? "jMMMM" : "MMMM")}`}{" "}
                    <br />
                    {no_of_days
                      ? `(${numberChanger((no_of_days).toString(),activeLanguage)} ${dynamicString(null, language.COMMON.day, no_of_days > 1 ? true : false)})`
                      : null}
                  </p>
                  <p
                    className="change_date_in_car_page"
                    onClick={() => {
                      setShowDateText(false);
                      setShowCalender(true);
                    }}
                  >
                    {language.COMMON.change}
                  </p>
                </div>
              ) : null}
              {!is_mine ? (
                showCalender && !showDateText ? (
                  <div
                    className="search_box_div HEAP_Car_Input_Calender"
                    onClick={() => {
                      calenderClick = true;
                      // setCalenderClick(true)
                    }}
                  >
                    <div
                      className={[
                        "date_Input_Container",
                        dayRange.from
                          ? dayRange.to
                            ? "PushToRight"
                            : "PushToLeft"
                          : "PushToRight",
                      ].join(" ")}
                      onClick={() => setShowBorder(true)}
                    >
                      <DatePicker
                        value={dayRange}
                        onChange={setDayRange}
                        shouldHighlightWeekends
                        minimumDate={utils(activeLanguage).getToday()}
                        locale={activeLanguage}
                        colorPrimary="#4ba3ce"
                      // disabledDays={[utils("fa").getToday()]}
                      />
                      <div className="input_container">
                        <p className="label">
                          {language.COMMON.pickUpDate}
                        </p>
                        <input
                          data-hj-allow
                          className={
                            showBorder
                              ? dayRange.from
                                ? dayRange.to
                                  ? "activeBorder"
                                  : null
                                : "activeBorder"
                              : null
                          }
                          readOnly={true}
                          value={fromDay ? numberChanger(fromDay,activeLanguage) : ""}
                        />
                      </div>
                      <div className="input_container">
                        <p className="label">
                          {language.COMMON.dropOffDate}
                        </p>
                        <input
                          data-hj-allow
                          className={[
                            "exception_input",
                            showBorder
                              ? dayRange.to
                                ? dayRange.from
                                  ? null
                                  : null
                                : dayRange.from
                                  ? "activeBorder"
                                  : null
                              : null,
                          ].join(" ")}
                          readOnly={true}
                          value={toDay ? numberChanger(toDay, activeLanguage) : ""}
                        />
                      </div>
                    </div>
                  </div>
                ) : null
              ) : null}
              <Link
                href={`/user/[id]`}
                as={`/user/${owner.username ? owner.username : owner.id}`}
                prefetch={false}
              >
                <a className="HEAP_Car_Link_Profile profile_anchor_tag_container">
                  <figure className="owner_part">
                    <div className="owner_part_avatar_container">
                      {owner.thumbnail_url.search("default") === -1 ? (
                        <img
                          className="user_avatar"
                          src={owner.thumbnail_url}
                          alt={owner.name}
                        />
                      ) : (
                        <NameAvatar
                          name={owner.name}
                          css_display="inline-block"
                          css_with={48}
                          css_radius={50}
                          css_text_color="#ffffff"
                          arrayIndex={owner.id % 10}
                        />
                      )}
                      {owner.rate.avg_rate_as_owner ? (
                        <p>
                          <Icon name="star" />
                          {numberChanger((owner.rate.avg_rate_as_owner).toString(),activeLanguage)}
                        </p>
                      ) : null}
                    </div>
                  </figure>
                  <div className="owner_info">
                    <p className="owner_name">{owner.name}</p>
                    <p className="since_from">
                      {dynamicString([dateSlicer(activeLanguage, owner.join_date.name[activeLanguage])], language.COMMON.member)}
                    </p>
                    {owner.no_of_successfully_rented_cars_as_owner > 0 ? (
                      <span>
                        {numberChanger(dynamicString([owner.no_of_successfully_rented_cars_as_owner], language.COMMON.hostOfTrip),activeLanguage)}
                        {/* {language.mizban}{" "}
                        <strong>
                          {owner.no_of_successfully_rented_cars_as_owner}
                          {language.safar}
                        </strong>{" "}
                        {language.bodeh} */}
                      </span>
                    ) : null}
                    {owner.no_of_trips_gone > 0 ? (
                      <span className="margin_top_16 inline_block_container">
                        {numberChanger(dynamicString([owner.no_of_trips_gone], language.COMMON.hasTravel),activeLanguage)}
                        {/* <strong>
                          {owner.no_of_trips_gone}
                          {language.safar}
                        </strong>{" "}
                        با سپریس داشته است. */}
                      </span>
                    ) : null}
                    {owner.owner_response_rate > 0 ? (
                      <p className="size_14 margin_top_16 margin_bottom_16">
                        {numberChanger(dynamicString([owner.owner_response_rate], language.COMMON.responseRate),activeLanguage)}
                        {/* به
                        <strong>
                          {" "}
                          {}% درخواست‌ها{" "}
                        </strong>
                        پاسخ داده است. */}
                      </p>
                    ) : null}
                    {owner.owner_avg_response_time ? (
                      <p className="size_14 margin_top_16 margin_bottom_16">
                        {dynamicString([owner.owner_avg_response_time.total_seconds >= 86400
                          ? language.COMMON.moreOneDay
                          : owner.owner_avg_response_time
                            ? owner.owner_avg_response_time.name_i18n[activeLanguage]
                            :''
                          ], language.COMMON.responseTime)}
                        {/* <strong>
                          {owner.owner_avg_response_time.total_seconds >= 86400
                            ? language.COMMON.moreOneDay
                            : owner.owner_avg_response_time.name}
                        </strong> */}
                      </p>
                    ) : null}
                  </div>
                  <div className="go_to_profile">
                    <p>{language.COMMON.see}</p>
                  </div>
                </a>
              </Link>
              {availableCar && !is_mine ? (
                <div className="continue_to_checkout">
                  <span className="extra_info">{language.COMMON.paymentNote}</span>
                  <Button
                    value={language.COMMON.continue}
                    class="Blue_BTN localClass HEAP_Car_Btn_Continue"
                    loading={loading}
                    click={GoToCheckout}
                  />
                </div>
              ) : null}
            </section>
          </article>
          {review && review.length > 0 ? (
            <Review review={review} language={language} locale={activeLanguage} />
          ) : null}
        </>
      ) : (
        <>
          <CarPageLoading />
        </>
      )}
    </>
  );
};

interface ICarPage {
  language: any;
  is_mine: boolean;
  initial_search_id: string | number;
  id: string | number;
  car_Information: any;
  expired: boolean;
  start_date: string;
  end_date: string;
  searchDate: ICalender,
	dateChanged:boolean
}
export default CarPage;
