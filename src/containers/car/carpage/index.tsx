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
import { payBackInObject } from "../../../../utils/date-range-creator";
import { NextSeo } from "next-seo";
import UrlCreator from "../../../../utils/UrlCreator";
import NameAvatar from "../../../components/name_avatar/avatar-name";
import toast_context from "../../../context/Toast_context";
import ErrorHelper from "../../../../utils/error_helper";
// import Review from "../../../components/Review";

// use شنبه،یک شنبه و ....
moment.loadPersian({ dialect: "persian-modern" });
// import "./carpage.scss";
// let hight_template = 0;
// let initial_slider_hight = 0;
// let initial_offsetY = 0;
// let scrollCount = 0;
let search_id = null;
let calenderClick = null;
const CarPage = ({
  language,
  is_mine,
  initial_search_id,
  id,
  expired,
  car_Information,
  start_date,
  end_date,
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
  const [unit, setUnit] = useState(`${language.thousand}`);
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

  useEffect(() => {
    if (expired) {
      // DateSetter(id);
      setShowCalender(true);
      fetchData({ id, start_date, end_date });
    }
    if (!car_Information) {
      if (router.asPath.includes("start_date")) {
        fetchData({
          id,
          from: convert_string_date_to_object(router.query.start_date),
          to: convert_string_date_to_object(router.query.end_date),
        });
      } else {
        // if the page have search id we can get the price
        if (initial_search_id) {
          fetchData({ search_id: initial_search_id });
          // if (localStorage["start"]) {
          //   let startDate = JSON.parse(localStorage["start"]);
          //   let endDate = JSON.parse(localStorage["end"]);
          // }
        }
        // if doesn't have search id and it's not mine the user can select day range and get price and search id
        else {
          // DateSetter(id);
          setShowCalender(true);
          fetchData({ id, start_date, end_date });
        }
      }
    } else {
      // fetchData({ search_id });
      if (initial_search_id) {
        search_id = initial_search_id;
      }
      setDayRange({
        from: {
          year: +start_date.split("/")[0],
          month: +start_date.split("/")[1],
          day: +start_date.split("/")[2],
        },
        to: {
          year: +end_date.split("/")[0],
          month: +end_date.split("/")[1],
          day: +end_date.split("/")[2],
        },
      });
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
  //   console.log(carousel_section);

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
      setDayRange({
        from: {
          year: +res.start_date.split("/")[0],
          month: +res.start_date.split("/")[1],
          day: +res.start_date.split("/")[2],
        },
        to: {
          year: +res.end_date.split("/")[0],
          month: +res.end_date.split("/")[1],
          day: +res.end_date.split("/")[2],
        },
      });
      setShowCalender(true);
      get_reviews();

      // setCalenderClick(false);
    } catch (error) {
      let errorMessage = null;
      let color = "#ec7f00";
      if (error.response) {
        if (error.response.data.error === "INVALID_SEARCH_ID") {
          DateSetter(id);
          errorMessage = "پارامتر جستجو منقضی شده است. تاریخ جستجو تغییر کرد.";
        } else if (error.response.status === 400) {
          router.push("/404");
          errorMessage = "خودروی مورد نظر یافت نشد.";
          color = "#d83030";
        }
      } else errorMessage = error;
      toastCTX.toast_option({
        message: errorMessage,
        color: color,
        time: 0,
        autoClose: false,
      });
    }
  };

  const get_reviews = async () => {
    try {
      const reviews: any = await REQUEST_GET_CAR_REVIEW(id);
      setReView(reviews.items);
    } catch (error) {
      toastCTX.toast_option({
        message: error.response
          ? ErrorHelper({
              errorObj: error.response,
              _400Message: "خطا در دریافت لیست نظرات",
            })
          : error,
        color: "#d83030",
        time: 0,
        autoClose: false,
      });
    }
  };

  const DateSetter = (id) => {
    // if (localStorage["start"]) {
    //   fetchData({
    //     id,
    //     from: JSON.parse(localStorage["start"]),
    //     to: JSON.parse(localStorage["end"]),
    //   });
    // } else {
    let { from, to } = payBackInObject(6, 3);
    // just get the main info about the car
    // show calender if the dates are not on storage
    setShowCalender(true);
    fetchData({ id, from, to });

    // }
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
        ? language.million
        : language.thousand
    );
    setBody_style(res.body_style);
    setTransmission_type(res.transmission_type);
    setWith_driver(res.with_driver);
    setWithout_driver(res.without_driver);
    setDescription(res.description);
    setMax_km_per_day(res.max_km_per_day);
    setExtra_km_price_name(res.extra_km_price_name);
    // setIs_out_of_service(res.is_out_of_service);
    setRate(res.rate);
    setDeliver_at_renters_place(res.deliver_at_renters_place);
    setNo_of_days(res.no_of_days);
    setLocation(res.location);
    setMileage_range(res.mileage_range);
    setIs_verified(res.is_verified);
    setIs_audited(res.is_audited);
    if (res.extra_hour_price > 0)
      setExtra_hour_price_name(res.extra_hour_price_name);
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

  const GoToCheckout = () => {
    setLoading(true);
    localStorage["start"] = JSON.stringify(dayRange.from);
    localStorage["end"] = JSON.stringify(dayRange.to);
    router.push({
      pathname: "/checkout",
      query: { search_id: search_id },
    });
  };

  useEffect(() => {
    if (showCalender && calenderClick) {
      if (dayRange.from?.day && dayRange.to?.day) {
        calenderClick = false;
        add_date_to_url();
        fetchData({ id });
        setShowDateText(true);
      }
    }
    if (dayRange.from) {
      setFromDay(convertDate(dayRange.from));
    } else {
      setFromDay(" ");
      setToDay(" ");
    }
    if (dayRange.to) {
      setShowBorder(false);
      setToDay(convertDate(dayRange.to));
    } else {
      setToDay(" ");
    }
  }, [dayRange]);

  const add_date_to_url = () => {
    let start = null;
    let end = null;
    if (router.query.search_id) {
      start = convert_date_to_string_with_slash(dayRange.from, false);
      end = convert_date_to_string_with_slash(dayRange.to, false);
    } else {
      start = convert_date_to_string_with_slash(dayRange.from, true);
      end = convert_date_to_string_with_slash(dayRange.to, true);
    }
    router.query = { ...router.query, start_date: start, end_date: end };
    // console.log(router);
    if (router.asPath.includes("start_date")) {
      UrlCreator({
        query: router.query,
        route: router.asPath,
        cb: (result) => {
          router.push(decodeURI(result.queryString), undefined, {
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
    let value = moment(`${v.year}/${v.month}/${v.day}`, "jYYYY/jM/jD").format(
      "dddd jDD jMMMM"
    );
    return value;
  };

  const convert_date_to_string_with_slash = (v, change_format) => {
    let value = null;
    if (!change_format) {
      value = moment(`${v.year}/${v.month}/${v.day}`, "jYYYY/jM/jD").format(
        "jDD/jMM/jYYYY"
      );
    } else {
      value = moment(`${v.year}/${v.month}/${v.day}`, "jYYYY/jM/jD").format(
        "jYYYY/jMM/jDD"
      );
    }
    return value;
  };

  const convert_string_date_to_object = (str: any) => {
    return {
      day: str.split("/")[0],
      month: str.split("/")[1],
      year: str.split("/")[2],
    };
  };

  // useEffect(() => {
  //   if (carousel_section.current) {
  //     let height = carousel_section.current.scrollHeight;
  //     setDummy_div_height(height);
  //     initial_slider_hight = height;
  //     hight_template = height;
  //   }
  // }, [carousel_section.current]);

  // const scrollHandler = (event) => {
  //   //  amount of scroll
  //   let pageOffset = window.pageYOffset;
  //   let scrolled_px = 0;
  //   if (initial_offsetY > pageOffset) {
  //     scrolled_px = initial_offsetY - window.pageYOffset;
  //     initial_offsetY = pageOffset;
  //     // up
  //     if (scrolled_px > 10) {
  //       if (scrollCount >= 0) {
  //         scrollCount--;
  //         hight_template = initial_slider_hight;
  //         setDummy_div_height(initial_slider_hight);
  //       } else {
  //         hight_template = hight_template * 2;
  //         setDummy_div_height(hight_template);
  //       }
  //     }
  //     console.log("hight_template", hight_template);
  //   } else if (initial_offsetY < pageOffset) {
  //     scrolled_px = window.pageYOffset - initial_offsetY;
  //     initial_offsetY = pageOffset;
  //     // down
  //     if (scrolled_px > 10) {
  //       if (scrollCount > 3) {
  //         scrollCount++;
  //         hight_template = hight_template / 2;
  //         setDummy_div_height(hight_template);
  //       } else {
  //         hight_template = 0;
  //         setDummy_div_height(0);
  //       }
  //     }

  //     // if (hight_template > 0) {
  //     //   hight_template = hight_template - scrolled_px * 2;
  //     //   setDummy_div_height(hight_template);
  //     // } else {
  //     //   hight_template = 0;
  //     //   setDummy_div_height(0);
  //     // }
  //   }
  // };

  return (
    <>
      {media_set.length > 0 ? (
        <>
          {expired && (
            <NextSeo
              title={`${
                owner.company_name
                  ? owner.company_name
                  : owner.first_name + " " + owner.last_name
              } - ${car.name.fa}${language.next_seo.title.otoli}`}
              // description={language.next_seo.description}
              noindex={true}
              openGraph={{
                title: `${
                  owner.company_name
                    ? owner.company_name
                    : owner.first_name + " " + owner.last_name
                } - ${car.name.fa}${language.next_seo.title.otoli}`,
                // description: language.next_seo.description,
                images:
                  car_Information.media_set.length !== 0
                    ? [
                        {
                          url: car_Information.media_set[0].thumbnail_url,
                          width: car_Information.media_set[0].thumbnail_width,
                          height: car_Information.media_set[0].thumbnail_height,
                          alt: `تصویر خودرو ${car_Information.car.slug.fa}`,
                        },
                      ]
                    : [],
                site_name: language.next_seo.site_name,
              }}
              twitter={{
                handle: language.next_seo.handle,
                site: language.next_seo.site,
                cardType: language.next_seo.cardType,
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
            alt={`${car.brand.name.fa} ${car.name.fa}`}
          />
          {/* </section> */}
          {/* car info section */}
          <article className="responsive Car_page_container">
            <section className="carInfo_container">
              <div className="first_section_carpage">
                <h1>
                  {car.brand.name.fa} {car.name.fa}
                  <p className="size_14 year_of_build">({year.name.fa})</p>
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
                          {language.with_and_without_driver1}
                        </span>
                        <span className="tag_class margin_right_8">
                          {language.with_and_without_driver2}
                        </span>
                      </div>
                    ) : with_driver ? (
                      <div className="driver_container">
                        <span className="tag_class">
                          {language.just_with_drive}
                        </span>
                      </div>
                    ) : without_driver ? (
                      <div className="driver_container">
                        <span className="tag_class">
                          {language.without_derive}
                        </span>
                      </div>
                    ) : null}
                    {is_audited && (
                      <div className="isverified_container tag_class">
                        <span>
                          <Icon name="check" />
                          {language.is_audited}
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
                              ? avg_price_per_day.toLocaleString()
                              : null}
                          </span>
                        </div>
                        {total_discount ? (
                          <p>
                            {avg_discounted_price_per_day
                              ? avg_discounted_price_per_day.toLocaleString()
                              : null}
                          </p>
                        ) : null}
                        {/* <span className="unit_name">{unit} تومان</span> */}
                        {avg_price_per_day && (
                          <span className="unit_name">
                            {language.toman_per_day}
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
                      <span>{language.calender_section_mobile_view_h2}</span>
                    </h2>
                    {showDateText && dayRange.from ? (
                      <div className="Rent_date">
                        <p>
                          <span className="day_name">{`${moment(
                            `${dayRange.from.year}/${dayRange.from.month}/${dayRange.from.day}`,
                            "jYYYY/jM/jD"
                          ).format("dddd")}،`}</span>
                          {` ${dayRange.from.day} ${moment(
                            dayRange.from.month,
                            "jM"
                          ).format("jMMMM")}`}
                          <IoIosArrowRoundBack size="2rem" color="#202020" />
                          <span className="day_name">{`${moment(
                            `${dayRange.to.year}/${dayRange.to.month}/${dayRange.to.day}`,
                            "jYYYY/jM/jD"
                          ).format("dddd")}،`}</span>
                          {` ${dayRange.to.day} ${moment(
                            dayRange.to.month,
                            "jM"
                          ).format("jMMMM")}`}{" "}
                          {no_of_days
                            ? `(${no_of_days} ${language.Rent_date_day})`
                            : null}
                        </p>
                        <p
                          className="change_date_in_car_page"
                          onClick={() => {
                            setShowDateText(false);
                            setShowCalender(true);
                          }}
                        >
                          {language.change_date_in_car_page_change_date}
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
                            minimumDate={utils("fa").getToday()}
                            locale="fa"
                            colorPrimary="#4ba3ce"
                            // disabledDays={[utils("fa").getToday()]}
                          />
                          <div className="input_container">
                            <p className="label">
                              {language.input_container_label_start_date}
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
                              value={fromDay ? fromDay : ""}
                            />
                          </div>
                          <div className="input_container">
                            <p className="label">
                              {language.input_container_label_end_date}
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
                              value={toDay ? toDay : ""}
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
                <span>{language.location_for_deliver}</span>
              </h2>
              <div className="car_delivery padding_right_24">
                <p className="margin_bottom_16">
                  {location.name.breadcrumb_fa}
                </p>
                {location.parent_id === 1 && deliver_at_renters_place ? (
                  <p className="margin_bottom_16">
                    {language.deliver_at_tehran}
                    <strong>{language.you_location}</strong>
                    {language.mishavad}
                  </p>
                ) : location.id === 1657 && deliver_at_renters_place ? (
                  <p className="margin_bottom_16">
                    {language.deliver_at_tehran_karaj}
                    <strong>{language.you_location}</strong>
                    {language.mishavad}
                  </p>
                ) : null}
              </div>
              <hr />
              <h2>
                <Icon name="document" />
                <span>{language.condition_and_cancellation}</span>
              </h2>
              <pre className="padding_right_24">{cancellation_policy}</pre>
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
                <span>{language.distance_in_day}</span>
              </h2>
              <p className="distance_limitation margin_bottom_16 padding_right_24">
                {language.KM_in_day_limit}:{" "}
                <strong>
                  {max_km_per_day}
                  {language.KM}
                </strong>
                {language.KM_in_day}
              </p>
              <p className="distance_limitation_penalty margin_bottom_16 padding_right_24">
                {language.extra_price_limit}:{" "}
                <strong>{extra_km_price_name}</strong>
              </p>
              {extra_hour_price_name && (
                <p className="margin_bottom_16 hour_limitation_penalty padding_right_24">
                  {language.extra_hour_limit}:{" "}
                  <strong>{extra_hour_price_name}</strong>
                </p>
              )}
              {description && (
                <>
                  <hr />
                  <h2>
                    <Icon name="car" />
                    <span>{language.about_car}</span>
                  </h2>
                  <pre className="padding_right_24">{description}</pre>
                </>
              )}
              {facility_set.length > 0 && (
                <>
                  <hr />
                  <h2>
                    <Icon name="boxes" />
                    <span>{language.facilities}</span>
                  </h2>
                  <div className="facilities_container padding_right_24">
                    {facility_set.map((item) => (
                      <p className="tag_class" key={item.id}>
                        {item.name.fa}
                      </p>
                    ))}
                  </div>
                </>
              )}
              <hr />
              <h2>
                <Icon name="gear" />
                <span>{language.features}</span>
              </h2>
              <div className="info_container margin_right_24 margin_bottom_24">
                <p className="alignThem">
                  <span className="info_name">{language.body_style}</span>{" "}
                  <span className="info_value">{body_style.name.fa}</span>
                </p>
                <p className="alignThem">
                  <span className="info_name">{language.gear_box}</span>{" "}
                  <span className="info_value">
                    {transmission_type.name.fa}
                  </span>
                </p>
                {cylinder ? (
                  <p className="alignThem">
                    <span className="info_name">{language.cylinder}</span>{" "}
                    <span className="info_value">{cylinder.name.fa}</span>
                  </p>
                ) : null}
                <p className="alignThem">
                  <span className="info_name">{language.mile_age}</span>{" "}
                  <span className="info_value">{mileage_range.name.fa}</span>
                </p>
                <p className="alignThem">
                  <span className="info_name">{language.capacity}</span>{" "}
                  <span className="info_value">
                    {capacity} {language.person}
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
                          ? avg_price_per_day.toLocaleString()
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
                          ? avg_discounted_price_per_day.toLocaleString()
                          : null}
                      </p>
                    ) : null}
                    {/* <span className="unit_name">{unit} تومان</span> */}
                    {avg_price_per_day && (
                      <span className="unit_name">
                        {language.toman_per_day}
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
                        "jYYYY/jM/jD"
                      ).format("dddd")}،`}
                    </span>
                    {` ${dayRange.from.day} ${moment(
                      dayRange.from.month,
                      "jM"
                    ).format("jMMMM")}`}
                    <IoIosArrowRoundBack size="2rem" color="#202020" />
                    <span className="day_name">{`${moment(
                      `${dayRange.to.year}/${dayRange.to.month}/${dayRange.to.day}`,
                      "jYYYY/jM/jD"
                    ).format("dddd")}،`}</span>
                    {` ${dayRange.to.day} ${moment(
                      dayRange.to.month,
                      "jM"
                    ).format("jMMMM")}`}{" "}
                    {no_of_days
                      ? `(${no_of_days} ${language.Rent_date_day})`
                      : null}
                  </p>
                  <p
                    className="change_date_in_car_page"
                    onClick={() => {
                      setShowDateText(false);
                      setShowCalender(true);
                    }}
                  >
                    {language.change_date_in_car_page_change_date}
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
                        minimumDate={utils("fa").getToday()}
                        locale="fa"
                        colorPrimary="#4ba3ce"
                        // disabledDays={[utils("fa").getToday()]}
                      />
                      <div className="input_container">
                        <p className="label">
                          {language.input_container_label_start_date}
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
                          value={fromDay ? fromDay : ""}
                        />
                      </div>
                      <div className="input_container">
                        <p className="label">
                          {language.input_container_label_end_date}
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
                          value={toDay ? toDay : ""}
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
                          {owner.rate.avg_rate_as_owner}
                        </p>
                      ) : null}
                    </div>
                  </figure>
                  <div className="owner_info">
                    <p className="owner_name">{owner.name}</p>
                    <p className="since_from">
                      {language.az}
                      <strong>
                        {owner.join_date.name.fa.split("،")[0].slice(2)}
                      </strong>
                      {language.member}
                    </p>
                    {owner.no_of_successfully_rented_cars_as_owner > 0 ? (
                      <span>
                        {language.mizban}{" "}
                        <strong>
                          {owner.no_of_successfully_rented_cars_as_owner}
                          {language.safar}
                        </strong>{" "}
                        {language.bodeh}
                      </span>
                    ) : null}
                    {owner.owner_avg_response_time ? (
                      <p className="size_14 margin_top_16 margin_bottom_16">
                        {language.mamoolan}
                        <strong>
                          {language.hodood}{" "}
                          {owner.owner_avg_response_time.total_seconds >= 86400
                            ? language.more_than_one_day
                            : owner.owner_avg_response_time.name}{" "}
                        </strong>
                        {language.pasokh}
                      </p>
                    ) : null}
                  </div>
                  <div className="go_to_profile">
                    <p>{language.moshahedeh}</p>
                  </div>
                </a>
              </Link>
              {availableCar && !is_mine ? (
                <div className="continue_to_checkout">
                  <Button
                    value="ادامه"
                    class="Blue_BTN localClass HEAP_Car_Btn_Continue"
                    loading={loading}
                    click={GoToCheckout}
                  />
                  <span className="extra_info">{language.extra_info}</span>
                </div>
              ) : null}
            </section>
          </article>
          {review && review.length > 0 ? (
            <Review review={review} language={language.review} />
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
}
export default CarPage;
