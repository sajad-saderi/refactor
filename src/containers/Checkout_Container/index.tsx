import React, { useState, useEffect } from "react";
import { REQUEST_GET_CAR } from "../../API";
import Router from "next/router";
import "./checkout.module.scss";

import Button from "../../components/form/Button";
import { IoMdArrowRoundBack } from "react-icons/io";
import moment from "moment-jalaali";
import Insurance from "./insurance";
import TextInput from "../../components/form/TextInput";
moment.loadPersian({ dialect: "persian-modern" });

const Checkout_Container = () => {
  const [car, setCar] = useState(null);
  const [year, setYear] = useState(null);
  const [media_set, setMedia_set] = useState([]);
  const [
    avg_discounted_price_per_day,
    setAvg_discounted_price_per_day
  ] = useState(null);
  const [unit, setUnit] = useState("هراز");
  const [with_driver, setWith_driver] = useState(null);
  const [max_km_per_day, setMax_km_per_day] = useState(null);
  const [extra_km_price_name, setExtra_km_price_name] = useState(null);
  const [id, setId] = useState(null);
  const [location, setLocation] = useState(null);
  const [owner, setOwner] = useState(null);
  const [cancellation_policy, setCancellation_policy] = useState(null);
  const [search_id, setSearch_id] = useState(null);

  const [start_date, setStart_date] = useState(null);
  const [end_date, setEnd_date] = useState(null);
  const [insurance_total_price, setInsurance_total_price] = useState(null);
  const [total_price, setTotal_price] = useState(null);
  const [has_system_discount, setHas_system_discount] = useState(null);
  const [no_of_days, setNo_of_days] = useState(null);
  const [discounted_total_price, setDiscounted_total_price] = useState(null);
  const [total_discount, setTotal_discount] = useState(null);
  const [showInsurance, setShowInsurance] = useState(true);
  const [showcoupon, setShowcoupon] = useState(false);
  const [couponPrice, setCouponPrice] = useState(0);
  const [coupon, setCoupon] = useState("");
  const [coupanLoading, setCoupanLoading] = useState(false);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const { search_id } = Router.router.query;
    fetchData(search_id);
  }, []);

  const fetchData = async search_id => {
    const res: any = await REQUEST_GET_CAR({ search_id });
    console.log(res);
    set_CarInformation(res);
  };

  const set_CarInformation = res => {
    setCar(res.car);
    setYear(res.year);
    setInsurance_total_price(res.insurance_total_price);
    setAvg_discounted_price_per_day(res.avg_discounted_price_per_day);
    setUnit(res.avg_discounted_price_per_day >= 1000000 ? "میلیون" : "هزار");
    setTotal_price(res.total_price);
    setHas_system_discount(res.has_system_discount);
    setWith_driver(res.with_driver);
    setNo_of_days(res.no_of_days);
    setMax_km_per_day(res.max_km_per_day);
    setExtra_km_price_name(res.extra_km_price_name);
    setDiscounted_total_price(res.discounted_total_price);
    setId(res.id);
    setTotal_discount(res.total_discount);
    setLocation(res.location);
    setOwner(res.owner);
    setCancellation_policy(res.cancellation_policy);
    setMedia_set(res.media_set);
    setSearch_id(res.search_id);
    setStart_date(res.start_date);
    setEnd_date(res.end_date);
  };

  const hasInsurance = e => {
    if (e == 2) setShowInsurance(true);
    else setShowInsurance(false);
  };

  const couponHandler = () => {
    setCoupanLoading(true);
    // تنیجه در couponPrice دخیره شوذ
    setCouponPrice(0);
  };

  const GoToRequests = () => {};

  return (
    media_set.length > 0 && (
      <article className="responsive Checkout_container">
        <section className="car_info_insurance">
          <div className="car_info">
            <div className="car_owner_part">
              <div>
                <h1>
                  {car.brand.name.fa} {car.name.fa}
                </h1>
                <h4>{year.name.fa}</h4>
                <figure className="owner_part">
                  <img src={owner.thumbnail_url} alt={owner.name} />
                  <p>{owner.name}</p>
                </figure>
              </div>
              <figure className="car_image">
                <img src={media_set[0].thumbnail_url} alt={owner.name} />
              </figure>
            </div>
            <hr />
            <h2>شرایط اجاره و کنسلی</h2>
            <p>{cancellation_policy}</p>
            <hr />
            <h2>محل تحویل</h2>
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
            <h2>محدودیت مسافت روزانه</h2>
            <p>{max_km_per_day} کیلومتر در روز</p>
            <p>هزینه هر کیلومتر اضافه {extra_km_price_name} تومان</p>
          </div>
          <div className="insurance">
            <h2>بیمه اجاره</h2>
            <Insurance
              insurance_price={insurance_total_price}
              hasInsurance={hasInsurance}
            />
          </div>
        </section>
        <section className="payment_info_container">
          <div className="Date_container">
            <p>
              {moment(start_date, "jYYYY/jMM/jDD").format("dddd")}
              <br />
              {moment(start_date, "jYYYY/jMM/jDD").format("jDD jMMMM")}
            </p>
            <IoMdArrowRoundBack size="3rem" color="#202020" />
            <p>
              {moment(end_date, "jYYYY/jMM/jDD").format("dddd")}
              <br />
              {moment(end_date, "jYYYY/jMM/jDD").format("jDD jMMMM")}
            </p>
          </div>
          <p className="number_of_days">{`مدت اجاره: ${no_of_days} روز`}</p>
          <div className="payment_information">
            <p>
              <span>قیمت روزانه</span>
              <span>{avg_discounted_price_per_day.toLocaleString()} تومان</span>
            </p>
            <p>
              <span>
                {!has_system_discount
                  ? `تخفیف برای ${no_of_days} روز`
                  : "تخفیف"}
              </span>
              <span>
                {(total_price - discounted_total_price).toLocaleString()}
              </span>
            </p>
            <p>
              <span>جمع اجاره</span>
              <span>{discounted_total_price.toLocaleString()} تومان </span>
            </p>
            <p>
              <span>بیمه</span>
              <span>
                {showInsurance
                  ? `${insurance_total_price.toLocaleString()} تومان`
                  : "ندارد"}
              </span>
            </p>
            {!showcoupon ? (
              <p onClick={() => setShowcoupon(true)}>کد تخفیف دارید؟</p>
            ) : (
              <form onSubmit={couponHandler}>
                <TextInput
                  name="coupon"
                  autoFocus={true}
                  clearField={() => setCoupon("")}
                  error={{
                    status: false,
                    message: ""
                  }}
                  value={coupon}
                  placeholder="کد تخفیف خود را وارد کنید"
                  onChangeHandler={i => setCoupon(i)}
                />
                <Button
                  value="اعمال"
                  class="Blue_BTN coupan_BTN"
                  loading={coupanLoading}
                  click={() => {}}
                />
              </form>
            )}
            <p>
              <span>جمع کل</span>
              <span>
                {showInsurance
                  ? couponPrice > 0
                    ? (couponPrice + insurance_total_price).toLocaleString()
                    : (
                        discounted_total_price + insurance_total_price
                      ).toLocaleString()
                  : couponPrice > 0
                  ? this.state.coupanPrice.toLocaleString()
                  : discounted_total_price.toLocaleString()}
                تومان
              </span>
            </p>
          </div>
          <Button
            value="ثبت درخواست"
            class="Blue_BTN localClass"
            loading={loading}
            click={GoToRequests}
          />
        </section>
      </article>
    )
  );
};

export default Checkout_Container;
