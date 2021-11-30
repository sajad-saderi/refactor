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
import Router from "next/router";

moment.loadPersian({ dialect: 'persian-modern' });

const SucceedPayment = ({ language, extension }: SuccessPayment) => {
  const [renter, setRenter] = useState(null);
  const [rent_search_dump, setRent_search_dump] = useState(null);
  const [bank_id_track, set_bank_id_track] = useState(null);
  const [extensionStartDate, setExtensionStartDate] = useState(null);
  const [has_insurance, set_has_insurance] = useState(false);
  const [extensionInfo, setExtensionInfo] = useState(null);
  const [hasError, setHasError] = useState(false);
  const token = jsCookie.get('token');
  const toastCTX = useContext(toast_context);
  const netCTX = useContext(net_CTX);

  useEffect(() => {
    if (window["auth"]) {
      window['dataLayer'].push({
        event: 'page_view',
        pageURL: window.location.href,
        pagePath: extension ? '/extension-payment' : '/payment-success',
        pageTitle: language.next_seo.title,
      });
      // logPageView();
      fetchAPI(window.location.search.match(/(\d+)/)[0]);
    } else {
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
            name: Order_res.data.rent_search_dump.car.name.fa,
            category: Order_res.data.rent_search_dump.car.body_style.name.fa,
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
              _400Message: 'خطایی در دریافت اطلاعات پرداخت رخ داده است.',
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
    <article className="responsive minHeight local_payment">
      {renter ? (
        <section className="payment_cart">
          <div className="title  ">
            <img src={check_icon} alt="پرداخت موفق" />
            <h4>{extension ? "تمدید با موفقیت انجام شد" : language.h4}</h4>
          </div>
          <div className="bank_track_id ">
            <p>شماره پیگیری: {bank_id_track}</p>
          </div>
          <div className="details_section">
            <div>
              <div className="reserve_information ">
                <div className="section_title margin_bottom_24">
                  <img src={paper_check} className="مشخصات خودرو" />
                  <p>مشخصات رزرو</p>
                </div>
                <div className="car_info padding_right_24">
                  <div>
                    <p>خودرو:</p>
                    <span className="center">
                      {rent_search_dump.car.name.fa}
                    </span>
                  </div>
                  <div>
                    <p>میزبان:</p>
                    <span className="center">
                      {rent_search_dump.owner.company_name
                        ? rent_search_dump.owner.company_name
                        : rent_search_dump.owner.name}
                    </span>
                  </div>
                  <div>
                    <p>{extension ? 'تمدید از' : 'تاریخ تحویل'}:</p>
                    <span>
                      {extension ?
                        moment(
                          extensionStartDate ? extensionStartDate : rent_search_dump.end_date,
                          'jYYYY/jMM/jDD',
                        ).format('jYYYY/jMM/jD')
                        : moment(
                          rent_search_dump.start_date,
                          'jYYYY/jMM/jDD',
                        ).format('jYYYY/jMM/jD')}
                    </span>
                  </div>
                  <div>
                    <p>تاریخ بازگشت:</p>
                    <span>
                      {extension ?
                        moment(
                          `${extensionInfo.end_date.jalali.y}/${extensionInfo.end_date.jalali.m}/${extensionInfo.end_date.jalali.d}`,
                          'jYYYY/jM/jD',
                        ).format('jYYYY/jMM/jD')
                        : moment(
                          rent_search_dump.end_date,
                          'jYYYY/jMM/jDD',
                        ).format('jYYYY/jMM/jD')}
                    </span>
                  </div>
                  <div>
                    <p>{`${extension ? 'تمدید به مدت' : 'مدت اجاره'}`}:</p>
                    <span>
                      {rent_search_dump.no_of_days} {language.day}
                    </span>
                  </div>
                  {has_insurance && (
                    <div>
                      <p>بیمه اجاره خودرو:</p>
                      <span>دارد</span>
                    </div>
                  )}
                  <div>
                    <p>محدودیت مسافت:</p>
                    <span className="float-left">
                      {rent_search_dump.max_km_per_day} {language.kilometer}
                    </span>
                  </div>
                </div>
              </div>
              <div className="paid_price ">
                <p>{language.span_1}</p>
                <div>
                  <h3>
                    {extension ? (extensionInfo.price + extensionInfo.insurance_price).toLocaleString() : (
                      rent_search_dump.total_price -
                      rent_search_dump.total_discount -
                      (rent_search_dump.coupon
                        ? rent_search_dump.coupon.discounted_price
                        : 0) +
                      (has_insurance
                        ? rent_search_dump.insurance_total_price
                        : 0)
                    ).toLocaleString()}
                  </h3>
                  <span className="toman"> تومان</span>
                </div>
              </div>
            </div>
            <div className="figure_section">
              <img
                alt={language.car_image}
                src={
                  rent_search_dump.media_set.length > 0
                    ? rent_search_dump.media_set[0].thumbnail_url
                    : carImage
                }
              />
            </div>
          </div>
          <div className="delivery_section margin_top_24">
            <div className="section_title margin_bottom_16">
              <img src={key} className="تحویل خودرو" />
              <p>تحویل خودرو:</p>
            </div>
            <div className="delivery_condition">
              {rent_search_dump.deliver_at_renters_place ? (
                <p className="margin_bottom_16">
                  {rent_search_dump.location.parent_id === 1
                    ? language.span_3
                    : rent_search_dump.location.id === 1657
                      ? language.span_4
                      : null}
                  {/* {rent_search_dump.location.name.fa} */}
                </p>
              ) : null}
              <p>
                میزبان برای هماهنگی در مورد تحویل خودرو با شما تماس خواهد گرفت.
              </p>
            </div>
          </div>
          <div className="return_section margin_top_24">
            <div className="section_title margin_bottom_16">
              <img src={return_icon} className="بازگشت خودرو" />
              <p>بازگشت خودرو:</p>
            </div>
            <div className="return_condition">
              <p className="margin_bottom_8">
                شروع مدت اجاره از ساعت تحویل خودرو آغاز می‌شود لذا لازم است در
                روز بازگشت در همان ساعت خودرو را بازتحویل دهید. در صورت دیرکرد،
                برای این خودرو به ازای{' '}
                <span>
                  هر ساعت {rent_search_dump.extra_hour_price_name} هزینه دیرکرد{' '}
                </span>
                محاسبه خواهد شد.
              </p>
              <p>
                محدودیت مسافت در نظر گرفته شده برای این خودرو{' '}
                {rent_search_dump.max_km_per_day} {language.kilometer} است. برای
                <span>
                  {' '}
                  هر کیلومتر بیشتر {rent_search_dump.extra_km_price_name} هزینه
                  اضافه{' '}
                </span>
                محاسبه خواهد شد.
              </p>
            </div>
          </div>
          <div className="contract_section margin_top_24">
            <div className="section_title margin_bottom_16">
              <img src={paper} className="قرارداد اجاره" />
              <p>قرارداد اجاره:</p>
            </div>
            <div className="return_condition">
              <p className="margin_bottom_16">
                سپریس نمونه قراردادی برای طرفین آماده کرده است. میزبان در روز
                تحویل خودرو این قرارداد را در دو نسخه تهیه می‌کند و به امضای دو
                طرف می‌رسد.
              </p>
            </div>
          </div>
        </section>
      ) : hasError ? (
        <p className="loading_text">اطلاعات پرداخت یافت نشد.</p>
      ) : (
        <p className="loading_text">{language.loading}</p>
      )}
    </article>
  );
};

interface SuccessPayment {
  language: any,
  extension?: boolean
}

export default SucceedPayment;
