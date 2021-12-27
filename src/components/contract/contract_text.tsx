export {}// import { useState } from "react";
// import moment from "moment-jalaali";
// import NumbersAndCurrencyUnit from "../../../utils/NumbersAndCurrencyUnit";

// let global_font_size_title = "0.4rem";
// let global_font_size_p = "0.4rem";
// let global_line_height = 2;
// const Contract_text = ({ inline_style, html_ref, result }: IContract_text) => {
//   const [dots, set_dots] = useState("........................");
//   const [small_dots, set__smalldots] = useState("........");

//   return (
//     <div
//       className="content"
//       ref={html_ref}
//       style={
//         inline_style
//           ? {
//               lineHeight: 2,
//             }
//           : null
//       }
//     >
//       <h1
//         style={
//           inline_style
//             ? {
//                 textAlign: "center",
//                 fontSize: "0.6rem",
//                 margin: 0,
//                 marginTop: "10px",
//               }
//             : null
//         }
//       >
//         قرارداد اجاره خودرو
//       </h1>
//       <h2
//         style={
//           inline_style
//             ? { textAlign: "center", fontSize: "0.5rem", margin: 0 }
//             : null
//         }
//       >
//         بدون راننده
//         {/* {result.rent_search_dump.with_driver &&
//         result.rent_search_dump.without_driver
//           ? ""
//           : result.rent_search_dump.with_driver
//           ? "با راننده"
//           : result.rent_search_dump.without_driver
//           ? "بدون راننده"
//           : null} */}
//       </h2>
//       <p
//         id="contract_date"
//         style={
//           inline_style
//             ? {
//                 textAlign: "left",
//                 fontSize: global_font_size_title,
//                 marginTop: "10px",
//               }
//             : null
//         }
//       >
//         :تاریخ{` `}
//         {moment().format("jYYYY/jMM/jDD")}
//       </p>
//       <p
//         id="contract_number"
//         style={
//           inline_style
//             ? {
//                 textAlign: "left",
//                 fontSize: global_font_size_title,
//                 marginTop: "3px",
//               }
//             : null
//         }
//       >
//         :شماره {` ${result.id} - ${moment().format(" jMM - jYY")}`}
//       </p>
//       <div id="page_1">
//         <p
//           className="paragraph_title"
//           style={
//             inline_style
//               ? {
//                   fontSize: global_font_size_title,
//                   marginTop: "5px",
//                   marginBottom: "2px",
//                   lineHeight: global_line_height,
//                 }
//               : null
//           }
//         >
//           ماده :یک مشخصات طرفین قرارداد
//         </p>
//         <p
//           style={
//             inline_style
//               ? {
//                   fontSize: global_font_size_p,
//                   marginBottom: "4px",
//                   lineHeight: global_line_height,
//                 }
//               : null
//           }
//         >
//           :موجر آقا / خانم
//           {` ${
//             result.rent_search_dump.owner.official_name
//               ? result.rent_search_dump.owner.official_name
//               : dots
//           } `}
//           {result.rent_search_dump.owner.lawyer_name
//             ? `اصالتاً/ با وکالت ${result.rent_search_dump.owner.lawyer_name}‍‍‍‍‍`
//             : null}
//           نام پدر
//           {` ${
//             result.rent_search_dump.owner.official_fathers_name
//               ? result.rent_search_dump.owner.official_fathers_name
//               : dots
//           } `}
//           به شماره ملی
//           {` ${
//             result.rent_search_dump.owner.national_id
//               ? result.rent_search_dump.owner.national_id
//               : dots
//           } `}
//           شماره تماس ثابت
//           {` ${
//             result.rent_search_dump.owner.fixed_phone
//               ? result.rent_search_dump.owner.fixed_phone
//               : dots
//           } `}
//           شماره همراه
//           {` ${
//             result.rent_search_dump.owner.cell
//               ? "0" + result.rent_search_dump.owner.cell
//               : dots
//           } `}
//           نشانی اقامتگاه
//           {` ${
//             result.rent_search_dump.owner.address
//               ? result.rent_search_dump.owner.address
//               : dots + dots
//           } `}
//         </p>
//         <p
//           style={
//             inline_style
//               ? {
//                   fontSize: global_font_size_p,
//                   lineHeight: global_line_height,
//                 }
//               : null
//           }
//         >
//           :مستأجر آقا / خانم
//           {` ${
//             result.renter.official_name ? result.renter.official_name : dots
//           } `}
//           نام پدر
//           {` ${
//             result.renter.official_fathers_name
//               ? result.renter.official_fathers_name
//               : dots
//           } `}
//           به شماره ملی
//           {` ${result.renter.national_id ? result.renter.national_id : dots} `}
//           شماره تماس ثابت
//           {` ${result.renter.fixed_phone ? result.renter.fixed_phone : dots} `}
//           شماره همراه
//           {` ${result.renter.cell ? "0" + result.renter.cell : dots} `}
//           نشانی اقامتگاه
//           {` ${result.renter.address ? result.renter.address : dots + dots} `}
//           شماره گواهینامه رانندگی
//           {` ${
//             result.renter.driving_license ? result.renter.driving_license : dots
//           } `}
//           تاریخ صدور
//           {` ${
//             result.renter.driving_license_issue_date
//               ? result.renter.driving_license_issue_date.name.fa.split("،")[0]
//               : dots
//           } `}
//           تاریخ اعتبار
//           {` ${
//             result.renter.driving_license_expiration_date
//               ? result.renter.driving_license_expiration_date.name.fa.split(
//                   "،"
//                 )[0]
//               : dots
//           } `}
//           نوع گواهینامه
//           {` ${
//             result.renter.driving_license_type
//               ? result.renter.driving_license_type.name.fa
//               : small_dots
//           } `}
//         </p>
//         <p
//           style={
//             inline_style
//               ? {
//                   fontSize: global_font_size_title,
//                   marginTop: "5px",
//                   marginBottom: "3px",
//                   lineHeight: global_line_height,
//                 }
//               : null
//           }
//         >
//           ماده :دو مشخصات مورد اجاره
//         </p>
//         <p
//           style={
//             inline_style
//               ? {
//                   fontSize: global_font_size_p,
//                   marginBottom: "4px",
//                   lineHeight: global_line_height,
//                 }
//               : null
//           }
//         >
//           یک دستگاه اتومبیل‌ سواری
//           {` ${
//             result.rent_search_dump.car
//               ? result.rent_search_dump.car.brand.name.fa +
//                 " " +
//                 result.rent_search_dump.car.name.fa
//               : dots
//           } `}
//           سال ساخت
//           {` ${
//             result.rent_search_dump.year
//               ? result.rent_search_dump.year.name.fa
//               : small_dots
//           } `}
//           سیستم سوخت
//           {` ${
//             result.rent_search_dump.fuel
//               ? result.rent_search_dump.fuel.name.fa
//               : small_dots
//           } `}
//           دارای
//           {` ${
//             result.rent_search_dump.cylinder
//               ? result.rent_search_dump.cylinder.name.fa
//               : small_dots
//           } `}
//           به شماره شاسی
//           {` ${
//             result.rent_search_dump.vin ? result.rent_search_dump.vin : dots
//           } `}
//           شماره موتور
//           {` ${
//             result.rent_search_dump.engine_id
//               ? result.rent_search_dump.engine_id
//               : dots
//           } `}
//           رنگ
//           {` ${
//             result.rent_search_dump.color
//               ? result.rent_search_dump.color.name.fa
//               : small_dots
//           } `}
//           و به شماره پلاک
//           {result.rent_search_dump.registration_plate_forth_part
//             ? ` ${result.rent_search_dump.registration_plate_forth_part} | ${result.rent_search_dump.registration_plate_third_part} ${result.rent_search_dump.registration_plate_second_part} ${result.rent_search_dump.registration_plate_first_part} `
//             : dots}
//           بیمه‌نامه ثالث به شماره
//           {` ${
//             result.rent_search_dump.third_party_insurance_id
//               ? result.rent_search_dump.third_party_insurance_id
//               : dots
//           } `}
//           و تاریخ اعتبار
//           {` ${
//             result.rent_search_dump.third_party_insurance_expiration_date
//               ? result.rent_search_dump.third_party_insurance_expiration_date.name.fa.split(
//                   "،"
//                 )[0]
//               : dots
//           } `}
//           ارزش مورد اجاره ) قیمت کل ماشین‌ (
//           {` ${(result.rent_search_dump.value * 10).toLocaleString()} `}
//           ریال معادل &#1794;
//           {` ${NumbersAndCurrencyUnit({
//             value: result.rent_search_dump.value,
//           })} `}
//           تومان .است
//         </p>
//         <p
//           style={
//             inline_style
//               ? {
//                   fontSize: global_font_size_p,
//                   marginTop: "5px",
//                   marginBottom: "3px",
//                   lineHeight: global_line_height,
//                 }
//               : null
//           }
//         >
//           ماده :سه مدت اجاره و مسافت
//         </p>
//         <p
//           style={
//             inline_style
//               ? {
//                   fontSize: global_font_size_p,
//                   marginBottom: "4px",
//                   lineHeight: global_line_height,
//                 }
//               : null
//           }
//         >
//           مورد اجاره در تاریخ
//           {` ${result.rent_search_dump.start_date} `}
//           به مدت
//           {` ${result.rent_search_dump.no_of_days} `}
//           روز و در ساعت
//           {` ${
//             result.delivery_time ? result.delivery_time.name.fa : small_dots
//           } `}
//           در نشانی
//           {` ${
//             result.delivery_address ? result.delivery_address : dots + dots
//           } `}
//           به مستأجر تحویل .شد مستأجر متعهد گردید مورد اجاره را در تاریخ
//           {` ${result.rent_search_dump.end_date} `}و در ساعت
//           {` ${result.return_time ? result.return_time.name.fa : small_dots} `}
//           در نشانی فوق به موجر عودت .دهد مستأجر متعهد گردید از مورد اجاره شخصاً
//           و فقط برای سواری و با تعداد سرنشین
//           {` ${
//             result.rent_search_dump.capacity
//               ? result.rent_search_dump.capacity
//               : small_dots
//           } `}
//           نفر و در شهر یا شهرهای
//           {` ${result.destinations ? result.destinations : dots} `}و با مسافت
//           حداکثر روزانه
//           {` ${
//             result.rent_search_dump.max_km_per_day
//               ? result.rent_search_dump.max_km_per_day
//               : small_dots
//           } `}
//           کیلومتر استفاده کند و به ازای هر کیلومتر اضافه مبلغ
//           {` ${(
//             result.rent_search_dump.extra_km_price * 10
//           ).toLocaleString()} `}
//           ریال معادل {` ${result.rent_search_dump.extra_km_price_name} `}
//           پرداخت .کند
//         </p>
//         <p
//           style={
//             inline_style
//               ? {
//                   fontSize: global_font_size_p,
//                   marginBottom: "3px",
//                   lineHeight: global_line_height,
//                 }
//               : null
//           }
//         >
//           کیلومتر خودرو در زمان :تحویل ..................................
//           کیلومتر
//         </p>
//       </div>
//       <div
//         className="signature"
//         style={
//           inline_style
//             ? {
//                 padding: "0.5rem 0 2rem",
//               }
//             : null
//         }
//       >
//         <span
//           id="signature_1_renter"
//           style={
//             inline_style
//               ? {
//                   textAlign: "center",
//                   display: "inline-block",
//                   width: "50%",
//                   fontSize: "0.45rem",
//                   fontWeight: "bold",
//                 }
//               : null
//           }
//         >
//           نام و امضای مستأجر
//         </span>
//         <span
//           id="signature_1_owner"
//           style={
//             inline_style
//               ? {
//                   textAlign: "center",
//                   display: "inline-block",
//                   width: "50%",
//                   fontSize: global_font_size_title,
//                   fontWeight: "bold",
//                 }
//               : null
//           }
//         >
//           نام و امضای موجر
//         </span>
//       </div>
//       <div
//         id="page_2"
//         style={
//           inline_style
//             ? {
//                 marginTop: "15px",
//               }
//             : null
//         }
//       >
//         {/* <p>
//             تبصره یک:در صورت تمایل مستأجر به اقاله -فسخ- قرارداد پیش از اتمام
//             مدت اجاره بایستی حداقل ۱۲ ساعت قبل از اتمام مدت قرارداد به موجر
//             اطلاع داده و در صورت موافقت موجر برای اقاله، پس از کسر.........درصد
//             از مبلغ باقیمانده قرارداد و مبلغ..................................
//             ریال بابت سایر هزینه‌ها، باقیمانده مبلغ به مستأجر مسترد خواهد شد.
//           </p> */}
//         <p
//           style={
//             inline_style
//               ? {
//                   fontSize: global_font_size_p,
//                   marginTop: "5px",
//                   marginBottom: "2px",
//                   lineHeight: global_line_height,
//                 }
//               : null
//           }
//         >
//           ماده :چهار اجاره بهاء و نحوه پرداخت
//         </p>
//         <p
//           style={
//             inline_style
//               ? {
//                   fontSize: global_font_size_p,
//                   marginTop: "5px",
//                   marginBottom: "3px",
//                   lineHeight: global_line_height,
//                 }
//               : null
//           }
//         >
//           اجاره خودرو از قرار روزی
//           {` ${(
//             result.rent_search_dump.avg_price_per_day * 10
//           ).toLocaleString()} `}
//           ریال معادل
//           {` ${result.rent_search_dump.avg_price_per_day_name} `}
//           برای
//           {` ${result.rent_search_dump.no_of_days} `}
//           روز جمعاً به مبلغ
//           {` ${(result.rent_search_dump.total_price * 10).toLocaleString()} `}
//           ریال معادل
//           {` ${result.rent_search_dump.total_price_name} `}
//           است که مستأجر آن را در وب‌سایت سپریس ) ‌اجاره آنلاین خودرو (‌ پرداخت
//           کرده .است
//         </p>
//         {result.has_insurance ? (
//           <p
//             style={
//               inline_style
//                 ? {
//                     fontSize: global_font_size_p,
//                     marginTop: "5px",
//                     marginBottom: "3px",
//                     lineHeight: global_line_height,
//                   }
//                 : null
//             }
//           >
//             مبلغ بیمه اجاره خودرو
//             {` ${(
//               result.rent_search_dump.insurance_total_price * 10
//             ).toLocaleString()} `}
//             ریال معادل
//             {` ${result.rent_search_dump.insurance_total_price_name} `}
//             به مدت
//             {` ${result.rent_search_dump.no_of_days + 1} `}
//             روز است که مستاجر آن را در وب‌سایت سپریس ) اجاره آنلاین خودرو‌ (
//             پرداخت کرده .است
//           </p>
//         ) : null}
//         <p
//           style={
//             inline_style
//               ? {
//                   fontSize: global_font_size_p,
//                   marginTop: "5px",
//                   marginBottom: "3px",
//                   lineHeight: global_line_height,
//                 }
//               : null
//           }
//         >
//           تبصره :یک در صورت دیرکرد مستأجر در عودت خودرو بایستی به ازای هر ساعت
//           تأخیر در تحویل مبلغ
//           {` ${(
//             result.rent_search_dump.extra_hour_price * 10
//           ).toLocaleString()} `}
//           ریال معادل
//           {` ${result.rent_search_dump.extra_hour_price_name} `}
//           بابت خسارت تأخیر در تحویل ، نقداً علاوه بر اجاره بهاء مازاد به موجر
//           پرداخت نماید و تأخیر بیشتر از ۶ ساعت معادل یک روز اجاره در نظر گرفته
//           .می‌شود
//         </p>
//         <p
//           style={
//             inline_style
//               ? {
//                   fontSize: global_font_size_p,
//                   marginTop: "5px",
//                   marginBottom: "3px",
//                   lineHeight: global_line_height,
//                 }
//               : null
//           }
//         >
//           در صورت عدم پرداخت‌ ، موجر می‌تواند از مبلغ ضمانت بدون هیچ‌گونه قیدی
//           مبلغ خسارت دیرکرد ، اجاره بهاء مازاد و سایر هزینه‌ها را کسر نماید و در
//           صورت عدم تکافوی مبلغ فوق‌ ، موجر حق دارد
//           {result.deposit_type
//             ? " " + result.deposit_type + " "
//             : result.deposit_is_handed_over
//             ? " سفته "
//             : " چک "}
//           ضمانت را نقد نموده و پس از کسر خسارت دیرکرد ، مازاد اجاره بهاء سایر
//           هزینه‌ها باقیمانده را به مستأجر مسترد نماید و مستأجر حق هیچ‌گونه
//           اعتراضی را نخواهد .داشت
//         </p>
//         <p
//           style={
//             inline_style
//               ? {
//                   fontSize: global_font_size_p,
//                   marginTop: "5px",
//                   marginBottom: "3px",
//                   lineHeight: global_line_height,
//                 }
//               : null
//           }
//         >
//           تبصره :دو در صورت درخواست مستأجر برای تمدید مدت اجاره بایستی حداقل ۱۲
//           ساعت قبل از اتمام مدت اجاره به موجر اطلاع داده و در صورت موافقت موجر
//           با تمدید ، کل مبلغ مدت تمدیدی را در سایت سپریس واریز .نماید در صورت
//           عدم موافقت موجر با تمدید یا در صورت موافقت و عدم واریز مبلغ مدت
//           تمدیدی‌ ، قرارداد اجاره منفسخ گردیده و مستأجر در صورت عدم عودت خودرو
//           در پایان مدت قرارداد اجاره مسئول تمام خسارات خواهد .بود
//         </p>
//         <p
//           style={
//             inline_style
//               ? {
//                   fontSize: global_font_size_p,
//                   marginTop: "5px",
//                   marginBottom: "3px",
//                   lineHeight: global_line_height,
//                 }
//               : null
//           }
//         >
//           ماده :پنج تضامین مستأجر
//         </p>
//         <p
//           style={
//             inline_style
//               ? {
//                   fontSize: global_font_size_p,
//                   marginTop: "5px",
//                   marginBottom: "3px",
//                   lineHeight: global_line_height,
//                 }
//               : null
//           }
//         >
//           -۱{" "}
//           {result.deposit_type ? (
//             result.description
//           ) : (
//             <span>
//               مستأجر متعهد گردید که علاوه بر اجاره بهاء مبلغ
//               {` ${
//                 result.cash_deposit
//                   ? (result.cash_deposit * 10).toLocaleString()
//                   : dots
//               } `}
//               ریال معادل
//               {` ${
//                 result.cash_deposit
//                   ? NumbersAndCurrencyUnit({
//                       value: result.cash_deposit,
//                     })
//                   : dots
//               } `}
//               تومان{" "}
//             </span>
//           )}
//           بابت تضمین جرائم احتمالی راهنمایی و رانندگی و سایر هزینه‌ها مانند
//           اضافه کیلومتر‌ ، بنزین و خسارات احتمالی خودرو که در مدت اجاره توسط
//           مستأجر یا ثالث به وجود آمده‌ ،
//           {result.deposit_type ? (
//             ""
//           ) : (
//             <span>
//               هم‌زمان با امضای قرارداد اجاره به{" "}
//               {result.deposit_type ? (
//                 result.rent_search_dump.owner.official_name + " "
//               ) : (
//                 <span>
//                   شماره کارت
//                   {` ${result.rent_search_dump.owner.bank_account_id} `}
//                   بانک
//                   {` ${result.rent_search_dump.owner.bank_name} `}
//                   به نام
//                   {` ${result.rent_search_dump.owner.official_name} `}
//                 </span>
//               )}
//             </span>
//           )}
//           و مبلغ
//           {` ${
//             result.deposit
//               ? (result.deposit.name.fa * 10).toLocaleString()
//               : dots
//           } `}
//           ریال معادل
//           {` ${
//             result.deposit
//               ? NumbersAndCurrencyUnit({
//                   value: result.deposit.name.fa,
//                 })
//               : dots
//           } `}
//           تومان به شماره کارت
//           {` ${
//             result.system_representative_bacnk_account_id
//               ? result.system_representative_bacnk_account_id
//               : dots
//           } ${
//             result.system_representative_bacnk_name
//               ? result.system_representative_bacnk_name
//               : dots
//           } `}
//           به نام
//           {` ${
//             result.system_representative_name
//               ? result.system_representative_name
//               : dots
//           } `}
//           ) نزد شرکت سپریس ( واریز .نماید
//           {result.deposit_type ? (
//             " " + result.deposit_type + " "
//           ) : (
//             <span>
//               {" "}
//               مبلغ
//               {` ${
//                 result.cash_deposit
//                   ? (
//                       (result.cash_deposit - result.deposit.name.fa) *
//                       10
//                     ).toLocaleString()
//                   : dots
//               } `}
//               معادل
//               {` ${
//                 result.cash_deposit
//                   ? NumbersAndCurrencyUnit({
//                       value: result.cash_deposit - result.deposit.name.fa,
//                     })
//                   : dots
//               } `}
//               تومان{" "}
//             </span>
//           )}
//           بعد از تحویل خودرو پس از کسر جرائم مشخص‌شده به مستأجر مسترد خواهد شد و
//           مبلغ
//           {` ${
//             result.deposit
//               ? (result.deposit.name.fa * 10).toLocaleString()
//               : dots
//           } `}
//           ریال معادل
//           {` ${
//             result.deposit
//               ? NumbersAndCurrencyUnit({
//                   value: result.deposit.name.fa,
//                 })
//               : dots
//           } `}
//           تومان باقیمانده پس از اخذ خلافی خودرو توسط موجر و پس از کسر جرائم
//           راهنمایی و رانندگی در مدت اجاره و سایر هزینه‌های مربوط به آن و پس از
//           ۲۰ روز کاری مورخه
//           {` ${
//             result.deposit_return_date
//               ? result.deposit_return_date.name.fa
//               : dots
//           } `}{" "}
//           به شماره کارت
//           {` ${
//             result.renter.bank_account_id ? result.renter.bank_account_id : dots
//           } `}{" "}
//           بانک
//           {` ${result.renter.bank_name ? result.renter.bank_name : dots} `}
//           به نام
//           {` ${result.renter.official_name} `}
//           واریز خواهد .شد
//         </p>
//       </div>
//       <div
//         className="signature"
//         style={
//           inline_style
//             ? {
//                 padding: "0.5rem 0 2.5rem",
//               }
//             : null
//         }
//       >
//         <span
//           id="signature_1_renter"
//           style={
//             inline_style
//               ? {
//                   textAlign: "center",
//                   display: "inline-block",
//                   width: "50%",
//                   fontSize: "0.45rem",
//                   fontWeight: "bold",
//                 }
//               : null
//           }
//         >
//           نام و امضای مستأجر
//         </span>
//         <span
//           id="signature_1_owner"
//           style={
//             inline_style
//               ? {
//                   textAlign: "center",
//                   display: "inline-block",
//                   width: "50%",
//                   fontSize: global_font_size_title,
//                   fontWeight: "bold",
//                 }
//               : null
//           }
//         >
//           نام و امضای موجر
//         </span>
//       </div>
//       <div id="page_3">
//         <p
//           style={
//             inline_style
//               ? {
//                   fontSize: global_font_size_p,
//                   marginTop: "4px",
//                   marginBottom: "3px",
//                   lineHeight: global_line_height,
//                 }
//               : null
//           }
//         >
//           -۲{" "}
//           {result.deposit_type ? (
//             result.deposit_type
//           ) : (
//             <span>
//               {result.deposit_is_handed_over ? " سفته " : " چک "} به شماره
//               {` ${
//                 result.deposit_document_id ? result.deposit_document_id : dots
//               } `}
//               {result.deposit_is_handed_over ? (
//                 ""
//               ) : (
//                 <span>
//                   بانک
//                   {` ${result.deposit_bank ? result.deposit_bank : dots} `}
//                   به ‌نام
//                   {` ${
//                     result.deposit_person_name
//                       ? result.deposit_person_name
//                       : dots
//                   } `}
//                 </span>
//               )}
//               به مبلغ
//               {` ${(result.rent_search_dump.value * 10).toLocaleString()} `}
//               ریال معادل
//               {` ${NumbersAndCurrencyUnit({
//                 value: result.rent_search_dump.value,
//               })} `}
//               تومان{" "}
//             </span>
//           )}
//           بابت تضمین خسارات وارده به خودرو ، مازاد اجاره بهاء ، جرائم رانندگی ،
//           تعمیرات و سایر هزینه‌ها و تخلفات و جرائم توسط مستأجر در هنگام امضای
//           قرارداد به موجر تحویل .شد مستأجر ضمن این قرارداد به موجر اذن داد در
//           صورت هرگونه تخلف از این قرارداد نسبت به نقد کردن
//           {result.deposit_type
//             ? " " + result.deposit_type + " "
//             : result.deposit_is_handed_over
//             ? " سفته "
//             : " چک "}
//           فوق و کسر هزینه‌ها و جرائم و تخلفات ایجادشده در مدت اجاره ، باقی مبلغ
//           را به مستأجر مسترد .نماید
//           <br />
//           در صورت عدم تخلف و عدم بروز اختلاف بین موجر و مستأجر ،
//           {result.deposit_type
//             ? " " + result.deposit_type + " "
//             : result.deposit_is_handed_over
//             ? " سفته "
//             : " چک "}{" "}
//           فوق در روز تحویل ) برگشت خودرو ( به مستأجر عودت خواهد .شد
//         </p>
//         <p
//           style={
//             inline_style
//               ? {
//                   fontSize: global_font_size_p,
//                   marginTop: "5px",
//                   marginBottom: "3px",
//                   lineHeight: global_line_height,
//                 }
//               : null
//           }
//         >
//           ماده :شش تعهدات موجر
//         </p>
//         <p
//           style={
//             inline_style
//               ? {
//                   fontSize: global_font_size_p,
//                   marginTop: "5px",
//                   marginBottom: "3px",
//                   lineHeight: global_line_height,
//                 }
//               : null
//           }
//         >
//           -۱ موجر متعهد می‌گردد خودرو را به رؤیت مستأجر رسانده و صحیح و سالم
//           تحویل ایشان .نماید <br />
//           -۲ به مستأجر آموزش‌های لازم را برای استفاده از مورد اجاره .دهد
//           <br />
//           -۳ تحویل خودرو با میزان بنزین کافی به .مستأجر
//           <br />
//           -۴ هزینه‌های از قبیل لنت‌ ، تعویض روغن‌ ، تایر ، ضد یخ و سایر قطعات
//           مصرفی به عهده موجر .است
//           <br />
//           -۵ تحویل خودرو در تاریخ و ساعت تعیین‌شده در قرارداد اجاره به .مستأجر
//           <br />
//           -۶ تحویل اصل / کپی کارت خودرو و بیمه‌نامه معتبر شخص ثالث به .مستأجر
//         </p>
//         <p
//           style={
//             inline_style
//               ? {
//                   fontSize: global_font_size_p,
//                   marginTop: "5px",
//                   marginBottom: "3px",
//                   lineHeight: global_line_height,
//                 }
//               : null
//           }
//         >
//           ماده :هفت تعهدات مستأجر
//         </p>
//         <p
//           style={
//             inline_style
//               ? {
//                   fontSize: global_font_size_p,
//                   marginTop: "5px",
//                   marginBottom: "3px",
//                   lineHeight: global_line_height,
//                 }
//               : null
//           }
//         >
//           -۱ استرداد خودرو با میزان بنزین تحویل گرفته .شده <br />
//           -۲ رعایت کلیه قوانین راهنمایی و .رانندگی <br />
//           -۳ رعایت شئونات اسلامی ازجمله رعایت حجاب در خودرو در تمام مدت اجاره
//           توسط مستأجر و سرنشینان الزامی است و در صورت عدم رعایت این موارد طبق
//           قانون مسئولیت و خسارت وارده ناشی از توقیف ماشین بر عهده مستأجر .است
//           <br />
//           -۴ رعایت کلیه موارد متعارف و ایمن در استفاده از .خودرو
//           <br />
//           -۵ مستأجر هیچ‌گونه حق حمل بار و مسافر را با مورد اجاره نخواهد .داشت
//           <br />
//           -۶ در صورت بروز هرگونه خرابی مستأجر مکلف است قبل از هرگونه اقدامی با
//           موجر تماس برقرار نموده و با هماهنگی ایشان نسبت به حمل به تعمیرگاه ) با
//           خودروی مخصوص حمل ( یا تعمیر در محل اقدام نماید و بدون هماهنگی و تائید
//           موجر حق هیچ‌گونه اقدامی را نخواهد .داشت
//           <br />
//           -۷ مستأجر شخصاً حق هیچ‌گونه تعمیر و تغییری در خودرو را نخواهد .داشت
//           <br />
//           -۸ مستأجر متعهد گردید جهت پارک خودرو در شب از پارکینگ استفاده نماید و
//           در صورت سرقت و بروز هرگونه خسارتی در خارج از پارکینگ مستأجر مسئولیت
//           تام و بی‌قیدوشرط خواهد .داشت
//         </p>
//       </div>
//       <div
//         className="signature"
//         style={
//           inline_style
//             ? {
//                 padding: "0.3rem 0 2rem",
//               }
//             : null
//         }
//       >
//         <span
//           id="signature_1_renter"
//           style={
//             inline_style
//               ? {
//                   textAlign: "center",
//                   display: "inline-block",
//                   width: "50%",
//                   fontSize: "0.45rem",
//                   fontWeight: "bold",
//                 }
//               : null
//           }
//         >
//           نام و امضای مستأجر
//         </span>
//         <span
//           id="signature_1_owner"
//           style={
//             inline_style
//               ? {
//                   textAlign: "center",
//                   display: "inline-block",
//                   width: "50%",
//                   fontSize: global_font_size_title,
//                   fontWeight: "bold",
//                 }
//               : null
//           }
//         >
//           نام و امضای موجر
//         </span>
//       </div>
//       <div id="page_4">
//         <p
//           style={
//             inline_style
//               ? {
//                   fontSize: global_font_size_p,
//                   marginTop: "5px",
//                   marginBottom: "3px",
//                   lineHeight: global_line_height,
//                 }
//               : null
//           }
//         >
//           -۹ مستأجر متعهد گردید که خود شخصاً با خودرو رانندگی .نماید
//           <br />
//           -۱۰ در صورت بروز هرگونه تصادف ، تخلف و حادثه که مستلزم پیگیری اداری و
//           قضائی شود مستأجر مکلف است موجر را در تمام مراحل و تا اتمام پیگیری‌ها
//           همراهی نماید و کلیه خسارت و هزینه‌های قضائی و اداری را پرداخت .نماید
//           <br />
//           -۱۱ مورد اجاره فقط برای استفاده سواری به مستأجر اجاره داده‌شده و
//           مستأجر متعهد گردید در صورت کشف هرگونه جرمی از قبیل حمل مواد مخدر ،
//           مشروبات الکلی و سایر جرائم و تخلفات که منجر به توقیف خودرو توسط مقامات
//           قضائی ، انتظامی و سایر مراجع ذیصلاح گردد ، مسئولیت آن بر عهده مستأجر
//           .است
//           <br />
//           -۱۲ مستأجر حق واگذاری مورد اجاره و انتقال حق منفعت به غیر را
//           به‌هیچ‌عنوان .ندارد
//           <br />
//           -۱۳ هرگونه خسارت و آسیب بر عهده مستأجر است‌ ، که در صورت خرید بیمه
//           اجاره خودرو ، هزینه فرانشیزها و استهلاک با مستأجر .است‌‌
//           <br />
//           -۱۴ در صورت تصادف و خسارت که منجر به افت قیمت ماشین شود ، تماماً به
//           عهده مستأجر است و بیمه پوشش افت را شامل .نمی‌شود
//         </p>
//         <p
//           style={
//             inline_style
//               ? {
//                   fontSize: global_font_size_p,
//                   marginTop: "5px",
//                   marginBottom: "3px",
//                   lineHeight: global_line_height,
//                 }
//               : null
//           }
//         >
//           ماده :هشت حل اختلاف
//         </p>
//         <p
//           style={
//             inline_style
//               ? {
//                   fontSize: global_font_size_p,
//                   marginTop: "5px",
//                   marginBottom: "3px",
//                   lineHeight: global_line_height,
//                 }
//               : null
//           }
//         >
//           هرگاه در تفسیر یا اجرای مفاد قرارداد بین طرفین آن اختلاف‌نظر پیش آید
//           اختلاف بین طرفین ابتدا از طریق مذاکره و تفاهم حل‌وفصل خواهد شد و در
//           صورت عدم حصول نتیجه امور قضایی و قانونی مرجع حل اختلاف خواهد .بود
//         </p>
//         <p
//           style={
//             inline_style
//               ? {
//                   fontSize: global_font_size_p,
//                   marginTop: "5px",
//                   marginBottom: "3px",
//                   lineHeight: global_line_height,
//                 }
//               : null
//           }
//         >
//           * این قرارداد در هشت ماده در 2 نسخه تنظیم گردید که هرکدام حکم واحد
//           .دارند
//         </p>
//         <p
//           style={
//             inline_style
//               ? {
//                   fontSize: global_font_size_p,
//                   marginTop: "5px",
//                   marginBottom: "3px",
//                   lineHeight: global_line_height,
//                 }
//               : null
//           }
//         >
//           اینجانب
//           {` ${
//             result.renter.official_name ? result.renter.official_name : dots
//           } `}
//           مستأجر قرارداد بارویت خودرو و کسب کلیه آموزش‌های استفاده خودرو توسط
//           موجر ، خودرو را از ایشان صحیح و سالم تحویل .گرفتم
//         </p>
//       </div>
//       <div
//         className="signature"
//         style={
//           inline_style
//             ? {
//                 padding: "1rem 0 0",
//               }
//             : null
//         }
//       >
//         <span
//           id="signature_1_renter"
//           style={
//             inline_style
//               ? {
//                   textAlign: "center",
//                   display: "inline-block",
//                   width: "50%",
//                   fontSize: "0.45rem",
//                   fontWeight: "bold",
//                 }
//               : null
//           }
//         >
//           نام و امضای مستأجر
//         </span>
//         <span
//           id="signature_1_owner"
//           style={
//             inline_style
//               ? {
//                   textAlign: "center",
//                   display: "inline-block",
//                   width: "50%",
//                   fontSize: global_font_size_title,
//                   fontWeight: "bold",
//                 }
//               : null
//           }
//         >
//           نام و امضای موجر
//         </span>
//       </div>
//       <div
//         className="signature"
//         style={
//           inline_style
//             ? {
//                 padding: "1rem 0 0",
//               }
//             : null
//         }
//       >
//         <p>
//           <span
//             id="witness_1"
//             style={
//               inline_style
//                 ? {
//                     textAlign: "center",
//                     display: "inline-block",
//                     width: "50%",
//                     fontSize: "0.45rem",
//                     fontWeight: "bold",
//                   }
//                 : null
//             }
//           >
//             نام و امضاء شاهد یک{" "}
//           </span>
//           <span
//             id="witness_2"
//             style={
//               inline_style
//                 ? {
//                     textAlign: "center",
//                     display: "inline-block",
//                     width: "50%",
//                     fontSize: global_font_size_title,
//                     fontWeight: "bold",
//                   }
//                 : null
//             }
//           >
//             نام و امضاء شاهد دو
//           </span>
//         </p>
//       </div>
//     </div>
//   );
// };

// interface IContract_text {
//   inline_style?: boolean;
//   html_ref?: any;
//   result: any;
// }

// export default Contract_text;
