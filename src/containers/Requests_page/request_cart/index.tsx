import { useEffect, useState, useContext } from "react";
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
} from "react-icons/io";
import download from "../../../../public/image/download.png";
import dynamic from "next/dynamic";
import toast_context from "../../../context/Toast_context";
const Icon = dynamic(() => import("../../../../utils/Icon"));
import net_CTX from "../../../context/internetConnectionCTX";
import languageCTX from "../../../context/languageCTX";

// import Icon from "../../../../utils/Icon";
import {
  MdAccountCircle,
  MdAlarm,
  MdAlarmOff,
  MdCall,
  MdCallMissedOutgoing,
  MdClear,
  MdCreditCard,
  MdDone,
  MdDriveEta,
  MdKeyboardBackspace,
  MdKeyboardReturn,
  MdVpnKey,
} from "react-icons/md";
const PelakView = dynamic(() => import("../../../components/pelak"));
const Button = dynamic(() => import("../../../components/form/Button"));
// import PelakView from "../../../components/pelak";
import CountdownTimer from "timer-countdown";
// import "./request_cart.scss";
import Link from "next/link";
// import Button from "../../../components/form/Button";
import { REQUEST_REQUEST_ACTION } from "../../../API";
import jsCookie from "js-cookie";
import Modal_context from "../../../context/Modal_context";
import Toast_context from "../../../context/Toast_context";
import carImage from "../../../../public/image/car-image-thumbnail.jpg";
import { FiClock } from "react-icons/fi";
import { useRouter } from "next/router";
import ErrorHelper from "../../../../utils/error_helper";
import appState from "../../../context/app";
import { twoWayDateConvertor } from '../../../helpers/dateControler';
import { addingCountryCodeToNumber } from '../../../helpers/addingCountryCodeToNumber';
import { dynamicString } from '../../../helpers/dynamicString';
import { numberChanger } from "../../../../utils/numberChanger";

let dateObject = { from: null, to: null }
moment.loadPersian({ dialect: "persian-modern" });

const Request_cart = ({ data, getDataAgain, language }: IRequest_cart) => {
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
  const [button_code, setButton_code] = useState([]);
  const [ButtonLoader, setButtonLoader] = useState(false);
  const [rejectButtonLoader, setRejectButtonLoader] = useState(false);
  const [insurance_total_price, setInsurance_total_price] = useState(null);
  const [has_Insurance, set_has_insurance] = useState(false);
  const [coupon, setCoupon] = useState(null);
  const [total_discount, setTotal_discount] = useState(null);
  const [extensionInfo, setExtensionInfo] = useState(null);
  const [extensionSum, setExtensionSum] = useState(null);
  const [click_on_cancel, set_click_on_cancel] = useState(false);

  const MODAL_CONTEXT = useContext(Modal_context);
  const TOAST_CONTEXT = useContext(Toast_context);
  const [imageHeight, setImageHeight] = useState(0);
  const [heightController, setheightController] = useState(0);
  const router = useRouter();
  const token = jsCookie.get("token");
  const toastCTX = useContext(toast_context);
  const netCTX = useContext(net_CTX);
  const { activeLanguage } = useContext(languageCTX);
  const { store: { date }, setDate } = useContext(appState);

  const setForRequest = async (data: any) => {
    if (data.action === "reject") {
      setRejectButtonLoader(true);
    } else {
      setButtonLoader(true);
    }
    try {
      const request_res: any = await REQUEST_REQUEST_ACTION({
        token,
        id: data.id,
        action: data.action,
      });
      setButtonLoader(false);
      setRejectButtonLoader(false);
      if (data.action === "pay") {
        window.location.href = `${request_res.redirect_to}`;
      } else {
        TOAST_CONTEXT.toast_option({
          message: request_res.message[router.locale],
          time: 15,
          autoClose: true,
        });
        switch (data.action) {
          case "approve":
            CreateTheStatusForThisCard("approved");
            break;
          case "cancelled":
            CreateTheStatusForThisCard("cancelled");
            break;
          case "reject":
            CreateTheStatusForThisCard("rejected");
            break;
          case "deliver":
            CreateTheStatusForThisCard("delivered");
            break;
          case "return":
            CreateTheStatusForThisCard("returned");
            break;
          default:
            break;
        }
      }
      if (data.action === "cancel") {
        getDataAgain();
      }
    } catch (error) {
      setButtonLoader(false);
      setRejectButtonLoader(false);
      if (error === 111) {
        netCTX.toggleTheContainer(true);
      } else
        toastCTX.toast_option({
          message: error.response
            ? ErrorHelper({
              errorObj: error.response,
              _400Message: language.REQUEST_PAGE.error2,
            })
            : error,
          color: "#ed9026",
          time: 0,
          autoClose: false,
        });
    }
  };

  useEffect(() => {
    if (data) {
      // setStart_date(twoWayDateConvertor(data.rent_search_dump.start_date));
      // setEnd_date(twoWayDateConvertor(data.rent_search_dump.end_date));
      CreateTheStatusForThisCard();
    }
  }, [data]);

  const cancel_request = (id) => {
    set_click_on_cancel(true);
    MODAL_CONTEXT.modalHandler("ConfirmDelete", { id });
  };

  useEffect(() => {
    if (MODAL_CONTEXT.id === data.id && click_on_cancel) {
      setForRequest({ action: "cancel", id: data.id });
      MODAL_CONTEXT.confirm_id(null);
    }
  }, [MODAL_CONTEXT.id]);

  const CreateTheStatusForThisCard = (status = null) => {
    /**
     * @renter
     * اجاره گیرنده
     *
     * @owner
     * اجاره دهنده
     */
    let renter = data.role === "renter" ? true : false;
    let has_insurance = data.has_insurance ? true : false;
    let extensionSum: any = 0
    let extensionInfo = data.extend_request_set ? data.extend_request_set.length > 0 ? data.extend_request_set[0] : null : null
    if (extensionInfo) {
      extensionSum = data.extend_request_set.reduce((previous, current) => {
        return {
          status: { id: current.status.id === 'extended' ? 'extended' : previous.status.id },
          price: (previous.status.id === 'extended' ? previous.price : 0) + (current.status.id === 'extended' ? current.price : 0),
          insurance_price: (previous.status.id === 'extended' ? previous.insurance_price : 0) + (current.status.id === 'extended' ? current.insurance_price : 0)
        }
      }, { price: 0, insurance_price: 0, status: { id: "" } })
      setExtensionSum(extensionSum)
    }
    setExtensionInfo(extensionInfo)
    // small portion at the top right on the request cart
    let RentStatus = null;
    setStatus_id(status ? status : data.status.id);
    switch (status ? status : data.status.id) {
      case "new":
        RentStatus = (
<div className="rent_status">
<div className="status_new">
  <div className="card_status">
              <MdAlarm size="2rem" color="#f7941d" />
              <span>{language.REQUEST_PAGE.pending}</span>
              </div>
              {extensionInfo && extensionSum.status.id === "extended" && <span className="extensionBadge">{language.REQUEST_PAGE.extended}</span>}
            </div>
            {!renter && (
              <div className="timer">
                <CountdownTimer
                  timeLeft={
                    data.time_remaining_to_take_action.total_seconds * 1000
                  }
                  completeCallback={() => CreateTheStatusForThisCard("expired")}
                />
                <FiClock size="2rem" color="#f7941d" />
              </div>
            )}
          </div>
        );
        // set the button attribute base on the role and action
        setButton_code(
          !renter
            ? [
              {
                value: language.COMMON.ok,
                class:
                  "Blue_BTN request_car_accept HEAP_Request_Btn_Accept ACCEPTED_INCOMING_REQUEST",
                click: () =>
                  setForRequest({ action: "approve", id: data.id }),
              },
              {
                value: language.REQUEST_PAGE.reject,
                class:
                  "Blue_BTN request_car_reject HEAP_Request_Btn_Reject REJECT_INCOMING_REQUEST",
                loading: ButtonLoader,
                click: () => setForRequest({ action: "reject", id: data.id }),
              },
            ]
            : [
              {
                value: language.COMMON.cancel,
                class:
                  "Blue_BTN request_car_cancel HEAP_Request_Btn_Cancel CANCELLED_INCOMING_REQUEST",
                click: () => cancel_request(data.id),
              },
            ]
        );
        break;
      case "approved":
        RentStatus = (
<div className="rent_status">
<div className='status_approved'>
  <div className="card_status">
              <MdCreditCard size="2rem" color="#a3678b" />
              <span>{language.REQUEST_PAGE.approved}</span>
              </div>
              {extensionInfo && extensionSum.status.id === "extended" && <span className="extensionBadge">{language.REQUEST_PAGE.extended}</span>}
            </div>
            {!renter && (
              <div className="timer">
                <CountdownTimer
                  timeLeft={
                    data.time_remaining_to_take_action.total_seconds * 1000
                  }
                  completeCallback={() => CreateTheStatusForThisCard("expired")}
                />
                <FiClock size="2rem" color="#a3678b" />
              </div>
            )}
          </div>
        );
        setButton_code(
          renter
            ? [
              {
                value: language.REQUEST_PAGE.pay,
                class:
                  "Blue_BTN request_car_pay GO_TO_BANK HEAP_Request_Btn_GotoBank",
                click: () => setForRequest({ action: "pay", id: data.id }),
              },
            ]
            : []
        );
        break;
      case "rejected":
        RentStatus = (
          <div className="rent_status status_expired">
            <MdCallMissedOutgoing size="2rem" color="#707070" />
            <span>{language.REQUEST_PAGE.rejected}</span>
          </div>
        );
        setButton_code([]);
        break;
      case "expired":
        RentStatus = (
          <div className="rent_status status_expired">
            <MdAlarmOff size="2rem" color="#707070" />
            <span>{language.REQUEST_PAGE.expired}</span>
          </div>
        );
        setButton_code([]);
        break;
      case "cancelled":
        RentStatus = (
          <div className="rent_status status_expired">
            <Icon name="cancel" />
            {/* <IoIosEyeOff size="1.4rem" color="#656565" /> */}
            <span>{language.REQUEST_PAGE.cancelled}</span>
          </div>
        );
        setButton_code([]);
        break;
      case "paid":
        RentStatus = (
<div className="rent_status">
<div>
  <div className="status_paid">
            <MdVpnKey size="2rem" color="#2cbbc2" />
            <span>{language.REQUEST_PAGE.paid}</span>
              </div>
              {extensionInfo && extensionSum.status.id === "extended" && <span className="extensionBadge">{language.REQUEST_PAGE.extended}</span>}
            </div>
          </div>
        );
        setButton_code(
          renter
            ? [
              {
                value: language.REQUEST_PAGE.deliver,
                class:
                  "Blue_BTN request_car_pay CAR_DELIVERED HEAP_Request_Btn_CarDelivered",
                click: () =>
                  setForRequest({ action: "deliver", id: data.id }),
              },
            ]
            : []
        );
        break;
      case "not_delivered":
        RentStatus = (
          <div className="rent_status">
            <div className="inlineDisplay">
            <IoIosHand size="1.4rem" color="#656565" />
            <span>{data.status.name}</span>
            </div>
            {extensionInfo && extensionSum.status.id === "extended" && <span className="extensionBadge">{language.REQUEST_PAGE.extended}</span>}
          </div>
        );
        break;
      case "delivered":
        RentStatus = (
<div>
<div className="rent_status status_on_trip">
            <MdDriveEta size="2rem" color="#2cbbc2" />
            <span>{language.REQUEST_PAGE.delivered}</span>
            </div>
            {extensionInfo && extensionSum.status.id === "extended" && <span className="extensionBadge">{language.REQUEST_PAGE.extended}</span>}
          </div>
        );
        setButton_code(
          !renter
            ? [
              {
                value: language.REQUEST_PAGE.deliver,
                class:
                  "Blue_BTN request_car_pay HEAP_Request_Btn_CarReturned",
                click: () => {
                  setForRequest({ action: "return", id: data.id });
                },
              },
            ]
            : []
        );
        break;
      case "returned":
        RentStatus = (
<div >
<div className="rent_status status_returned">
            <MdKeyboardReturn size="2rem" color="#2cbbc2" />
            <span>{language.REQUEST_PAGE.returned}</span>
            </div>
            {extensionInfo && extensionSum.status.id === "extended" && <span className="extensionBadge">{language.REQUEST_PAGE.extended}</span>}
          </div>
        );
        setButton_code(
          renter
            ? data.has_renter_reviewed_rent_order
              ? [
                // {
                //   value: language.repetitive_review,
                //   disable: true,
                //   class: "Blue_BTN request_car_pay disable_rate_btn",
                //   click: () => {},
                // },
              ]
              : [
                {
                  value: language.REQUEST_PAGE.review,
                  class: "Blue_BTN request_car_pay",
                  click: () =>
                    // send this data to modal
                    MODAL_CONTEXT.modalHandler("Renter", data),
                },
              ]
            : data.has_owner_reviewed_renter
              ? [
                // {
                //   value: language.repetitive_review,
                //   disable: true,
                //   class: "Blue_BTN request_car_pay disable_rate_btn",
                //   click: () => {},
                // },
              ]
              : [
                {
                  value: language.REQUEST_PAGE.review,
                  class: "Blue_BTN request_car_pay",
                  click: () =>
                    // send this data to modal
                    MODAL_CONTEXT.modalHandler("Owner", data),
                },
              ]
        );
        break;
      default:
        RentStatus = (
          <div className="rent_status">
            <IoIosDownload size="1.4rem" color="#656565" />
            <span>{data.status.name}</span>
          </div>
        );
        break;
    }
    // set initials value
    setRentStatus(RentStatus);
    setCar(data.rent_search_dump.car);
    setStart_date(twoWayDateConvertor(data.rent_search_dump.start_date));
    setEnd_date(twoWayDateConvertor(data.rent_search_dump.end_date));
    setNo_of_days(data.rent_search_dump.no_of_days);
    if (data.rent_search_dump.media_set.length > 0) {
      setMedia_set(data.rent_search_dump.media_set[0]);
      if (data.rent_search_dump.media_set[0].thumbnail_height) {
        setImageHeight(data.rent_search_dump.media_set[0].thumbnail_height);
      }
    } else setMedia_set({ thumbnail_url: carImage });
    setDiscounted_total_price(
      renter
        ? data.rent_search_dump.discounted_total_price + (extensionSum ? extensionSum.price : 0)
        : data.rent_search_dump.owner_price
          ? data.rent_search_dump.owner_price + (extensionSum ? extensionSum.price : 0)
          : data.rent_search_dump.discounted_total_price + (extensionSum ? extensionSum.price : 0)
    );
    setInsurance_total_price(
      has_insurance ? data.rent_search_dump.insurance_total_price : 0
    );
    set_has_insurance(has_insurance);
    setCoupon(
      data.rent_search_dump.coupon
        ? data.rent_search_dump.coupon.total_price + (extensionSum ? (extensionSum.price + extensionSum.insurance_price) : 0)
        : null
    );
    setTotal_discount(data.rent_search_dump.total_discount);
    setRole(renter);
    setOwner_Info(data.rent_search_dump.owner);
    setRenter_info(data.renter);
    setPelak({
      registration_plate_first_part:
        data.rent_search_dump.registration_plate_first_part,
      registration_plate_second_part:
        data.rent_search_dump.registration_plate_second_part,
      registration_plate_third_part:
        data.rent_search_dump.registration_plate_third_part,
      registration_plate_forth_part:
        data.rent_search_dump.registration_plate_forth_part,
    });
  };

  useEffect(() => {
    moment.locale(activeLanguage)
  }, [activeLanguage])

  return (
    media_set && (
      <>
        {rentStatus}
        <div className="cart">
          <div className="rent_info">
            <h2>
              {car.brand.name[activeLanguage]} {car.name[activeLanguage]}
            </h2>
            {/* <div className="rent_duration"> */}
            <p className="date_duration">
              <span>
                {activeLanguage === 'fa' ? numberChanger(moment(start_date[activeLanguage].name, "jYYYY/jMM/jDD").format("jD jMMMM"),activeLanguage)
                  : numberChanger(moment(start_date[activeLanguage].name, "YYYY/MM/DD").format("D MMMM"),activeLanguage)}
                <span> 
                  {activeLanguage === 'fa' ? moment(start_date[activeLanguage].name, "jYYYY/jMM/jDD").format("dddd")
                    : moment(start_date[activeLanguage].name, "YYYY/MM/DD").format("dddd")}
                </span>
              </span>
              <MdKeyboardBackspace size="2rem" color="#dcdcdc" />
              <span>
                {
                  (extensionInfo && extensionSum.status.id === "extended") ?
                  activeLanguage === 'fa' ?numberChanger(moment(`${extensionInfo.end_date.jalali.y}/${extensionInfo.end_date.jalali.m}/${extensionInfo.end_date.jalali.d}`
                      , "jYYYY/jM/jD").format("jD jMMMM"),activeLanguage)
                      :numberChanger(moment(`${extensionInfo.end_date.gregorian.y}/${extensionInfo.end_date.gregorian.m}/${extensionInfo.end_date.gregorian.d}`
                      , "YYYY/M/D").format("D MMMM"),activeLanguage)
                :activeLanguage === 'fa' ? numberChanger(moment(end_date[activeLanguage].name, "jYYYY/jMM/jDD").format("jD jMMMM"),activeLanguage)
                  :numberChanger( moment(end_date[activeLanguage].name, "YYYY/MM/DD").format("D MMMM"),activeLanguage)
                }
                <span>{
                  (extensionInfo && extensionSum.status.id === "extended") ?
                  activeLanguage === 'fa' ?moment(`${extensionInfo.end_date.jalali.y}/${extensionInfo.end_date.jalali.m}/${extensionInfo.end_date.jalali.d}`
                  , "jYYYY/jM/jD").format("dddd")
                  :moment(`${extensionInfo.end_date.gregorian.y}/${extensionInfo.end_date.gregorian.m}/${extensionInfo.end_date.gregorian.d}`
                  , "YYYY/M/D").format("dddd")
                 : activeLanguage === 'fa' ? moment(end_date[activeLanguage].name, "jYYYY/jMM/jDD").format("dddd")
                  : moment(end_date[activeLanguage].name, "YYYY/MM/DD").format("dddd")}</span>
              </span>
            </p>
          </div>
          <div className="image_pelak">
            <figure
              style={{
                backgroundImage: `url(${media_set.thumbnail_url})`,
                backgroundPositionY: `-${heightController}px`,
              }}
            >
              <img
                // style={{
                //   position: "absolute",
                //   // control the top position of the image by "setheightController()"
                //   top: -heightController + "px",
                // }}
                src={media_set.thumbnail_url}
                alt={`${car.brand.name[activeLanguage]} ${car.name[activeLanguage]}`}
              // onLoadCapture={(e) => {
              //   e.persist();
              //   // adjust the image at the center of division container
              //   console.log(imageHeight / 84, 84 / 2.2);
              //   if (imageHeight / 84 > 2.2) {
              //     setheightController(84 / 4);
              //   }
              // }}
              />
            </figure>
          </div>
        </div>
        {/* </div> */}
        <p className="invoice_and_insurance">
          {role ? (
            <>
              <span>
                {insurance_total_price
                  ? coupon
                    ? numberChanger((coupon + insurance_total_price).toLocaleString(),activeLanguage)
                    : numberChanger((
discounted_total_price + (extensionSum ? extensionSum.price : 0) + insurance_total_price
                    ).toLocaleString(),activeLanguage)
                  : coupon
                    ? numberChanger(coupon.toLocaleString(),activeLanguage)
                    : numberChanger((discounted_total_price + (extensionSum ? extensionSum.price : 0)).toLocaleString(),activeLanguage)}{" "}
              </span>
              {language.COMMON.toman} ({language.COMMON.for} {numberChanger((no_of_days).toString(),activeLanguage)} {dynamicString(null, language.COMMON.day, no_of_days > 1 ? true : false)})
            </>
          ) : (
            <>
              <span>{numberChanger(discounted_total_price.toLocaleString(),activeLanguage)} </span>
              {language.COMMON.toman} ({language.COMMON.for} {numberChanger((no_of_days).toString(),activeLanguage)} {dynamicString(null, language.COMMON.day, no_of_days > 1 ? true : false)})
            </>
          )}
          <span className="insurance_badge">
            {has_Insurance ? (
              <>
                <Icon name="active_shield" />
                {/* <MdDone size='1.4rem' color='#2cbbc2' /> */}
                {language.REQUEST_PAGE.withInsurance}
              </>
            ) : (
              <>
                <Icon name="deactivate_shield" />
                {language.REQUEST_PAGE.withoutInsurance}
              </>
            )}
          </span>
        </p>
        <div className="Role_container ">
          {role ? (
            <>
              <Link
                href="/user/[id]"
                as={`/user/${owner_Info.id}`}
                prefetch={false}
              >
                <a>
                  <MdAccountCircle size="2.4rem" />
                  {owner_Info.name}
                </a>
              </Link>
              {/* show the renter's cellphone to the owner if the status is "approved" */}
              {status_id === "delivered" || status_id === "paid" ? (
                <a className="renter_Cell" href={`tel:${addingCountryCodeToNumber('0' + owner_Info.cell)}`}>
                  <span className="extra_Text">{numberChanger(`0${owner_Info.cell}`,activeLanguage)}</span>
                  <MdCall size="1.6rem" color="#4ba3ce" />
                </a>
              ) : null}
            </>
          ) : (
            <>
              <Link
                href="/user/[id]"
                as={`/user/${renter_info.id}`}
                prefetch={false}
              >
                <a>
                  <MdAccountCircle size="2.4rem" />
                  {renter_info.name}
                </a>
              </Link>
              {/* show the renter's cellphone to the owner if the status is "approved" */}
              {status_id === "delivered" || status_id === "paid" ? (
                <a className="renter_Cell" href={`tel:${addingCountryCodeToNumber('0' + renter_info.cell)}`}>
                  <span className="extra_Text">{numberChanger(`0${renter_info.cell}`,activeLanguage)}</span>
                  <MdCall size="1.6rem" color="#4ba3ce" />
                </a>
              ) : null}
            </>
          )}
        </div>
        {data.show_contract && status_id === "paid" && (
          <div className="contract_download">
            <Link href={`/contract?id=${data.id}`} prefetch={false}>
              <a>
                <img src={download} alt={language.REQUEST_PAGE.downloadContact} />
                <span>{language.REQUEST_PAGE.downloadContact}</span>
              </a>
            </Link>
          </div>
        )}
        <div className="Button_container">
          {/* {button_code} */}
          {button_code.length > 0 &&
            button_code.map((item, i) => (
              <Button
                key={i}
                // the button adjust in useEffect on data
                value={item.value}
                class={item.class}
                loading={i === 1 ? rejectButtonLoader : ButtonLoader}
                click={item.click}
              />
            ))}
          {/* if the status is not one of these status, show the PELAK */}
          {role && status_id === "paid" ? (
            // ||
            // status_id === "delivered" ||
            // status_id === "returned"
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
      </>
    )
  );
};

interface IRequest_cart {
  data: any;
  getDataAgain?: any;
  language: any;
}
export default Request_cart;
