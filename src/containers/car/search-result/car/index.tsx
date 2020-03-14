import React, { useState } from "react";
import Link from "next/link";

const Car = props => {
  const [heightController, setheightController] = useState(0);

  const {
    id,
    search_id,
    total_discount_percent,
    has_system_discount,
    media_set,
    car,
    year,
    avg_discounted_price_per_day_name,
    avg_discounted_price_per_day,
    deliver_at_renters_place,
    with_driver
  } = props.data;

  let img = media_set[0].thumbnail_url;
  let title = car.brand.name.fa + " " + car.name.fa;
  let link = `/car/${id}?search_id=${search_id}`;
  return (
    <div
    // className={`strip grid carcard CAR_CART_${title}`}
    >
      <Link href={link}>
        <a className={`strip grid carcard CAR_CART_${title}`}>
          <figure>
            {total_discount_percent > 0 && (
              <span className="wish_bt">
                {/* ٪{convertNumbers2Persian( */}
                {total_discount_percent}
                {/* )} */}
                تخفیف
              </span>
            )}
            {has_system_discount && <span className="wish_bt">ویژه</span>}
            <img
              // style={{ position: "absolute", top: -heightController + "px" }}
              src={img}
              className="img-fluid"
              alt={title}
              onLoadCapture={a => {
                a.persist();
                // let w = a.target.naturalWidth;
                // let h = a.target.naturalHeight;
                // // console.log(title,"==>",w/h)
                // if (w / h < 1.2) {
                //   setheightController((w / h) * 100);
                // }
                // if (w / h < 0.9) {
                //   setheightController((w / h) * 220);
                // }
              }}
            />
            <div className="read_more">
              <span>مشاهده مشخصات</span>
            </div>
          </figure>
          <div className="wrapper row">
            <div className="col-8">
              <h3>
                {title}
                <br />
                <small>{year.name.fa}</small>
                <br />
              </h3>
            </div>

            <div className="col-4 leftbox" style={{ cursor: "default" }}>
              {avg_discounted_price_per_day_name}
              در روز
            </div>

            <ul style={{ cursor: "default" }}>
              {deliver_at_renters_place && (
                <li>
                  <span className="delivery">تحویل در محل</span>
                </li>
              )}
              {with_driver && (
                <li>
                  <span className="delivery">اجاره با راننده</span>
                </li>
              )}
            </ul>
          </div>
        </a>
      </Link>
    </div>
  );
};

export default Car;
