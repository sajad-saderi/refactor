import React, { useEffect, useState } from "react";

import { REQUEST_GET_RENTAL_CAR } from "../../../../src/API";
import Router from "next/router";
import Slider from "../../../../src/components/Slider";
import Button from "../../../components/form/Button";
import { IoIosLink } from "react-icons/io";
import Link from "next/link";
import DatePicker, { DayRange, utils } from "react-modern-calendar-datepicker";
import "react-modern-calendar-datepicker/lib/DatePicker.css";
import CarPageLoading from "../../../components/cartPlaceholder/carPageLoading";
import { NextSeo } from "next-seo";
import jsCookie from "js-cookie";
import moment from "moment-jalaali";
import Spinner from "../../../components/Spinner";

// use شنبه،یک شنبه و ....
moment.loadPersian({ dialect: "persian-modern" });
// import "./carpage.scss";

const CarPage = () => {
  // set date picker date to get new price and availability
  const [dayRange, setDayRange] = React.useState<DayRange>({
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
  const [
    avg_price_per_day,
    setAvg_price_per_day,
  ] = useState(null);
  const [unit, setUnit] = useState("هراز");
  const [body_style, setBody_style] = useState(null);
  const [transmission_type, setTransmission_type] = useState(null);
  const [with_driver, setWith_driver] = useState(null);
  const [description, setDescription] = useState(null);
  const [max_km_per_day, setMax_km_per_day] = useState(null);
  const [extra_km_price_name, setExtra_km_price_name] = useState(null);
  const [is_out_of_service, setIs_out_of_service] = useState(null);
  const [id, setId] = useState(null);
  const [deliver_at_renters_place, setDeliver_at_renters_place] = useState(
    null
  );
  const [location, setLocation] = useState(null);
  const [mileage_range, setMileage_range] = useState(null);
  const [owner, setOwner] = useState(null);
  const [cylinder, setCylinder] = useState(null);
  const [facility_set, setFacility_set] = useState(null);
  const [cancellation_policy, setCancellation_policy] = useState(null);
  const [search_id, setSearch_id] = useState(null);
  const [loading, setLoading] = useState(false);
  const [showCalender, setShowCalender] = useState(false);
  const [is_mine, setIs_mine] = useState(false);
  const [total_discount, setTotal_discount] = useState(false);
  const [calenderClick, setCalenderClick] = useState(false);
  const [showPriceLoading, setShowPriceLoading] = useState(false);


  useEffect(() => {
    const { search_id, id, owner } = Router.router.query;

    // if the car is mine, I can't rent it
    if (owner) {
      setIs_mine(true);
    }
    // if the page have search id we can get the price
    if (search_id) {
      fetchData({ search_id });
    }
    // if doesn't have search id and it's not mine the user can select day range and get price and search id
    else {
      if (localStorage["start"]) {
        // get the car information and price based on the start date and the end date, if there are on storage. 
        DateSetter(id)
      } else {
        // just get the main info about the car  
        DateSetter(id)
      }
    }
    const handleRouteChange = (url) => {
      if (url.includes("/search-result")) {
        jsCookie.set("JumpTo", 1);
      }
    };
    Router.events.on("routeChangeStart", handleRouteChange);
    return () => {
      Router.events.off("routeChangeStart", handleRouteChange);
    };
  }, []);

  const fetchData = async (data) => {
    let localData = null
    setShowPriceLoading(true)
    try {
      if (data.from && data.to) {
        setDayRange({
          from: data.from,
          to: data.to
        })
        localData = {
          id: Router.router.query.id,
          start_date: `${data.from.year}/${data.from.month}/${data.from.day}`,
          end_date: `${data.to.year}/${data.to.month}/${data.to.day}`,
        };
      } else if (dayRange.from && dayRange.to) {
        localData = {
          id: Router.router.query.id,
          start_date: `${dayRange.from.year}/${dayRange.from.month}/${dayRange.from.day}`,
          end_date: `${dayRange.to.year}/${dayRange.to.month}/${dayRange.to.day}`,
        }
      } else if (data.search_id) {
        localData = { search_id: data.search_id }
      } else {
        localData = { id: data.id }
      }
      const res: any = await REQUEST_GET_RENTAL_CAR(localData)
      set_CarInformation(res);
      setShowPriceLoading(false)
    } catch (error) {
      if (error === "Invalid search_id.") {
        DateSetter(Router.router.query.id)
      }
      console.log("!Error", error);
    }
  };

  const DateSetter = (data) => {
    if (localStorage["start"]) {
      fetchData({
        id: data,
        from: JSON.parse(localStorage["start"]),
        to: JSON.parse(localStorage["end"]),
      });
    } else {
      // if start date and end date is not set, automatically show the result for 3 to 6 days ahead
      const Today = moment().format("jYYYY/jMM/jDD");

      let Start_date = moment(Today)
        .add(3, "day")
        .format("YYYY/MM/DD");
      let End_date = moment(Today)
        .add(6, "day")
        .format("YYYY/MM/DD");
      let SplitStartDate = Start_date.split("/")
      let SplitEndDate = End_date.split("/")
      // just get the main info about the car 
      console.log(+SplitStartDate[0]);

      // show calender if the dates are not on storage
      setShowCalender(true);
      fetchData({
        id: data,
        from: {
          year: +SplitStartDate[0],
          month: +SplitStartDate[1],
          day: +SplitStartDate[2]
        },
        to: {
          year: +SplitEndDate[0],
          month: +SplitEndDate[1],
          day: +SplitEndDate[2]
        }
      });

    }
  }

  const set_CarInformation = (res) => {
    setCar(res.car);
    setYear(res.year);
    setCapacity(res.capacity);
    setAvg_price_per_day(res.avg_price_per_day)
    if (res.avg_discounted_price_per_day > 0) {
      setAvg_discounted_price_per_day(res.avg_discounted_price_per_day
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
    setUnit(res.avg_discounted_price_per_day >= 1000000 ? "میلیون" : "هزار");
    setBody_style(res.body_style);
    setTransmission_type(res.transmission_type);
    setWith_driver(res.with_driver);
    setDescription(res.description);
    setMax_km_per_day(res.max_km_per_day);
    setExtra_km_price_name(res.extra_km_price_name);
    // setIs_out_of_service(res.is_out_of_service);
    // setId(res.id);
    setDeliver_at_renters_place(res.deliver_at_renters_place);
    setLocation(res.location);
    setMileage_range(res.mileage_range);
    setOwner(res.owner);
    setCylinder(res.cylinder);
    setFacility_set(res.facility_set);
    setCancellation_policy(res.cancellation_policy);
    setMedia_set(res.media_set);
    setSearch_id(res.search_id);
    setTotal_discount(res.total_discount);
    setSearch_id(res.search_id);
  };

  const GoToCheckout = () => {
    setLoading(true);
    Router.push({
      pathname: "/checkout",
      query: { search_id: search_id },
    });
  };

  useEffect(() => {
    if (showCalender && calenderClick) {
      console.log("?");

      if (dayRange.from?.day && dayRange.to?.day) {
        fetchData({ id: Router.router.query.id })
      }
    }
  }, [dayRange])

  return (
    <>
      {media_set.length > 0 ? (
        <>
          <NextSeo
            title={`${
              owner.company_name
                ? owner.company_name
                : owner.first_name + " " + owner.last_name
              } - ${car.brand.name.fa} ${car.name.fa} | اتولی`}
            description="همین حالا اجاره کنید"
            noindex={true}
            openGraph={{
              title: `اجاره ${car.brand.name.fa} ${car.name.fa} در اتولی`,
              description: "همین حالا اجاره کنید",
              site_name: "اتولی",
            }}
            twitter={{
              handle: "@otoli_net",
              site: "@otoli_net",
              cardType: "summary_large_image",
            }}
          />
          {
            dayRange.from?.day && dayRange.to?.day
              ? <div className="Top_Rent_date">
                <p>{`از ${dayRange.from.day} ${moment(dayRange.from.month, "jM").format("jMMMM")} تا ${dayRange.to.day} ${moment(dayRange.to.month, "jM").format("jMMMM")}`}</p>
              </div>
              : null
          }
          {/* slider section */}
          <Slider
            Feed={media_set}
            alt={`${car.brand.name.fa} ${car.name.fa}`}
          />
          {/* car info section */}
          <article className="responsive Car_page_container">
            <section className="carInfo_container">
              {showPriceLoading
                ? <div className="price_place_holder">
                  <Spinner color="#737373" display="block" width={20} />
                </div>
                : avg_discounted_price_per_day && (
                  <div className="avg_discounted_price_per_day">
                    <p className={total_discount ? "discount_price" : null}>{avg_price_per_day.toLocaleString()}</p>
                    {total_discount ? <p>{avg_discounted_price_per_day.toLocaleString()}</p> : null}
                    {/* <span className="unit_name">{unit} تومان</span> */}
                    <span>تومان در روز</span>
                  </div>
                )}
              <h1>
                {car.brand.name.fa} {car.name.fa}
              </h1>
              <h4>{year.name.fa}</h4>
              {!is_mine ? (
                showCalender ? (
                  <div className="search_box_div" onClick={() => setCalenderClick(true)}>
                    <DatePicker
                      inputPlaceholder="از تاریخ تا تاریخ"
                      value={dayRange}
                      onChange={setDayRange}
                      shouldHighlightWeekends
                      minimumDate={utils("fa").getToday()}
                      locale="fa"
                      colorPrimary="#4ba3ce"
                      disabledDays={[utils("fa").getToday()]}
                    />
                  </div>
                ) : null
              ) : null}
              <hr />
              <h2>محل خودرو و تحویل</h2>
              <p>{location.name.breadcrumb_fa}</p>
              {location.parent_id === 1 && deliver_at_renters_place ? (
                <p>در محدوده تهران، خودرو در محل شما تحویل می‌شود.</p>
              ) : null}
              {with_driver && (
                <>
                  <hr />
                  <h2>اجاره با راننده</h2>
                  <span>
                    اجاره این خودرو فقط، همراه با راننده امکان‌پذیر است.
                  </span>
                </>
              )}
              <hr />
              <h2>محدودیت مسافت</h2>
              <p>{max_km_per_day} کیلومتر در روز</p>
              <p>هزینه هر کیلومتر اضافه {extra_km_price_name}</p>
              {description && (
                <>
                  <hr />
                  <h2>توضیحات</h2>
                  <pre>{description}</pre>
                </>
              )}
              <hr />
              <h2>مشخصات فنی</h2>
              <div className="info_container">
                <p className="alignThem">
                  <span className="info_name">نوع بدنه</span>{" "}
                  <span className="info_value">{body_style.name.fa}</span>
                </p>
                <p className="alignThem">
                  <span className="info_name">گیربکس</span>{" "}
                  <span className="info_value">
                    {transmission_type.name.fa}
                  </span>
                </p>
                <p className="alignThem">
                  <span className="info_name">سیلندر</span>{" "}
                  <span className="info_value">{cylinder.name.fa}</span>
                </p>
                <p className="alignThem">
                  <span className="info_name">کارکرد</span>{" "}
                  <span className="info_value">{mileage_range.name.fa}</span>
                </p>
                <p className="alignThem">
                  <span className="info_name">ظرفیت</span>{" "}
                  <span className="info_value">{capacity} نفر</span>
                </p>
              </div>

              {facility_set.length > 0 && (
                <>
                  <hr />
                  <h2>امکانات</h2>
                  <div className="facilities_container">
                    {facility_set.map((item) => (
                      <p key={item.id}>{item.name.fa}</p>
                    ))}
                  </div>
                </>
              )}
              <hr />
              <h2>شرایط اجاره و کنسلی</h2>
              <pre>{cancellation_policy}</pre>
              {car.category_set.length > 0 && (
                <>
                  <hr />
                  <h2>برچسب</h2>
                  {car.category_set.map((item) => (
                    <Link
                      key={item.id}
                      href={"/rent/[id]"}
                      as={`/rent/${item.name.en}`}
                    >
                      <a className="car_Tags">
                        <IoIosLink color="#4ba3ce" size="1.6rem" />
                        {item.name.fa}
                      </a>
                    </Link>
                  ))}
                </>
              )}
            </section>
            {/* user info section */}
            <section className="onwnerInfo_container">
              {showPriceLoading
                ? <div className="price_place_holder">
                  <Spinner color="#737373" display="block" width={20} />
                </div>
                : avg_discounted_price_per_day && (
                  <div className="avg_discounted_price_per_day">
                    <p className={total_discount ? "discount_price" : null}>{avg_price_per_day.toLocaleString()}</p>
                    {total_discount ? <p>{avg_discounted_price_per_day.toLocaleString()}</p> : null}
                    {/* <span className="unit_name">{unit} تومان</span> */}
                    <span>تومان در روز</span>
                  </div>
                )}
              {
                dayRange.from?.day && dayRange.to?.day
                  ? <div className="Rent_date">
                    <p>{`از ${dayRange.from.day} ${moment(dayRange.from.month, "jM").format("jMMMM")} تا ${dayRange.to.day} ${moment(dayRange.to.month, "jM").format("jMMMM")}`}</p>
                  </div>
                  : null
              }
              {!is_mine ? (
                showCalender ? (
                  <div className="search_box_div" onClick={() => setCalenderClick(true)}>
                    <DatePicker
                      inputPlaceholder="از تاریخ تا تاریخ"
                      value={dayRange}
                      onChange={setDayRange}
                      shouldHighlightWeekends
                      minimumDate={utils("fa").getToday()}
                      locale="fa"
                      colorPrimary="#4ba3ce"
                      disabledDays={[utils("fa").getToday()]}
                    />
                  </div>
                ) : null
              ) : null}
              <Link href={`/user/[id]`} as={`/user/${owner.id}`}>
                <a>
                  <figure className="owner_part">
                    <img src={owner.thumbnail_url} alt={owner.name} />
                    <p>{owner.name}</p>
                  </figure>
                </a>
              </Link>
              {avg_discounted_price_per_day && (
                <div className="continue_to_checkout">
                  <Button
                    value="ادامه"
                    class="Blue_BTN localClass"
                    loading={loading}
                    click={GoToCheckout}
                  />
                  <span className="extra_info">
                    هزینه را بعد از پذیرش درخواست توسط مالک خودرو پرداخت خواهید
                    کرد.
                  </span>
                </div>
              )}
            </section>
          </article>
        </>
      ) : (
          <>
            <NextSeo title="خودرو | اتولی" />
            <CarPageLoading />
          </>
        )}
    </>
  );
};
export default CarPage;
