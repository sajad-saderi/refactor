import React, { useState, useEffect, useContext } from "react";
import Link from "next/link";
// import "./car.scss";
import { IoIosTrash, IoMdCreate } from "react-icons/io";
import Router from "next/router";
import jsCookie from "js-cookie";
import {
  REQUEST_SET_OUT_OF_SERVICE,
  REQUEST_DELETE_CAR,
} from "../../../../API";
import Spinner from "../../../../components/Spinner";
import Toast_context from "../../../../context/Toast_context";

const token = jsCookie.get("token");

const Car = (props: ICar) => {
  const [id, setId] = useState(null);
  const [media_set, setMedia_set] = useState(null);
  const [car, setCar] = useState(null);
  const [year, setYear] = useState(null);
  const [heightController, setHeightController] = useState(0);
  const [is_out_of_service, setIs_out_of_service] = useState(false);
  const [is_out_of_service_loading, setIs_out_of_service_loading] = useState(
    false
  );
  const TOAST_CONTEXT = useContext(Toast_context);

  useEffect(() => {
    if (props.data) {
      setIs_out_of_service(props.data.is_out_of_service);
      setId(props.data.id);
      setYear(props.data.year);
      setMedia_set(props.data.media_set);
      setCar(props.data.car);
    }
  }, [props.data]);

  const setServiceStatus = async () => {
    setIs_out_of_service_loading(true);
    const service_res: any = await REQUEST_SET_OUT_OF_SERVICE({
      token,
      id: id,
      value: !is_out_of_service,
    });
    setIs_out_of_service(service_res);
    TOAST_CONTEXT.toast_option({
      message: service_res
        ? `
    خودروی ${car.name.fa} شما در نتایج جستجو نمایش داده نخواهد شد.
    `
        : `
    خودروی ${car.name.fa} شما در نتایج جستجو نمایش داده خواهد شد.
    `,
      time: 7,
      autoClose: false,
    });
    setIs_out_of_service_loading(false);
  };

  const deleteTheCar = async () => {
    const delete_res = await REQUEST_DELETE_CAR({ token, id });
    props.getListAgain();
  };

  let link = props.is_mine ? `/car/${id}?owner=true` : `/car/${id}`;
  return (
    car && (
      <div className="carcard">
        <Link href={`/car/[id]`} as={link}>
          <a
            data-test-id="Link"
            className={`CAR_CART_${car.brand.name.fa} ${car.name.fa}`}
          >
            <figure>
              <img
                style={{ position: "absolute", top: -heightController + "px" }}
                src={media_set[0].thumbnail_url}
                className="img-fluid"
                alt={`${car.brand.name.fa} ${car.name.fa}`}
                onLoadCapture={(e) => {
                  e.persist();
                  let imageHeight = media_set[0].thumbnail_height;

                  if (imageHeight > 200) {
                    setHeightController(imageHeight - 200);
                  }
                }}
              />
              <div className="read_more">
                <span>مشاهده مشخصات</span>
              </div>
            </figure>
            <div className="info_box">
              <div className="car_brand">
                <h3 data-test-id="car_brand_h3">{`${car.brand.name.fa} ${car.name.fa}`}</h3>
                <p>{year.name.fa}</p>
              </div>
            </div>
          </a>
        </Link>
        {props.is_mine && (
          <div className="edit_part">
            <p
              onClick={() => {
                Router.push(`/set-car-timing?car_id=${id}&mode=edit`);
              }}
              className="EDIT_PRPICE_AND_TIME"
            >
              تغیر تاریخ و قیمت
            </p>
            {is_out_of_service_loading ? (
              <Spinner display="inline-block" width={20} color="#4ba3ce" />
            ) : (
              <p
                data-test-id="OUT_OF_SERVICE"
                className="OUT_OF_SERVICE"
                onClick={setServiceStatus}
              >
                {is_out_of_service ? "فعال کردن خودرو" : "غیر فعال کردن خودرو"}
              </p>
            )}
            <span>
              <IoMdCreate
                color="#4ba3ce"
                size="2rem"
                onClick={() => {
                  Router.push(`/add-car?mode=edit&car_id=${id}`);
                }}
              />
            </span>
            <span>
              <IoIosTrash onClick={deleteTheCar} color="#4ba3ce" size="2rem" />
            </span>
          </div>
        )}
      </div>
    )
  );
};

interface ICar {
  is_mine: boolean;
  data: any;
  getListAgain: any;
}

export default Car;
