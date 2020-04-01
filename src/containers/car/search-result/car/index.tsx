import React, { useState } from "react";
import Link from "next/link";
import "./car.module.scss";

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
  let imageWidth = media_set[0].thumbnail_width;
  let imageHeight = media_set[0].thumbnail_height;
  let title = car.brand.name.fa + " " + car.name.fa;
  let link = `/car/${id}?search_id=${search_id}`;
  let price =
    avg_discounted_price_per_day >= 10000000
      ? avg_discounted_price_per_day_name.slice(0, 4)
      : avg_discounted_price_per_day >= 1000000
      ? avg_discounted_price_per_day_name.toString().slice(0, 3)
      : avg_discounted_price_per_day.toString().slice(0, 3);

  let unit = avg_discounted_price_per_day >= 1000000 ? "میلیون" : "هزار";
  return (
    <div className={`carcard`}>
      <Link href={`/car/[id]?search_id=${search_id}`} as={link}>
        <a className={`CAR_CART_${title}`}>
          <figure>
            {total_discount_percent > 0 && (
              <span className="discount_badge">
                {total_discount_percent}% تخفیف
              </span>
            )}
            {has_system_discount && <span className="Special">ویژه</span>}
            <img
              style={{ position: "absolute", top: -heightController + "px" }}
              src={img}
              className="img-fluid"
              alt={title}
              onLoadCapture={e => {
                e.persist();
                if (imageHeight > 200) {
                  setheightController(imageHeight - 200);
                }
                // let w = imageWidth;
                // let h = imageHeight;
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
          <div className="info_box">
            <div className="car_brand">
              <h3>{title}</h3>
              <p>{year.name.fa}</p>
            </div>
            <div className="price">
              <p className="Price_number">{price}</p>
              <p>{`${unit} تومان در روز`}</p>
            </div>
            <ul className="tags_container">
              {deliver_at_renters_place && (
                <li>
                  <span className="tags">تحویل در محل</span>
                </li>
              )}
              {with_driver && (
                <li>
                  <span className="tags">اجاره با راننده</span>
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
