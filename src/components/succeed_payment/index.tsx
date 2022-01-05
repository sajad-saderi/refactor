import { useState, useEffect, useContext } from 'react';
import { GET_ORDER_REQUEST } from '../../API';
import jsCookie from 'js-cookie';
import moment from 'moment-jalaali';
import check_icon from '../../../public/image/check.png';
import paper_check from '../../../public/image/paper_check.png';
import return_icon from '../../../public/image/return.png';
import key from '../../../public/image/key.png';
import paper from '../../../public/image/paper.png';
import carImage from '../../../public/image/car-image-thumbnail.jpg';
import toast_context from '../../context/Toast_context';
import ErrorHelper from '../../../utils/error_helper';
import net_CTX from '../../context/internetConnectionCTX';
import languageCTX from '../../context/languageCTX';
import { dynamicString } from '../../helpers/dynamicString';
import Router from "next/router";
import { numberChanger } from '../../../utils/numberChanger';
moment.loadPersian({ dialect: 'persian-modern' });

const SucceedPayment = ({ extension, language }:SuccessPayment) => {
  const [renter, setRenter] = useState(null);
  const [rent_search_dump, setRent_search_dump] = useState(null);
  const [bank_id_track, set_bank_id_track] = useState('');
  const [has_insurance, set_has_insurance] = useState(false);
  const [extensionInfo, setExtensionInfo] = useState(null);
  const [extensionStartDate, setExtensionStartDate] = useState(null);
  const [hasError, setHasError] = useState(false);
  const token = jsCookie.get('token');
  const toastCTX = useContext(toast_context);
  const netCTX = useContext(net_CTX);
  const { activeLanguage } = useContext(languageCTX);

  useEffect(() => {
    if (window["auth"]) {
      window['dataLayer'].push({
        event: 'page_view',
        pageURL: window.location.href,
        pagePath: '/payment-success',
        pageTitle: language.PAGE_HEADER.payment.successTitle,
      });
      // logPageView();

      fetchAPI(window.location.search.match(/(\d+)/)[0]);
    } else {
      localStorage["last_location"] = Router.router.asPath;
      Router.push("/login");
    }
  }, []);

  /**
   *
   * @param id
   * Get the order info
   */
  const fetchAPI = async (id) => {
    setHasError(false);

    try {
      const Order_res: any = await GET_ORDER_REQUEST({ token, id });
      let lastExtension = null
      if (Order_res.data?.extend_request_set) {
        lastExtension = Order_res.data.extend_request_set[0]
        setExtensionInfo(lastExtension)
        if (Order_res.data?.extend_request_set.length > 1) {
          let startDate = Order_res.data.extend_request_set[1].end_date.jalali
          setExtensionStartDate(`${startDate.y}/${startDate.m}/${startDate.d}`)

        }
      }
      setRent_search_dump(Order_res.data.rent_search_dump);
      setRenter(Order_res.data.renter);
      set_bank_id_track(Order_res.data.id);
      set_has_insurance(Order_res.data.has_insurance);
      // console.log({
      //   event: "purchase",
      //   transactionId: Order_res.data.id,
      //   transactionTotal: Order_res.data.rent_search_dump.total_price,
      //   transactionProducts: [
      //     {
      //       sku: Order_res.data.rent_search_dump.id,
      //       name: Order_res.data.rent_search_dump.car.name.fa,
      //       category: Order_res.data.rent_search_dump.car.body_style.name.fa,
      //       price: Order_res.data.rent_search_dump.avg_price_per_day,
      //       quantity: Order_res.data.rent_search_dump.no_of_days,
      //     },
      //   ],
      // });

      window['dataLayer'].push({
        event: extension ? 'extension' : 'purchase',
        transactionId: Order_res.data.id,
        transactionTotal: extension ? lastExtension.price : Order_res.data.rent_search_dump.total_price,
        transactionProducts: [
          {
            sku: Order_res.data.rent_search_dump.id,
            name: Order_res.data.rent_search_dump.car.name[activeLanguage],
            category: Order_res.data.rent_search_dump.car.body_style.name[activeLanguage],
            price: Order_res.data.rent_search_dump.avg_price_per_day,
            quantity: Order_res.data.rent_search_dump.no_of_days,
          },
        ],
      });
    } catch (error) {
      if (error === 111) {
        netCTX.toggleTheContainer(true);
      } else
        toastCTX.toast_option({
          message: error.response
            ? ErrorHelper({
              errorObj: error.response,
              _400Message: language.COMMON.errorInFetchingTransactionData,
            })
            : error,
          color: '#ed9026',
          time: 0,
          autoClose: false,
        });
      setHasError(true);
    }
  };

  return (
    <article className="responsive minHeight local_payment" dir={activeLanguage === 'fa' ? 'rtl' : 'ltr'}>
      {renter ? (
        <section className="payment_cart">
          <div className="title  ">
            <img src={check_icon} alt="check Icon" />
            <h4>{extension ? language.PAYMENT_PAGE.successfullExtension : language.PAYMENT_PAGE.successfullPurchase}</h4>
          </div >
          <div className="bank_track_id ">
            <p>{language.PAYMENT_PAGE.issueTracking} {numberChanger((bank_id_track).toString(),activeLanguage)}</p>
          </div>
          <div className="details_section">
            <div>
              <div className="reserve_information ">
                <div className="section_title margin_bottom_24">
                  <img src={paper_check} className={language.PAYMENT_PAGE.carOptions} />
                  <p>{language.PAYMENT_PAGE.carOptions}</p>
                </div >
                <div className="car_info padding_right_24">
                  <div>
                    <p>{language.COMMON.car}:</p>
                    <span className="center">
                      {rent_search_dump.car.name[activeLanguage]}
                    </span>
                  </div>
                  <div>
                    <p>{language.COMMON.host}:</p>
                    <span className="center">
                      {rent_search_dump.owner.company_name
                        ? rent_search_dump.owner.company_name
                        : rent_search_dump.owner.name}
                    </span>
                  </div>
                  {!extension &&<div>

                    <p>{extension ?  null: language.PAYMENT_PAGE.deliveryDate}:</p>
                    <span>
                      {extension ? null
                        // numberChanger(moment(
                        //   extensionStartDate ? extensionStartDate : rent_search_dump.end_date,
                        //   'jYYYY/jMM/jDD',
                        // ).format('jYYYY/jMM/jD'),activeLanguage)
                        : numberChanger(moment(
                          rent_search_dump.start_date,
                          'jYYYY/jMM/jDD',
                        ).format('jYYYY/jMM/jD'),activeLanguage)}
                    </span>
                  </div >}
                  <div>
                    <p>{`${extension ? language.COMMON.extensionDuration : language.COMMON.duration}`}:</p>
 
                      {
                        extension 
                        ?<span>{numberChanger((extensionInfo.no_of_extended_days).toString(),activeLanguage)} {dynamicString(null, language.COMMON.day, rent_search_dump.no_of_days > 1 ? true : false)}</span>
                      :<span>{numberChanger((rent_search_dump.no_of_days).toString(),activeLanguage)} {dynamicString(null, language.COMMON.day, rent_search_dump.no_of_days > 1 ? true : false)}</span>
                      } 
                  </div>
                  <div>
                    <p>{extension ?language.PAYMENT_PAGE.newReturnDate :language.PAYMENT_PAGE.returnDate}:</p>
                    <span>
                      {extension ?
                        numberChanger(moment(
                          `${extensionInfo.end_date.jalali.y}/${extensionInfo.end_date.jalali.m}/${extensionInfo.end_date.jalali.d}`,
                          'jYYYY/jM/jD',
                        ).format('jYYYY/jMM/jD'),activeLanguage)
                        : numberChanger(moment(
                          rent_search_dump.end_date,
                          'jYYYY/jMM/jDD',
                        ).format('jYYYY/jMM/jD'),activeLanguage)}
                    </span>
                  </div>
                  {
                    extension ?
                      extensionInfo.insurance_price > 0
                      &&
                      <div>
                        <p>{language.PAYMENT_PAGE.carInsurance}:</p>
                        <span>{language.COMMON.with}</span>
                      </div>
                      : has_insurance && (
                        <div>
                          <p>{language.PAYMENT_PAGE.carInsurance}:</p>
                          <span>{language.COMMON.with}</span>
                        </div>
                      )
                  }
                  {/* <div>
                    <p>{language.COMMON.kmLimit}:</p>
                    <span className="float-left">
                      {numberChanger((rent_search_dump.max_km_per_day).toString(),activeLanguage)} {language.COMMON.km}
                    </span>
                  </div> */}
                </div >
              </div >
              <div className="paid_price ">
                <p>{language.PAYMENT_PAGE.invoice}</p>
                <div>
                  <h3>
                    {extension ? numberChanger((extensionInfo.price + extensionInfo.insurance_price).toLocaleString(),activeLanguage) 
                    : numberChanger((
                      rent_search_dump.total_price -
                      rent_search_dump.total_discount -
                      (rent_search_dump.coupon
                        ? rent_search_dump.coupon.discounted_price
                        : 0) +
                      (has_insurance
                        ? rent_search_dump.insurance_total_price
                        : 0)
                    ).toLocaleString(),activeLanguage)}
                  </h3>
                  <span className="toman"> {language.COMMON.toman}</span>
                </div >
              </div >
            </div >
            <div className="figure_section">
              <img
                alt={language.PAYMENT_PAGE.image}
                src={
                  rent_search_dump.media_set.length > 0
                    ? rent_search_dump.media_set[0].thumbnail_url
                    : carImage
                }
              />
            </div>
          </div >
          {
            !extension
            && <div className="delivery_section margin_top_24">
              <div className="section_title margin_bottom_16">
                <img src={key} className="icon" />
                <p>{language.PAYMENT_PAGE.carDelivery}:</p>
              </div>
              <div className="delivery_condition">
                {rent_search_dump.deliver_at_renters_place ? (
                  <p className="margin_bottom_16">
                    {rent_search_dump.location.parent_id === 1
                      || rent_search_dump.location.id === 1657
                      ? language.COMMON.locationDelivery
                      : null}
                  </p>
                ) : null}
                <p>
                  {language.COMMON.arrangmentForDelivery}
                </p>
              </div>
            </div>
          }
          <div className="return_section margin_top_24">
            <div className="section_title margin_bottom_16">
              <img src={return_icon} className="icon" />
              <p>{language.PAYMENT_PAGE.returningCar}:</p>
            </div>
            <div className="return_condition">
              <p className="margin_bottom_8">
                {numberChanger(dynamicString([rent_search_dump.extra_hour_price_name], language.PAYMENT_PAGE.text1),activeLanguage)}



              </p >
              <p>
                {numberChanger(dynamicString([rent_search_dump.max_km_per_day, rent_search_dump.extra_km_price_name], language.PAYMENT_PAGE.text2),activeLanguage)}

              </p>
            </div >
          </div >
          {!extension
            && <div className="contract_section margin_top_24">
              <div className="section_title margin_bottom_16">
                <img src={paper} className="قرارداد اجاره" />
                <p>{language.COMMON.contract}:</p>
              </div>
              <div className="return_condition">
                <p className="margin_bottom_16">
                  {language.PAYMENT_PAGE.text3}
                </p>
              </div>
            </div>}
        </section >
      ) : hasError ? (
        <p className="loading_text">{language.PAYMENT_PAGE.notFound}</p>
      ) : (
        <p className="loading_text">{language.COMMON.loading}</p>
      )}
    </article >
  );
};

interface SuccessPayment {
  language: any,
  extension?: boolean
}

export default SucceedPayment;
