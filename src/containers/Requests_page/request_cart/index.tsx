import React, { useEffect, useState } from "react";
import moment from "moment-jalaali";
import {
  IoIosCheckboxOutline,
  IoIosCard,
  IoIosRemoveCircle,
  IoIosEyeOff,
  IoLogoModelS,
  IoIosHand,
  IoMdFlag,
  IoIosDownload,
  IoMdArrowRoundBack,
  IoMdPerson,
  IoMdPhonePortrait
} from "react-icons/io";
import PelakView from "../../../components/pelak";

import "./request_cart.module.scss";
import Link from "next/link";

moment.loadPersian({ dialect: "persian-modern" });

const Request_cart = (props: IRequest_cart) => {
  const [rentStatus, setRentStatus] = useState(null);
  const [status_id, setStatus_id] = useState(null);
  const [car, setCar] = useState(null);
  const [start_date, setStart_date] = useState(null);
  const [end_date, setEnd_date] = useState(null);
  const [no_of_days, setNo_of_days] = useState(null);
  const [media_set, setMedia_set] = useState(null);
  const [discounted_total_price, setDiscounted_total_price] = useState(null);
  // "renter" ? true: false
  const [role, setRole] = useState(true);
  const [owner_Info, setOwner_Info] = useState(null);
  const [renter_info, setRenter_info] = useState(null);
  const [pelak, setPelak] = useState(null);

  useEffect(() => {
    if (props.data) {
      let RentStatus = null;
      setStatus_id(props.data.status.id);
      switch (props.data.status.id) {
        case "new":
          RentStatus = (
            <div className="rent_status">
              <IoIosDownload size="1.4rem" color="#656565" />
              <span>{props.data.status.name}</span>
            </div>
          );
          break;
        case "approved":
          RentStatus = (
            <div className="rent_status">
              <IoIosCard size="1.4rem" color="#656565" />
              <span>{props.data.status.name}</span>
            </div>
          );
          break;
        case "rejected":
          RentStatus = (
            <div className="rent_status">
              <IoIosRemoveCircle size="1.4rem" color="#656565" />
              <span>{props.data.status.name}</span>
            </div>
          );
          break;
        case "cancelled":
          RentStatus = (
            <div className="rent_status">
              <IoIosEyeOff size="1.4rem" color="#656565" />
              <span>{props.data.status.name}</span>
            </div>
          );
          break;
        case "paid":
          RentStatus = (
            <div className="rent_status">
              <IoIosCheckboxOutline size="1.4rem" color="#656565" />
              <span>{props.data.status.name}</span>
            </div>
          );
          break;
        case "not_delivered":
          RentStatus = (
            <div className="rent_status">
              <IoIosHand size="1.4rem" color="#656565" />
              <span>{props.data.status.name}</span>
            </div>
          );
          break;
        case "delivered":
          RentStatus = (
            <div className="rent_status">
              <IoLogoModelS size="1.4rem" color="#656565" />
              <span>{props.data.status.name}</span>
            </div>
          );
          break;
        case "returned":
          RentStatus = (
            <div className="rent_status">
              <IoMdFlag size="1.4rem" color="#656565" />
              <span>{props.data.status.name}</span>
            </div>
          );
          break;
        default:
          RentStatus = (
            <div className="rent_status">
              <IoIosDownload size="1.4rem" color="#656565" />
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
      setRole(props.data.role === "renter" ? true : false);
      setOwner_Info(props.data.rent_search_dump.owner);
      setRenter_info(props.data.renter);
      setPelak({
        registration_plate_first_part:
          props.data.rent_search_dump.registration_plate_first_part,
        registration_plate_second_part:
          props.data.rent_search_dump.registration_plate_second_part,
        registration_plate_third_part:
          props.data.rent_search_dump.registration_plate_third_part,
        registration_plate_forth_part:
          props.data.rent_search_dump.registration_plate_forth_part
      });
    }
  }, [props.data]);

  return (
    media_set && (
      <>
        {rentStatus}
        <div className="cart">
          <div className="rent_info">
            <h2>
              {car.brand.name.fa} {car.name.fa}
            </h2>
            <hr />
            <h3>مدت اجاره {no_of_days} روز</h3>
            <div className="rent_duration">
              <p>
                {moment(start_date, "jYYYY/jMM/jDD").format("dddd")} <br />
                {moment(start_date, "jYYYY/jMM/jDD").format("jDD jMMMM jYY")}
              </p>
              <IoMdArrowRoundBack size="2rem" color="#202020" />
              <p>
                {moment(end_date, "jYYYY/jMM/jDD").format("dddd")} <br />
                {moment(end_date, "jYYYY/jMM/jDD").format("jDD jMMMM jYY")}
              </p>
            </div>
            <hr />
            <h3>هزینه اجاره</h3>
            <p>{discounted_total_price.toLocaleString()} تومان</p>
          </div>
          <div className="image_pelak">
            <figure>
              <img
                src={media_set.thumbnail_url}
                alt={`${car.brand.name.fa} ${car.name.fa}`}
              />
            </figure>
            {!role ||
            status_id === "paid" ||
            status_id === "delivered" ||
            status_id === "returned" ? (
              <PelakView
                registration_plate_first_part={
                  pelak.registration_plate_first_part
                }
                registration_plate_second_part={
                  pelak.registration_plate_second_part
                }
                registration_plate_third_part={
                  pelak.registration_plate_third_part
                }
                registration_plate_forth_part={
                  pelak.registration_plate_forth_part
                }
              />
            ) : null}
          </div>
        </div>
        <div className="Role_container">
          {role ? (
            <>
              <Link href="/">
                <a>
                  <IoMdPerson size="2rem" />
                  {owner_Info.name}
                </a>
              </Link>
            </>
          ) : (
            <>
              <Link href="/">
                <a>
                  <IoMdPerson size="2rem" />
                  {renter_info.name}
                </a>
              </Link>
              <a href={`tel:0${renter_info.cell}`}>
                0{renter_info.cell}
                <span className="extra_Text"> :تماس با اجاره گیرنده</span>
              </a>
            </>
          )}
        </div>
      </>
    )
  );
};

interface IRequest_cart {
  data: any;
}

export default Request_cart;
