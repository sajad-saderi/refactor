import { useContext, useEffect, useState } from "react";
import { NextSeo } from "next-seo";
import {
  Page,
  Text,
  View,
  Document,
  StyleSheet,
  Font,
} from "@react-pdf/renderer";
import language from "../../../public/languages/fa/contract.json";
import iran_sans_m from "../../../public/fonts/woff/IRANSansWeb_Medium.woff";
import iran_sans_b from "../../../public/fonts/woff/IRANSansWeb_Bold.woff";
import jsCookie from "js-cookie";
import { useRouter } from "next/router";
import { GET_ORDER_REQUEST } from "../../API";
import context_user from "../../context/User_info";
import { guard_controller } from "../../../utils/guard_controller";
import moment from "moment-jalaali";
import NumbersAndCurrencyUnit from "../../../utils/NumbersAndCurrencyUnit";

const token = jsCookie.get("token");
// import { logPageView } from "../utils/analytics";

Font.register({
  family: "iransans",
  fonts: [
    {
      src: iran_sans_m,
      fontWeight: "normal",
    },
    { src: iran_sans_b, fontWeight: "bold" },
  ],
});

// Create styles
const styles = StyleSheet.create({
  page: {
    paddingTop: "35px",
    flexDirection: "row",
    lineHeight: 2,
    fontSize: "14px",
    fontFamily: "iransans",
  },
  contract_title: {
    paddingTop: "24px",
    fontSize: "18px",
    fontWeight: "bold",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  with_driver: {
    textAlign: "center",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    fontWeight: "bold",
  },
  date: {
    display: "flex",
    alignItems: "center",
    justifyContent: "flex-end",
  },
  contract_number: {
    display: "flex",
    alignItems: "center",
    justifyContent: "flex-end",
  },
  paraghraph_title: {
    fontWeight: "bold",
    display: "flex",
    alignItems: "center",
    justifyContent: "flex-start",
    marginBottom: "10px",
    textAlign: "right",
    paddingTop: 16,
  },
  text: {
    textAlign: "right",
    overflowWrap: "anywhere",
    alignItems: "center",
    justifyContent: "flex-start",
    // display: "block",
  },
  text_with_padding: {
    textAlign: "right",
    display: "flex",
    alignItems: "center",
    justifyContent: "flex-start",
    paddingRight: 24,
  },
  text_with_padding_flex: {
    textAlign: "right",
    display: "flex",
    alignItems: "flex-start",
    justifyContent: "flex-start",
    paddingRight: 24,
  },
  text_with_padding_flex_sub_padding: {
    paddingRight: 8,
  },
  extra_padding: {
    textAlign: "right",
    // display: "block",
    alignItems: "center",
    justifyContent: "flex-start",
    paddingRight: 44,
  },
  signature: {
    display: "flex",
    alignItems: "center",
    marginTop: 30,
    fontWeight: "bold",
    marginBottom: 30,
    justifyContent: "space-around",
  },
  tabsareh_title: { fontWeight: "bold" },
  tabsareh_text: { textAlign: "justify" },
  bold_text: {
    paddingRight: 10,
    paddingLeft: 10,
  },
});

const Contract = () => {
  const [dots, set_dots] = useState(
    "............................................"
  );
  const [result, setResult] = useState(null);

  const user_info = useContext(context_user);
  const router = useRouter();

  useEffect(() => {
    window["dataLayer"].push({
      event: "page_view",
      pageURL: window.location.href,
      pagePath: "/evaluation",
      pageTitle: language.next_seo.title,
    });
    // logPageView();
  }, []);

  useEffect(() => {
    const guard = guard_controller();
    if (guard !== "auth") {
      router.push(`/${guard}`);
      return;
    }
    if (user_info.data) {
      if (window["auth"] && user_info.data?.first_name) {
        if (user_info.data.first_name) {
          fetchAPI(router.query.id);
        }
      } else {
        if (
          router.asPath !== "/login" &&
          router.asPath !== "/complete-register"
        )
          localStorage["last_location"] = router.asPath;
        else {
          localStorage["last_location"] = "/";
        }
        router.push("/login");
      }
    }
  }, [user_info]);

  const fetchAPI = async (id) => {
    try {
      const res: any = await GET_ORDER_REQUEST({
        id,
        token,
      });
      // if (res.data.status.id !== "new") {
      //   router.push("/requests");
      // } else {
      setResult(res.data);
      // }
    } catch (error) {
      console.log("!Error", error);
    }
  };

  return (
    <>
      <NextSeo
        noindex={true}
        title={language.next_seo.title}
        description={language.next_seo.description}
        openGraph={{
          title: language.next_seo.title,
          description: language.next_seo.description,
        }}
        twitter={{
          handle: language.next_seo.handle,
          site: language.next_seo.site,
          cardType: language.next_seo.cardType,
        }}
      />
      {result ? (
        <Document>
          <Page size='A4' style={styles.page}>
            <View>
              <Text style={styles.contract_title}> قرارداد اجاره خودرو</Text>
              <Text style={styles.with_driver}>
                {result.rent_search_dump.with_driver
                  ? "(بدون راننده)"
                  : "(با راننده)"}
              </Text>
              <Text style={styles.date}>
                تاریخ:
                <Text style={styles.bold_text}>
                  {moment().format("jYYYY/jMM/jDD")}
                </Text>
              </Text>
              <Text style={styles.contract_number}>
                شماره:
                <Text style={styles.bold_text}>
                  {`${result.id} - `}
                  {moment().format(" jMM - jYY")}
                </Text>
              </Text>
            </View>
            <br />
            <View>
              <Text style={styles.paraghraph_title}>
                ماده یک: مشخصات طرفین قرارداد
              </Text>
              <Text style={styles.text}>
                موجر: آقا/خانم
                <Text style={styles.bold_text}>
                  {` ${
                    result.rent_search_dump.owner.official_name
                      ? result.rent_search_dump.owner.official_name
                      : dots
                  } `}
                </Text>
                اصالتاً/ با وکالت............. نام پدر
                <Text style={styles.bold_text}>{` ${
                  result.rent_search_dump.owner.official_fathers_name
                    ? result.rent_search_dump.owner.official_fathers_name
                    : dots
                } `}</Text>
                به شماره ملی ................................. شماره تماس ثابت
                <Text style={styles.bold_text}>{` ${
                  result.rent_search_dump.owner.fixed_phone
                    ? result.rent_search_dump.owner.fixed_phone
                    : dots
                } `}</Text>
                شماره همراه
                <Text style={styles.bold_text}>{` ${
                  result.rent_search_dump.owner.cell
                    ? "0" + result.rent_search_dump.owner.cell
                    : dots
                } `}</Text>
                نشانی اقامتگاه
                .........................................................................................................................................................................................
              </Text>
              <br />
              <Text style={styles.text}>
                مستأجر: آقا/خانم
                <Text style={styles.bold_text}>{` ${
                  result.renter.official_name
                    ? result.renter.official_name
                    : dots
                } `}</Text>
                نام پدر
                <Text style={styles.bold_text}>{` ${
                  result.renter.official_fathers_name
                    ? result.renter.official_fathers_name
                    : dots
                } `}</Text>
                به شماره ملی ................................. شماره تماس ثابت
                <Text style={styles.bold_text}>{` ${
                  result.renter.fixed_phone ? result.renter.fixed_phone : dots
                } `}</Text>
                شماره همراه
                <Text style={styles.bold_text}>{` ${
                  result.renter.cell ? "0" + result.renter.cell : dots
                } `}</Text>
                نشانی اقامتگاه
                .........................................................................................................................................................................................
                شماره گواهینامه رانندگی
                ................................................... تاریخ صدور
                ................................. تاریخ اعتبار
                ................................. نوع گواهینامه
                .................................
              </Text>
            </View>
            <br />
            <br />
            <View>
              <Text style={styles.paraghraph_title}>
                ماده دو: مشخصات مورد اجاره
              </Text>
              <Text style={styles.text}>
                یک دستگاه اتومبیل‌ سواری
                <Text style={styles.bold_text}>{` ${
                  result.rent_search_dump.car.name.fa
                    ? result.rent_search_dump.car.name.fa
                    : dots
                } `}</Text>
                به مدل
                <Text style={styles.bold_text}>{` ${
                  result.rent_search_dump.year.name.fa
                    ? result.rent_search_dump.year.name.fa
                    : dots
                } `}</Text>
                سیستم سوخت ................... دارای
                <Text style={styles.bold_text}>{` ${
                  result.rent_search_dump.cylinder.name.fa
                    ? result.rent_search_dump.cylinder.name.fa
                    : dots
                }`}</Text>
                ، به شماره شاسی
                ................................................. شماره
                موتور..................................................................
                رنگ
                <Text style={styles.bold_text}>{` ${
                  result.rent_search_dump.color.name.fa
                    ? result.rent_search_dump.color.name.fa
                    : dots
                }`}</Text>
                ؛ و به شماره پلاک
                <Text style={styles.bold_text}>
                  {result.rent_search_dump.registration_plate_forth_part
                    ? ` ${result.rent_search_dump.registration_plate_forth_part} ${result.rent_search_dump.registration_plate_third_part} ${result.rent_search_dump.registration_plate_second_part} |  ${result.rent_search_dump.registration_plate_first_part} `
                    : dots}
                </Text>
                بیمه‌نامه ثالث به شماره
                <Text style={styles.bold_text}>{` ${
                  result.rent_search_dump.third_party_insurance_id
                    ? result.rent_search_dump.third_party_insurance_id
                    : dots
                } `}</Text>
                و تاریخ اعتبار
                <Text style={styles.bold_text}>{` ${
                  result.rent_search_dump.third_party_insurance_expiration_date
                    ? result.rent_search_dump
                        .third_party_insurance_expiration_date.name.fa
                    : dots
                } `}</Text>
              </Text>
              <Text style={styles.text}>
                ارزش مورد اجاره (قیمت کل ماشین)
                <Text style={styles.bold_text}>{` ${(
                  result.rent_search_dump.value * 10
                ).toLocaleString()} `}</Text>
                ریال معادل
                <Text style={styles.bold_text}>{` ${NumbersAndCurrencyUnit({
                  value: result.rent_search_dump.value,
                })} `}</Text>
                تومان است.
              </Text>
            </View>
            <br />
            <br />
            <View>
              <Text style={styles.paraghraph_title}>
                ماده سه: مدت اجاره و مسافت
              </Text>
              <Text style={styles.text}>
                مورد اجاره در تاریخ
                <Text
                  style={styles.bold_text}
                >{` ${result.rent_search_dump.start_date} `}</Text>
                به مدت
                <Text
                  style={styles.bold_text}
                >{` ${result.rent_search_dump.no_of_days} `}</Text>
                روز و ساعت...............در
                نشانی....................................................................................................................................
                به مستأجر تحویل شد.
              </Text>
              <Text style={styles.text}>
                مستأجر متعهد گردید مورد اجاره را در تاریخ
                <Text
                  style={styles.bold_text}
                >{` ${result.rent_search_dump.end_date} `}</Text>
                و در ساعت................... در نشانی فوق به موجر عودت دهد.
              </Text>
              <Text style={styles.text}>
                مستأجر متعهد گردید از مورد اجاره شخصاً و فقط برای سواری و با
                تعداد سرنشین
                <Text
                  style={styles.bold_text}
                >{` ${result.rent_search_dump.car.capacity} `}</Text>
                نفر و در شهر/شهرهای........................... و با مسافت حداکثر
                روزانه
                <Text
                  style={styles.bold_text}
                >{` ${result.rent_search_dump.max_km_per_day} `}</Text>
                کیلومتر استفاده کند. کند و به ازای هر کیلومتر اضافه مبلغ
                <Text style={styles.bold_text}>{` ${(
                  result.rent_search_dump.extra_km_price * 10
                ).toLocaleString()} `}</Text>
                ریال معادل
                <Text
                  style={styles.bold_text}
                >{` ${result.rent_search_dump.extra_km_price_name} `}</Text>
                پرداخت کند.
              </Text>
              <br />
              <Text style={styles.text}>
                کیلومتر خودرو در زمان تحویل: ..................................
                کیلومتر
              </Text>
              <Text style={styles.signature} break>
                <Text>نام و امضای مستأجر</Text>
                <Text>نام و امضای موجر</Text>
              </Text>
              <br />
            </View>
            <View>
              <Text style={styles.tabsareh_title}>تبصره یک:</Text>
              <Text style={styles.tabsareh_text}>
                در صورت تمایل مستأجر به اقاله (فسخ) قرارداد پیش از اتمام مدت
                اجاره بایستی حداقل ۱۲ ساعت قبل از اتمام مدت قرارداد به موجر
                اطلاع داده و در صورت موافقت موجر برای اقاله، پس از
                کسر.........درصد از مبلغ باقیمانده قرارداد و
                مبلغ.................................. ریال بابت سایر هزینه‌ها،
                باقیمانده مبلغ به مستأجر مسترد خواهد شد.
              </Text>
            </View>
            <br />
            <br />
            <View>
              <Text style={styles.paraghraph_title}>
                ماده چهار: اجاره بهاء و نحوه پرداخت
              </Text>
              <Text style={styles.text}>
                اجاره خودرو از قرار روزی
                <Text style={styles.bold_text}>{` ${(
                  result.rent_search_dump.avg_price_per_day * 10
                ).toLocaleString()} `}</Text>
                ریال معادل
                <Text
                  style={styles.bold_text}
                >{` ${result.rent_search_dump.avg_price_per_day_name} `}</Text>
                برای
                <Text
                  style={styles.bold_text}
                >{` ${result.rent_search_dump.no_of_days} `}</Text>
                روز جمعاً به مبلغ
                <Text style={styles.bold_text}>{` ${(
                  result.rent_search_dump.total_price * 10
                ).toLocaleString()} `}</Text>
                ریال معادل
                <Text
                  style={styles.bold_text}
                >{` ${result.rent_search_dump.total_price_name} `}</Text>
                است که مستأجر آن را در وب‌سایت سپریس (اجاره آنلاین خودرو) پرداخت
                کرده است.
              </Text>
              {result.has_insurance ? (
                <Text style={styles.text}>
                  مبلغ بیمه اجاره خودرو
                  <Text style={styles.bold_text}>{` ${(
                    result.rent_search_dump.insurance_total_price * 10
                  ).toLocaleString()} `}</Text>
                  ریال معادل
                  <Text
                    style={styles.bold_text}
                  >{` ${result.rent_search_dump.insurance_total_price_name} `}</Text>
                  به مدت
                  <Text
                    style={styles.bold_text}
                  >{` ${result.rent_search_dump.no_of_days} `}</Text>
                  روز است که مستاجر آن را در وب‌سایت سپریس (اجاره آنلاین خودرو)
                  پرداخت کرده است.
                </Text>
              ) : null}
              <br />
              <br />
              <Text style={styles.tabsareh_title}>تبصره دو: </Text>
              <Text style={styles.tabsareh_text}>
                در صورت دیرکرد مستأجر در عودت خودرو بایستی به ازای هر ساعت تأخیر
                در تحویل مبلغ
                <Text style={styles.bold_text}>{` ${(
                  result.rent_search_dump.extra_hour_price * 10
                ).toLocaleString()} `}</Text>
                ریال معادل
                <Text
                  style={styles.bold_text}
                >{` ${result.rent_search_dump.extra_hour_price_name} `}</Text>
                بابت خسارت تأخیر در تحویل، نقداً علاوه بر اجاره بهاء مازاد به
                موجر پرداخت نماید و تأخیر بیشتر از ۶ ساعت معادل یک روز اجاره در
                نظر گرفته می‌شود.
              </Text>
              <Text style={styles.text}>
                در صورت عدم پرداخت، موجر می‌تواند از مبلغ ضمانت بدون هیچ‌گونه
                قیدی مبلغ خسارت دیرکرد، اجاره بهاء مازاد و سایر هزینه‌ها را کسر
                نماید و در صورت عدم تکافوی مبلغ فوق، موجر حق دارد چک ضمانت را
                نقد نموده و پس از کسر خسارت دیرکرد، مازاد اجاره بهاء سایر
                هزینه‌ها باقیمانده را به مستأجر مسترد نماید و مستأجر حق هیچ‌گونه
                اعتراضی را نخواهد داشت.
              </Text>
              <br />
              <Text style={styles.tabsareh_title}>تبصره سه: </Text>
              <Text style={styles.tabsareh_text}>
                در صورت درخواست مستأجر برای تمدید مدت اجاره بایستی
              </Text>
              <Text style={styles.tabsareh_title}> حداقل ۱۲ ساعت </Text>
              <Text style={styles.tabsareh_text}>
                قبل از اتمام مدت اجاره به موجر اطلاع داده و در صورت موافقت موجر
                با تمدید، کل مبلغ مدت تمدیدی را در سایت سپریس واریز نماید. در
                صورت عدم موافقت موجر با تمدید یا در صورت موافقت و عدم واریز مبلغ
                مدت تمدیدی، قرارداد اجاره منفسخ گردیده و مستأجر در صورت عدم عودت
                خودرو در پایان مدت قرارداد اجاره مسئول تمام خسارات خواهد بود.
              </Text>
            </View>
            <br />
            <br />
            <View>
              <Text style={styles.paraghraph_title}>
                ماده پنج: تضامین مستأجر
              </Text>
              <Text style={styles.text_with_padding_flex}>
                <Text>۱- </Text>
                <Text style={styles.text_with_padding_flex_sub_padding}>
                  مستأجر متعهد گردید که علاوه بر اجاره بهاء مبلغ
                  <Text style={styles.bold_text}>{` ${(
                    result.cash_deposit * 10
                  ).toLocaleString()} `}</Text>
                  ریال معادل
                  <Text style={styles.bold_text}>
                    {` ${NumbersAndCurrencyUnit({
                      value: result.cash_deposit,
                    })} `}
                  </Text>
                  تومان بابت تضمین جرائم احتمالی راهنمایی و رانندگی و سایر
                  هزینه‌ها مانند اضافه کیلومتر، بنزین و خسارات احتمالی خودرو که
                  در مدت اجاره توسط مستأجر یا ثالث به وجود آمده، هم‌زمان با
                  امضای قرارداد اجاره به شماره کارت
                  <Text
                    style={styles.bold_text}
                  >{` ${result.rent_search_dump.owner.bank_account_id} `}</Text>
                  بانک
                  <Text
                    style={styles.bold_text}
                  >{` ${result.rent_search_dump.owner.bank_name} `}</Text>
                  به نام
                  <Text
                    style={styles.bold_text}
                  >{` ${result.rent_search_dump.owner.official_name} `}</Text>
                  و مبلغ
                  <Text style={styles.bold_text}>{` ${(
                    result.deposit.name.fa * 10
                  ).toLocaleString()} `}</Text>
                  ریال معادل
                  <Text style={styles.bold_text}>
                    {` ${NumbersAndCurrencyUnit({
                      value: result.deposit.name.fa,
                    })} `}
                  </Text>
                  تومان به شماره کارت
                  <Text style={styles.bold_text}>{` ${
                    result.system_representative_bacnk_account_id
                      ? result.system_representative_bacnk_account_id
                      : dots
                  } `}</Text>
                  –
                  <Text style={styles.bold_text}>{` ${
                    result.system_representative_bacnk_name
                      ? result.system_representative_bacnk_name
                      : dots
                  } `}</Text>
                  به نام
                  <Text style={styles.bold_text}>{` ${
                    result.system_representative_name
                      ? result.system_representative_name
                      : dots
                  } `}</Text>
                  (نزد شرکت سپریس) واریز نماید.
                  {/* </Text> */}
                  <br />
                  {/* <Text style={styles.extra_padding}> */}
                  مبلغ
                  <Text style={styles.bold_text}>{` ${(
                    (result.cash_deposit - result.deposit.name.fa) *
                    10
                  ).toLocaleString()} `}</Text>
                  معادل
                  <Text style={styles.bold_text}>
                    {` ${NumbersAndCurrencyUnit({
                      value: result.cash_deposit - result.deposit.name.fa,
                    })} `}
                  </Text>
                  تومان بعد از تحویل خودرو پس از کسر جرائم مشخص‌شده به مستأجر
                  مسترد خواهد شد و مبلغ
                  <Text style={styles.bold_text}>{` ${(
                    result.deposit.name.fa * 10
                  ).toLocaleString()} `}</Text>
                  ریال معادل
                  <Text style={styles.bold_text}>
                    {` ${NumbersAndCurrencyUnit({
                      value: result.deposit.name.fa,
                    })} `}
                  </Text>
                  تومان باقیمانده پس از اخذ خلافی خودرو توسط موجر و پس از کسر
                  جرائم راهنمایی و رانندگی در مدت اجاره و سایر هزینه‌های مربوط
                  به آن و پس از ۲۰ روز کاری (مورخه
                  <Text
                    style={styles.bold_text}
                  >{` ${result.deposit_return_date.name.fa} `}</Text>
                  ) به شماره کارت
                  <Text
                    style={styles.bold_text}
                  >{` ${result.renter.bank_account_id} `}</Text>
                  – بانک
                  <Text
                    style={styles.bold_text}
                  >{` ${result.renter.bank_name} `}</Text>
                  به نام
                  <Text
                    style={styles.bold_text}
                  >{` ${result.renter.official_name} `}</Text>
                  واریز خواهد شد.
                </Text>
              </Text>
              <br />
              <Text style={styles.signature} break>
                <Text>نام و امضای مستأجر</Text>
                <Text>نام و امضای موجر</Text>
              </Text>
              <br />
              <Text style={styles.text_with_padding_flex}>
                <Text>۲-</Text>
                <Text style={styles.text_with_padding_flex_sub_padding}>
                  چک به شماره
                  <Text
                    style={styles.bold_text}
                  >{` ${result.deposit_document_id} `}</Text>
                  بانک
                  <Text
                    style={styles.bold_text}
                  >{` ${result.deposit_bank} `}</Text>
                  به ‌نام
                  <Text
                    style={styles.bold_text}
                  >{` ${result.deposit_person_name} `}</Text>
                  به مبلغ................................................ریال
                  معادل .................. تومان بابت تضمین خسارات وارده به
                  خودرو، مازاد اجاره بهاء، جرائم رانندگی، تعمیرات و سایر
                  هزینه‌ها و تخلفات و جرائم توسط مستأجر در هنگام امضای قرارداد
                  به موجر تحویل شد.
                  <br />
                  <Text style={styles.text}>
                    مستأجر ضمن این قرارداد به موجر اذن داد در صورت هرگونه تخلف
                    از این قرارداد نسبت به نقد کردن چک فوق و کسر هزینه‌ها و
                    جرائم و تخلفات ایجادشده در مدت اجاره، باقی مبلغ را به مستأجر
                    مسترد نماید.
                  </Text>
                  <br />
                  <Text style={styles.text}>
                    در صورت عدم تخلف و عدم بروز اختلاف بین موجر و مستأجر، چک فوق
                    در روز تحویل (برگشت) خودرو به مستأجر عودت خواهد شد.
                  </Text>
                </Text>
              </Text>
            </View>
            <br />
            <View>
              <Text style={styles.paraghraph_title}>ماده شش: تعهدات موجر</Text>
              <Text style={styles.text_with_padding}>
                ۱- موجر متعهد می‌گردد خودرو را به رؤیت مستأجر رسانده و صحیح و
                سالم تحویل ایشان نماید.
              </Text>
              <Text style={styles.text_with_padding}>
                ۲- به مستأجر آموزش‌های لازم را برای استفاده از مورد اجاره دهد.
              </Text>
              <Text style={styles.text_with_padding}>
                ۳- تحویل خودرو با باک بنزین پر به مستأجر
              </Text>
              <Text style={styles.text_with_padding}>
                ۴- هزینه‌های از قبیل لنت، تعویض روغن، تایر، ضد یخ و سایر قطعات
                مصرفی به عهده موجر است.
              </Text>
              <Text style={styles.text_with_padding}>
                ۵- تحویل خودرو در تاریخ و ساعت تعیین‌شده در قرارداد اجاره به
                مستأجر
              </Text>
              <Text style={styles.text_with_padding}>
                ۶- تحویل اصل کارت خودرو و بیمه‌نامه معتبر شخص ثالث به مستأجر
              </Text>
            </View>
            <br />
            <View>
              <Text style={styles.paraghraph_title}>
                ماده هفت: تعهدات مستأجر
              </Text>
              <Text style={styles.text_with_padding}>
                ۱- استرداد خودرو با باک بنزین پر
              </Text>
              <Text style={styles.text_with_padding}>
                ۲- رعایت کلیه قوانین راهنمایی و رانندگی
              </Text>
              <Text style={styles.text_with_padding}>
                ۳- رعایت شئونات اسلامی ازجمله رعایت حجاب در خودرو در تمام مدت
                اجاره توسط مستأجر و سرنشینان الزامی است و در صورت عدم رعایت این
                موارد طبق قانون مسئولیت و خسارت وارده ناشی از توقیف ماشین بر
                عهده مستأجر است.
              </Text>
              <Text style={styles.text_with_padding}>
                ۴- رعایت کلیه موارد متعارف و ایمن در استفاده از خودرو
              </Text>
              <Text style={styles.text_with_padding}>
                ۵- مستأجر هیچ‌گونه حق حمل بار و مسافر را با مورد اجاره نخواهد
                داشت.
              </Text>
              <Text style={styles.text_with_padding}>
                ۶- در صورت بروز هرگونه خرابی مستأجر مکلف است قبل از هرگونه
                اقدامی با موجر تماس برقرار نموده و با هماهنگی ایشان نسبت به حمل
                به تعمیرگاه (با خودروی مخصوص حمل) یا تعمیر در محل اقدام نماید و
                بدون هماهنگی و تائید موجر حق هیچ‌گونه اقدامی را نخواهد داشت.
              </Text>
              <Text style={styles.text_with_padding}>
                ۷- مستأجر شخصاً حق هیچ‌گونه تعمیر و تغییری در خودرو را نخواهد
                داشت.
              </Text>
              <Text style={styles.text_with_padding}>
                ۸- مستأجر متعهد گردید جهت پارک خودرو در شب از پارکینگ استفاده
                نماید و در صورت سرقت و بروز هرگونه خسارتی در خارج از پارکینگ
                مستأجر مسئولیت تام و بی‌قیدوشرط خواهد داشت.
              </Text>
              <Text style={styles.text_with_padding}>
                ۹- مستأجر متعهد گردید که خود شخصاً با خودرو رانندگی نماید.
              </Text>
              <Text style={styles.text_with_padding}>
                ۱۰- در صورت بروز هرگونه تصادف، تخلف و حادثه که مستلزم پیگیری
                اداری و قضائی شود مستأجر مکلف است موجر را در تمام مراحل و تا
                اتمام پیگیری‌ها همراهی نماید و کلیه خسارت و هزینه‌های قضائی و
                اداری را پرداخت نماید.
              </Text>
              <Text style={styles.signature} break>
                <Text>نام و امضای مستأجر</Text>
                <Text>نام و امضای موجر</Text>
              </Text>
              <br />
              <Text style={styles.text_with_padding}>
                ۱۱- مورد اجاره فقط برای استفاده سواری به مستأجر اجاره داده‌شده و
                مستأجر متعهد گردید در صورت کشف هرگونه جرمی از قبیل حمل مواد
                مخدر، مشروبات الکلی و سایر جرائم و تخلفات که منجر به توقیف خودرو
                توسط مقامات قضائی، انتظامی و سایر مراجع ذیصلاح گردد، مسئولیت آن
                بر عهده مستأجر است.
              </Text>
              <Text style={styles.text_with_padding}>
                ۱۲- ستأجر حق واگذاری مورد اجاره و انتقال حق منفعت به غیر را
                به‌هیچ‌عنوان ندارد.
              </Text>
              <Text style={styles.text_with_padding}>
                ۱۳- هرگونه خسارت و آسیب بر عهده مستأجر است، که در صورت خرید بیمه
                اجاره خودرو، هزینه فرانشیزها و استهلاک با مستأجر است.
              </Text>
              <Text style={styles.text_with_padding}>
                ۱۴- در صورت تصادف و خسارت که منجر به افت قیمت ماشین شود، تماماً
                به عهده مستأجر است و بیمه پوشش افت را شامل نمی‌شود.
              </Text>
            </View>
            <br />
            <br />
            <View>
              <Text style={styles.paraghraph_title}>ماده هشت: حل اختلاف</Text>
              <Text style={styles.text}>
                هرگاه در تفسیر یا اجرای مفاد قرارداد بین طرفین آن اختلاف‌نظر پیش
                آید اختلاف بین طرفین ابتدا از طریق مذاکره و تفاهم حل‌وفصل خواهد
                شد و در صورت عدم حصول نتیجه امور قضایی و قانونی مرجع حل اختلاف
                خواهد بود.
              </Text>
              <br />
              <Text style={styles.text}>
                * این قرارداد در هشت ماده در 2 نسخه تنظیم گردید که هرکدام حکم
                واحد دارند.
              </Text>
              <br />
              <Text style={styles.text}>
                این‌جانب
                <Text style={styles.bold_text}>{` ${
                  result.renter.official_name
                    ? result.renter.official_name
                    : dots
                } `}</Text>
                مستأجر قرارداد بارویت خودرو و کسب کلیه آموزش‌های استفاده خودرو
                توسط موجر، خودرو را از ایشان صحیح و سالم تحویل گرفتم.
              </Text>
              <Text style={styles.signature}>
                <Text>نام و امضای مستأجر</Text>
                <Text>نام و امضای موجر</Text>
              </Text>
              <br />
              <Text style={styles.signature}>
                <Text>نام و امضاء شاهد یک </Text>
                <Text>نام و امضاء شاهد دو</Text>
              </Text>
            </View>
            <View>
              <Text style={styles.paraghraph_title}></Text>
              <Text style={styles.text}></Text>
              <Text style={styles.text}></Text>
            </View>
            <View>
              <Text style={styles.paraghraph_title}></Text>
              <Text style={styles.text}></Text>
            </View>
            <View>
              <Text style={styles.paraghraph_title}></Text>
              <Text style={styles.text}></Text>
            </View>
            <View>
              <Text style={styles.paraghraph_title}></Text>
              <Text style={styles.text}></Text>
            </View>

            <Text style={styles.tabsareh_title}></Text>
            <Text style={styles.tabsareh_text}></Text>
          </Page>
        </Document>
      ) : (
        <p>در حال دریافت اطلاعات</p>
      )}
    </>
  );
};

export default Contract;
