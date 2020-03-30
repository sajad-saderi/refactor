import React, { useEffect, useState } from "react";

import {
  IoIosCheckboxOutline,
  IoIosCard,
  IoIosRemoveCircle,
  IoIosEyeOff,
  IoLogoModelS,
  IoIosHand,
  IoMdFlag,
  IoMdClock,
  IoIosDownload
} from "react-icons/io";

import "./request_cart.module.scss";

const Request_cart = props => {
  const [rentStatus, setRentStatus] = useState(null);
  const [car, setCar] = useState(null);
  const [start_date, setStart_date] = useState(null);
  const [end_date, setEnd_date] = useState(null);
  const [no_of_days, setNo_of_days] = useState(null);
  const [media_set, setMedia_set] = useState(null);
  const [discounted_total_price, setDiscounted_total_price] = useState(null);

  useEffect(() => {
    if (props.data) {
      let RentStatus = null;
      switch (props.data.status.id) {
        case "new":
          RentStatus = (
            <div className="rent_status">
              <IoIosDownload size="2rem" color="#cccccc" />
              <span>{props.data.status.name}</span>
            </div>
          );
          break;
        case "approved":
          RentStatus = (
            <div className="rent_status">
              <IoIosCard size="2rem" color="#cccccc" />
              <span>{props.data.status.name}</span>
            </div>
          );
          break;
        case "rejected":
          RentStatus = (
            <div className="rent_status">
              <IoIosRemoveCircle size="2rem" color="#cccccc" />
              <span>{props.data.status.name}</span>
            </div>
          );
          break;
        case "cancelled":
          RentStatus = (
            <div className="rent_status">
              <IoIosEyeOff size="2rem" color="#cccccc" />
              <span>{props.data.status.name}</span>
            </div>
          );
          break;
        case "paid":
          RentStatus = (
            <div className="rent_status">
              <IoIosCheckboxOutline size="2rem" color="#cccccc" />
              <span>{props.data.status.name}</span>
            </div>
          );
          break;
        case "not_delivered":
          RentStatus = (
            <div className="rent_status">
              <IoIosHand size="2rem" color="#cccccc" />
              <span>{props.data.status.name}</span>
            </div>
          );
          break;
        case "delivered":
          RentStatus = (
            <div className="rent_status">
              <IoLogoModelS size="2rem" color="#cccccc" />
              <span>{props.data.status.name}</span>
            </div>
          );
          break;
        case "returned":
          RentStatus = (
            <div className="rent_status">
              <IoMdFlag size="2rem" color="#cccccc" />
              <span>{props.data.status.name}</span>
            </div>
          );
          break;
        default:
          RentStatus = (
            <div className="rent_status">
              <IoIosDownload size="2rem" color="#cccccc" />
              <span>{props.data.status.name}</span>
            </div>
          );
          break;
      }
      setRentStatus(RentStatus);
      setCar(props.data.rent_search_dump.car);
      setStart_date(props.data.rent_search_dump.start_date);
      setEnd_date(props.data.rent_search_dump.end_date);
      setNo_of_days(props.data.rent_search_dump.no_of_days);
      setMedia_set(props.data.rent_search_dump.media_set[0]);
      setDiscounted_total_price(
        props.data.rent_search_dump.discounted_total_price
      );
    }
  }, [props.data]);
  return (
    media_set && (
      <>
        {rentStatus}
        <p>
          {car.brand.name.fa} {car.name.fa}
        </p>
        <img
          src={media_set.thumbnail_url}
          alt={`${car.brand.name.fa} ${car.name.fa}`}
        />
        <p>
          {start_date} {end_date}
        </p>
        <p>{no_of_days}</p>
        <p>{discounted_total_price}</p>
      </>
    )
  );
};

interface IRequest_cart {
  data: any;
}

export default Request_cart;
