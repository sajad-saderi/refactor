import { useState, useRef, useEffect } from "react";
import carImage from "../../../../../public/image/car-image-thumbnail.jpg";
import Link from "next/link";
import Icon from '../../../../../utils/Icon';
// import "./car.scss";

const Car = ({ data, showLocation, tagClick, language }: ICar) => {
  const [h3Width, setH3Width] = useState(null);

  const cardRef = useRef(null);
  const h3Ref = useRef(null);

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
    with_driver,
    without_driver,
    is_promoted,
    has_media,
    location,
    owner,
    start_date,
    end_date,
  } = data;

  let img = has_media ? media_set[0].thumbnail_url : carImage;
  // let imageWidth = has_media ? media_set[0].thumbnail_width : null;
  // let imageHeight = has_media ? media_set[0].thumbnail_height : null;
  let title = car.brand.name.fa + " " + car.name.fa;
  let link = `/car/${id}?search_id=${search_id}`;
  let price =
    avg_discounted_price_per_day >= 10000000
      ? avg_discounted_price_per_day >= 10100000
        ? avg_discounted_price_per_day_name.slice(0, 4)
        : avg_discounted_price_per_day_name.slice(0, 2)
      : avg_discounted_price_per_day >= 1000000
        ? avg_discounted_price_per_day_name.slice(2, 3) === "۰"
          ? avg_discounted_price_per_day_name.toString().slice(0, 1)
          : avg_discounted_price_per_day_name.toString().slice(0, 3)
        : avg_discounted_price_per_day < 100000
          ? avg_discounted_price_per_day.toString().slice(0, 2)
          : avg_discounted_price_per_day.toString().slice(0, 3);

  let unit =
    avg_discounted_price_per_day >= 1000000
      ? language.search_result_section.car.million
      : language.search_result_section.car.thousand;

  let owner_name = owner.company_name ? owner.company_name : owner.name;

  useEffect(() => {
    let containerWidth = cardRef.current.clientWidth;
    let aThirdOfTheContainerWidth = Math.ceil(containerWidth / 3);
    let twoThirdsOfTheContainerWidth =
      containerWidth - aThirdOfTheContainerWidth;
    let carNameWidth = h3Ref.current.clientWidth;

    if (carNameWidth > twoThirdsOfTheContainerWidth)
      setH3Width(twoThirdsOfTheContainerWidth);
  }, []);
  return (
    <div className="carCart HEAP_SearchResult_Card_Car" ref={cardRef}>
      <Link
        href={{
          pathname: "/car/[id]",
          query: {
            id: id,
            search_id: search_id,
            owner_name,
            car_name: title,
            start_date,
            end_date,
          },
        }}
        as={`/car/${id}?search_id=${search_id}&owner_name=${owner_name}&car_name=${title}&start_date=${start_date}&end_date=${end_date}`}
        prefetch={false}
      >
        <a className={`CAR_CART_${title}`}>
          <div className="card_wrapper">
            <figure
              style={{
                backgroundImage: `url(${img})`,
              }}
            >
              {total_discount_percent > 0 && (
                <span className="discount_badge">
                  {total_discount_percent}
                  {language.search_result_section.car.discount}
                </span>
              )}
              {is_promoted && (
                <span className="Special">
                  {language.search_result_section.car.special}
                </span>
              )}
              {/* {has_media ? (
            <img
              style={{
                position: "absolute",
                // control the top position of the image by "setheightController()"
                top: -heightController + "px",
              }}
              src={img}
              className="img-fluid"
              alt={title}
              onLoadCapture={(e) => {
                e.persist();
                // adjust the image at the center of division container
                if (imageHeight > 200) {
                  setheightController(imageHeight - 200);
                }
              }}
            />
          ) : (
            <img
              src={img}
              alt={language.search_result_section.car.default_image}
            />
          )} */}
              <div className="read_more">
                <span>{language.search_result_section.car.show_details}</span>
              </div>
            </figure>
            <div className="info_box">
              <div className="car_brand">
                <h3
                  ref={h3Ref}
                  style={{
                    width: h3Width ? h3Width : "auto",
                  }}
                >
                  {title}
                </h3>
                <p>{year.name.fa}</p>
              </div>
              <div className="price">
                <p className="Price_number">{price}</p>
                <p>{`${unit}${language.search_result_section.car.toman_per_day}`}</p>
              </div>
              <ul className="tags_container">
                {deliver_at_renters_place && (
                  <li>
                    <span className="tags">
                      {language.search_result_section.car.delivar_at_your_palce}
                    </span>
                  </li>
                )}
                {/* {with_driver && (
                  <li>
                    <span className='tags'>
                      {language.search_result_section.car.with_driver}
                    </span>
                  </li>
                )} */}
                {with_driver && (
                  <li>
                    <span className="tags">
                      {language.search_result_section.car.with_driver}
                    </span>
                  </li>
                )}
                {without_driver && (
                  <li>
                    <span className="tags">
                      {language.search_result_section.car.without_driver}
                    </span>
                  </li>
                )}
                {showLocation ? (
                  <li
                    onClick={(e) => {
                      e.preventDefault();
                      tagClick({
                        type: "location",
                        value: location.parent_id === 1 ? 1 : location.id,
                        name:
                          location.parent_id === 1 ? "تهران" : location.name.fa,
                      });
                    }}
                  >
                    <span className="tags location_tag">
                      <Icon name="location" />
                      {location.parent_id === 1 ? "تهران" : location.name.fa}
                    </span>
                  </li>
                ) : null}
              </ul>
            </div>
          </div>
        </a>
      </Link>
    </div>
  );
};

interface ICar {
  data: any;
  showLocation: boolean;
  tagClick: any;
  language: any;
}

export default Car;
