import { useState, useEffect, useContext } from "react";
import Link from "next/link";
// import "./car.scss";
import dynamic from "next/dynamic";

const Spinner = dynamic(() => import("../../../../components/Spinner"));
import { IoMdTrash, IoMdCreate } from "react-icons/io";
import { useRouter } from "next/router";
import context_user from "../../../../context/User_info";
import jsCookie from "js-cookie";
import {
  REQUEST_SET_OUT_OF_SERVICE,
  REQUEST_DELETE_CAR,
} from "../../../../API";
// import Spinner from "../../../../components/Spinner";
import Toast_context from "../../../../context/Toast_context";
import Modal_context from "../../../../context/Modal_context";
import net_CTX from "../../../../context/internetConnectionCTX";
import languageCTX from "../../../../context/languageCTX";
import carThumbnail from "../../../../../public/image/car-image-thumbnail.jpg";
import { dynamicString } from '../../../../helpers/dynamicString';

const Car = ({ is_mine, data, getListAgain, language }: ICar) => {
  const [id, setId] = useState(null);
  const [media_set, setMedia_set] = useState(null);
  const [hasMedia, setHasMedia] = useState(true);
  const [car, setCar] = useState(null);
  const [year, setYear] = useState(null);
  const [uncompletedCar, setUncompletedCar] = useState(false);
  const [img, set_img] = useState(null);
  const [is_out_of_service, setIs_out_of_service] = useState(false);
  const [isVerified, setIsVerified] = useState(false);
  const [click_on_trash, set_click_on_trash] = useState(false);
  const [is_out_of_service_loading, setIs_out_of_service_loading] = useState(
    false
  );
  const MODAL_CONTEXT = useContext(Modal_context);
  const TOAST_CONTEXT = useContext(Toast_context);
  const netCTX = useContext(net_CTX);
  const { activeLanguage } = useContext(languageCTX);
  const user = useContext(context_user);
  const router = useRouter();
  useEffect(() => {
    if (data) {
      /**
       * @cancellation_policy
       * if this value is correct car will be active otherwise tha car
       * is out of service
       */
      setId(data.id);
      setIsVerified(data.is_verified);
      if (is_mine) {
        if (data.cancellation_policy) {
          // set the data
          setIs_out_of_service(data.is_out_of_service);
        } else if (!data.is_out_of_service) {
          setUncompletedCar(true);
          setIs_out_of_service(false);
          setServiceStatus(data.id);
        } else {
          setUncompletedCar(true);
          setIs_out_of_service(false);
        }
      }

      setYear(data.year);
      if (data.has_media) {
        setMedia_set(data.media_set);
      } else setHasMedia(false);
      setCar(data.car);
    }
  }, [data]);

  const setServiceStatus = async (localId?) => {
    // start showing the spinner
    setIs_out_of_service_loading(true);
    try {
      const service_res: any = await REQUEST_SET_OUT_OF_SERVICE({
        token: user.data?.token,
        id: id || localId,
        // send apposite of current status
        value: !is_out_of_service,
      });
      setIs_out_of_service(service_res);
      // show toast
      TOAST_CONTEXT.toast_option({
        message: service_res
          ? dynamicString([car.name[activeLanguage]], language.USER.activeCar)
          : dynamicString([car.name[activeLanguage]], language.USER.inactiveCar),
        time: 15,
        autoClose: true,
      });
      // hide the spinner
      setIs_out_of_service_loading(false);
    } catch (error) {
      if (error === 111) {
        netCTX.toggleTheContainer(true);
      }
    }
  };

  const deleteTheCar = () => {
    MODAL_CONTEXT.modalHandler("ConfirmDelete", {
      brand: data.car.brand.name[activeLanguage],
      model: data.car.name[activeLanguage],
      id: data.id,
      type: "delete_car",
    });
    // if (confirm(`آیا می‌خواهید ماشین ${brand} ${model} را حذف کنید؟`)) {
    //
    // }
  };

  const request_to_delete_the_car = async (id) => {
    try {
      const delete_res = await REQUEST_DELETE_CAR({
        token: user.data?.token,
        id,
      });
      jsCookie.remove("new_car");
      getListAgain();
    } catch (error) {
      if (error === 111) {
        netCTX.toggleTheContainer(true);
      }
    }
  };

  useEffect(() => {
    if (MODAL_CONTEXT.id === id && click_on_trash) {
      request_to_delete_the_car(MODAL_CONTEXT.id);
    }
  }, [MODAL_CONTEXT.id]);

  let link = is_mine ? `/car/${id}?owner=true` : `/car/${id}`;
  let hrefProp = is_mine ? `/car/[id]?owner=true` : `/car/[id]`;
  return (
    car && (
      <div className="carcard" dir={activeLanguage ? 'rtl' : 'ltr'}>
        <Link href={hrefProp} as={link} prefetch={false}>
          <a data-test-id="Link" className="HEAP_Profile_Card_Car">
            <figure
              style={{
                backgroundImage: `url(${hasMedia ? media_set[0].thumbnail_url : carThumbnail
                  })`,
              }}
            >
              {/* {hasMedia ? (
                <img
                  style={{
                    position: "absolute",
                    // control the position of the image in its container
                    top: -heightController + "px",
                  }}
                  src={media_set[0].thumbnail_url}
                  className={[
                    "img-fluid",
                    uncompletedCar || !isVerified ? "grey_car" : null,
                  ].join(" ")}
                  alt={`${car.brand.name.fa} ${car.name.fa}`}
                  onLoadCapture={(e) => {
                    e.persist();
                    let imageHeight = media_set[0].thumbnail_height;

                    // just adjust the image if the hieght of it is bigger than 200 pixels
                    if (imageHeight > 200) {
                      setHeightController(imageHeight - 200);
                    }
                  }}
                />
              ) : (
                <img src={carThumbnail} alt={language.default_image} />
              )} */}
              <div className="read_more">
                <span>{language.USER.details}</span>
              </div>
              {uncompletedCar && is_mine ? (
                <div className="alert_for_car">
                  <p
                    onClick={(e) => {
                      e.preventDefault();
                      router.push({
                        pathname: "/set-car-timing",
                        query: {
                          car_id: id,
                          mode: "edit",
                        },
                      });
                    }}
                  >
                    {language.USER.text1}
                    <span>{language.USER.text2}</span>
                    {language.USER.text3}
                  </p>
                </div>
              ) : null}
              {!isVerified && !uncompletedCar && is_mine ? (
                <div className="alert_for_car">
                  <p>{language.USER.waiting}</p>
                </div>
              ) : null}
            </figure>
            <div className="info_box">
              <div className="car_brand">
                <h3 data-test-id="car_brand_h3">{`${car.brand.name[activeLanguage]} ${car.name[activeLanguage]}`}</h3>
                <p>{year.name[activeLanguage]}</p>
              </div>
            </div>
          </a>
        </Link>
        {is_mine && (
          <div className="edit_part">
            <p
              onClick={() => {
                router.push({
                  pathname: "/set-car-timing",
                  query: {
                    car_id: id,
                    mode: "edit",
                  },
                });
              }}
              className={[
                "HEAP_Profile_Btn_ChangeCarTiming",
                uncompletedCar ? "set_car_timing_btn" : null,
              ].join(" ")}
            >
              {uncompletedCar
                ? language.USER.text2
                : language.USER.carSetting}
            </p>
            {uncompletedCar ? null : isVerified ? (
              is_out_of_service_loading ? (
                <Spinner display="inline-block" width={20} color="#4ba3ce" />
              ) : (
                <p
                  data-test-id="OUT_OF_SERVICE"
                  className="HEAP_Profile_Btn_OutOfService"
                  onClick={setServiceStatus}
                >
                  {is_out_of_service
                    ? language.USER.activatingCar
                    : language.USER.inactivatingCar}
                </p>
              )
            ) : null}
            <div className="icon_container">
              <span className="HEAP_Profile_Btn_EditCarDetails">
                <IoMdCreate
                  color="#4ba3ce"
                  size="2rem"
                  onClick={() => {
                    router.push({
                      pathname: "/add-car",
                      query: {
                        car_id: id,
                        mode: "edit",
                      },
                    });
                  }}
                />
              </span>
              <span className="HEAP_Profile_Btn_Delete">
                <IoMdTrash
                  onClick={() => {
                    set_click_on_trash(true);
                    deleteTheCar();
                    // MODAL_CONTEXT.modalHandler("ConfirmDelete", {
                    // model: car.name.fa,
                    // brand: car.brand.name.fa,
                    // id: id,
                    // })
                  }}
                  color="#4ba3ce"
                  size="2rem"
                />
              </span>
            </div>
          </div>
        )}
      </div>
    )
  );
};

interface ICar {
  is_mine: boolean;
  data: any;
  // update the car list
  getListAgain: any;
  language: any;
}

export default Car;
