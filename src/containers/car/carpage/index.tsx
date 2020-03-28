import React, { useEffect, useState } from "react";

import { REQUEST_GET_CAR } from "../../../../src/API";
import Router from "next/router";
import Link from "next/link";
import Slider from "../../../../src/components/Slider";
import "./carpage.module.scss";
import Button from "../../../components/form/Button";
import { IoIosLink } from "react-icons/io";

const CarPage = () => {
  const [car, setcar] = useState(null);
  const [year, setyear] = useState(null);
  const [media_set, setmedia_set] = useState([]);
  const [capacity, setcapacity] = useState(null);
  const [
    avg_discounted_price_per_day,
    setavg_discounted_price_per_day
  ] = useState(null);
  const [unit, setUnit] = useState("هراز");
  const [body_style, setbody_style] = useState(null);
  const [transmission_type, settransmission_type] = useState(null);
  const [with_driver, setwith_driver] = useState(null);
  const [description, setdescription] = useState(null);
  const [max_km_per_day, setmax_km_per_day] = useState(null);
  const [extra_km_price_name, setextra_km_price_name] = useState(null);
  const [is_out_of_service, setis_out_of_service] = useState(null);
  const [id, setid] = useState(null);
  const [deliver_at_renters_place, setdeliver_at_renters_place] = useState(
    null
  );
  const [location, setlocation] = useState(null);
  const [mileage_range, setmileage_range] = useState(null);
  const [owner, setowner] = useState(null);
  const [cylinder, setcylinder] = useState(null);
  const [facility_set, setfacility_set] = useState(null);
  const [cancellation_policy, setcancellation_policy] = useState(null);

  useEffect(() => {
    const { search_id } = Router.router.query;
    fetchData(search_id);
  }, []);

  const fetchData = async search_id => {
    const res: any = await REQUEST_GET_CAR({ search_id });
    console.log(res);
    set_CarInfornation(res);
  };

  const set_CarInfornation = res => {
    setcar(res.car);
    setyear(res.year);
    setcapacity(res.capacity);
    setavg_discounted_price_per_day(
      res.avg_discounted_price_per_day >= 10000000
        ? res.avg_discounted_price_per_day_name.slice(0, 4)
        : res.avg_discounted_price_per_day >= 1000000
        ? res.avg_discounted_price_per_day_name.toString().slice(0, 3)
        : res.avg_discounted_price_per_day.toString().slice(0, 3)
    );
    setUnit(res.avg_discounted_price_per_day >= 1000000 ? "میلیون" : "هزار");
    setbody_style(res.body_style);
    settransmission_type(res.transmission_type);
    setwith_driver(res.with_driver);
    setdescription(res.description);
    setmax_km_per_day(res.max_km_per_day);
    setextra_km_price_name(res.extra_km_price_name);
    setis_out_of_service(res.is_out_of_service);
    setid(res.id);
    setdeliver_at_renters_place(res.deliver_at_renters_place);
    setlocation(res.location);
    setmileage_range(res.mileage_range);
    setowner(res.owner);
    setcylinder(res.cylinder);
    setfacility_set(res.facility_set);
    setcancellation_policy(res.cancellation_policy);
    setmedia_set(res.media_set);
  };

  return (
    <>
      {media_set.length > 0 && (
        <>
          <Slider Feed={media_set} alt={`sdfdsf`} />
          <article className="responsive Car_page_container">
            <section className="carInfo_container">
              <h1>
                {car.brand.name.fa} {car.name.fa}
              </h1>
              <h4>{year.name.fa}</h4>
              <hr />
              <h2>محل خودرو و تحویل</h2>
              <p>{location.name.breadcrumb_fa}</p>
              {location.parent_id === 1 && (
                <p>در محدوده تهران، خودرو در محل شما تحویل می‌شود.</p>
              )}
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
              <p>هزینه هر کیلومتر اضافه {extra_km_price_name} تومان</p>
              <hr />
              <h2>توضیحات</h2>
              <pre>{description}</pre>
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
                    {facility_set.map(item => (
                      <p>{item.name.fa}</p>
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
                  {car.category_set.map(item => (
                    <p className="car_Tags">
                      <IoIosLink color="#fff" size="1.6rem" />
                      {item.name.fa}
                    </p>
                  ))}
                </>
              )}
            </section>

            <section className="onwnerInfo_container">
              <div className="avg_discounted_price_per_day">
                <p>{avg_discounted_price_per_day}</p>
                <span className="unit_name">{unit} تومان</span>
                <span> در روز</span>
              </div>
              <figure className="owner_part">
                <img src={owner.thumbnail_url} alt={owner.name} />
                <p>{owner.name}</p>
              </figure>
              <Button
                value="ادامه"
                class="Blue_BTN localClass"
                loading={false}
              />
              <span className="extra_info">
                هزینه را بعد از پذیرش درخواست توسط مالک خودرو پرداخت خواهید کرد.
              </span>
            </section>
          </article>
        </>
      )}
      {/* <Link href={`/checkout?search_id=${carInfo.search_id}`}>
                  <a> */}
      {/* <Slider Feed={media_set} alt = {`${car.brand.name.fa} ${car.name.fa}`}/>  */}
      {/* <figure key={i}> */}
      {/* <img src={item.url} alt={carInfo.car.name.fa} /> */}
      {/* </figure> */}
      {/* </a>
                </Link> */}
    </>
  );
};
export default CarPage;
