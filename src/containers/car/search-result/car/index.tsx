import { useState, useRef, useEffect, useContext } from "react";
import carImage from "../../../../../public/image/car-image-thumbnail.jpg";
import Link from "next/link"; 
import languageCTX from '../../../../context/languageCTX';
import { numberChanger } from "../../../../../utils/numberChanger";
import Icon from "../../../../components/Icons";
// import "./car.scss";

const Car = ({ data, showLocation, tagClick, language }: ICar) => {
  const [h3Width, setH3Width] = useState(null);
  const { activeLanguage } = useContext(languageCTX)
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
  let title = car.brand.name[activeLanguage] + " " + car.name[activeLanguage];
  let link = `/car/${id}?search_id=${search_id}`;
  let price =
    avg_discounted_price_per_day >= 10000000
      ? avg_discounted_price_per_day >= 10100000
        ? numberChanger((avg_discounted_price_per_day / 1000000).toString(),activeLanguage)
        : numberChanger((avg_discounted_price_per_day / 10000000).toString(),activeLanguage)
      : avg_discounted_price_per_day >= 1000000
        ? avg_discounted_price_per_day_name.slice(2, 3) === "."
          ? numberChanger((avg_discounted_price_per_day / 1000000).toString(),activeLanguage)
          : numberChanger((avg_discounted_price_per_day / 1000000).toString(),activeLanguage)
        : avg_discounted_price_per_day < 100000
          ? numberChanger((avg_discounted_price_per_day.toString().slice(0, 2)).toString(),activeLanguage)
          : numberChanger((avg_discounted_price_per_day.toString().slice(0, 3)).toString(),activeLanguage);

  let unit =
    avg_discounted_price_per_day >= 1000000
      ? language.COMMON.million
      : language.COMMON.thousand;

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
                  {numberChanger((total_discount_percent).toString(),activeLanguage)}
                  {language.COMMON.carCard.discount}
                </span>
              )}
              {is_promoted && (
                <span className="Special">
                  {language.COMMON.carCard.special}
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
                <span>{language.COMMON.carCard.details}</span>
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
                <p>{year.name[activeLanguage]}</p>
              </div>
              <div className="price">
                <p className="Price_number">{price}</p>
                <p>{`${unit} ${language.COMMON.tomanPerDay}`}</p>
              </div>
              <ul className="tags_container">
                {deliver_at_renters_place && (
                  <li>
                    <span className="tags">
                      {language.COMMON.delivery}
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
                      {language.COMMON.withDriver}
                    </span>
                  </li>
                )}
                {without_driver && (
                  <li>
                    <span className="tags">
                      {language.COMMON.withoutDriver}
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
                          location.parent_id === 1 ? activeLanguage === 'fa' ? "تهران" : 'tehran' : location.name[activeLanguage],
                      });
                    }}
                  >
                    <span className="tags location_tag">
                      <Icon name="location" color="#116B98" width="20px" height="20px"/>
                      {location.parent_id === 1 ? activeLanguage === 'fa' ? "تهران" : 'tehran' : location.name[activeLanguage]}
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
