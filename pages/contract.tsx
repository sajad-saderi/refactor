import { useEffect } from "react";
import { NextSeo } from "next-seo";
import {
  Page,
  Text,
  View,
  Document,
  StyleSheet,
  Font,
} from "@react-pdf/renderer";
import language from "../public/languages/fa/contract.json";
import iran_sans_m from "../public/fonts/woff/IRANSansWeb_Medium.woff";
import iran_sans_b from "../public/fonts/woff/IRANSansWeb_Bold.woff";
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
  },
  text: {
    textAlign: "justify",
    display: "flex",
    alignItems: "center",
    justifyContent: "flex-start",
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
});

const Contract = () => {
  useEffect(() => {
    window["dataLayer"].push({
      event: "page_view",
      pageURL: window.location.href,
      pagePath: "/evaluation",
      pageTitle: language.next_seo.title,
    });
    // logPageView();
  }, []);
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
      <Document>
        <Page size='A4' style={styles.page}>
          <View>
            <Text style={styles.contract_title}> قرارداد اجاره خودرو</Text>
            <Text style={styles.with_driver}>(بدون راننده)</Text>
            <Text style={styles.date}> تاریخ:</Text>
            <Text style={styles.contract_number}>شماره:</Text>
          </View>
          <View>
            <Text style={styles.paraghraph_title}>
              ماده یک: مشخصات طرفین قرارداد
            </Text>
            <Text style={styles.text}>
              موجر: آقا/خانم..................... اصالتاً/ با وکالت.............
              نام پدر........................به شماره
              ملی........................................ شماره تماس
              ثابت........................ شماره
              همراه....................................... نشانی
              اقامتگاه.............................................................................................
              ...............................................................................................................
            </Text>
            <Text style={styles.text}>
              مستأجر: آقا/خانم.............................. نام
              پدر........................به شماره
              ملی............................... شماره تماس ثابت................
              شماره همراه....................................... نشانی
              اقامتگاه.....................................................................
              شماره گواهینامه رانندگی
              ................................................... تاریخ
              صدور.................................تاریخ اعتبار .......... نوع
              گواهینامه.................................
            </Text>
          </View>
          <View>
            <Text style={styles.paraghraph_title}>
              ماده دو: مشخصات مورد اجاره
            </Text>
            <Text style={styles.text}>
              یک دستگاه اتومبیل‌ سواری....................................... به
              مدل ..................... سیستم سوخت ................... دارای
              .................. سیلندر، به شماره شاسی
              ................................................. شماره
              موتور..................................................................
              رنگ ........................؛ و به شماره پلاک
              ........................................ بیمه‌نامه ثالث به
              شماره.......................................... و تاریخ اعتبار
              ........
            </Text>
            <Text style={styles.text}>
              ارزش مورد اجاره (قیمت کل
              ماشین).........................................................
              ریال
              معادل...............................................................تومان
              است.
            </Text>
          </View>

          <View>
            <Text style={styles.paraghraph_title}>
              ماده سه: مدت اجاره و مسافت
            </Text>
            <Text style={styles.text}>
              مورد اجاره در تاریخ...........................به مدت
              ........................روز و ساعت...............در
              نشانی....................................................................................................................................
              به مستأجر تحویل شد.
            </Text>
            <Text style={styles.text}>
              مستأجر متعهد گردید مورد اجاره را در
              تاریخ........................... و در ساعت................... در
              نشانی فوق به موجر عودت دهد.
            </Text>
            <Text style={styles.text}>
              مستأجر متعهد گردید از مورد اجاره شخصاً و فقط برای سواری و با تعداد
              سرنشین ......... نفر و در شهر/شهرهای........................... و
              با مسافت حداکثر روزانه........................کیلومتر استفاده کند.
              کند و به ازای هر کیلومتر اضافه مبلغ ......................... ریال
              معادل ....................... تومان پرداخت کند.
            </Text>
            <Text style={styles.text}>
              کیلومتر خودرو در زمان تحویل: ..................................
              کیلومتر
            </Text>
            <Text style={styles.signature}>
              <Text>نام و امضای مستأجر</Text>
              <Text>نام و امضای موجر</Text>
            </Text>
          </View>
          <View>
            <Text style={styles.tabsareh_title}>تبصره یک:</Text>
            <Text style={styles.tabsareh_text}>
              در صورت تمایل مستأجر به اقاله (فسخ) قرارداد پیش از اتمام مدت اجاره
              بایستی حداقل 12 ساعت قبل از اتمام مدت قرارداد به موجر اطلاع داده و
              در صورت موافقت موجر برای اقاله، پس از کسر.........درصد از مبلغ
              باقیمانده قرارداد و مبلغ.................................. ریال
              بابت سایر هزینه‌ها، باقیمانده مبلغ به مستأجر مسترد خواهد شد.
            </Text>
          </View>
          <View>
            <Text style={styles.paraghraph_title}>
              ماده چهار: اجاره بهاء و نحوه پرداخت
            </Text>
            <Text style={styles.text}>
              اجاره خودرو از قرار روزی..............................ریال
              معادل.................................تومان برای................
              روز جمعاً به مبلغ.....................ریال معادل ................
              تومان است که مستأجر آن را در وب‌سایت سپریس (اجاره آنلاین خودرو)
              پرداخت کرده است.
            </Text>
            <Text style={styles.text}>
              مبلغ بیمه اجاره خودرو ..........ریال معادل ....... تومان به مدت
              ...... روز است که مستاجر آن را در وب‌سایت سپریس (اجاره آنلاین
              خودرو) پرداخت کرده است.
            </Text>
            <Text style={styles.tabsareh_title}>تبصره دو: </Text>
            <Text style={styles.tabsareh_text}>
              در صورت دیرکرد مستأجر در عودت خودرو بایستی به ازای هر ساعت تأخیر
              در تحویل مبلغ.................. ریال بابت خسارت تأخیر در تحویل،
              نقداً علاوه بر اجاره بهاء مازاد به موجر پرداخت نماید و تأخیر بیشتر
              از ۶ ساعت معادل یک روز اجاره در نظر گرفته می‌شود.
            </Text>
            <Text style={styles.text}>
              در صورت عدم پرداخت، موجر می‌تواند از مبلغ ضمانت بدون هیچ‌گونه قیدی
              مبلغ خسارت دیرکرد، اجاره بهاء مازاد و سایر هزینه‌ها را کسر نماید و
              در صورت عدم تکافوی مبلغ فوق، موجر حق دارد چک ضمانت را نقد نموده و
              پس از کسر خسارت دیرکرد، مازاد اجاره بهاء سایر هزینه‌ها باقیمانده
              را به مستأجر مسترد نماید و مستأجر حق هیچ‌گونه اعتراضی را نخواهد
              داشت.
            </Text>
            <Text style={styles.tabsareh_title}>تبصره سه: </Text>
            <Text style={styles.tabsareh_text}>
              در صورت درخواست مستأجر برای تمدید مدت اجاره بایستی{" "}
            </Text>
            <Text style={styles.tabsareh_title}>حداقل 12 ساعت </Text>
            <Text style={styles.tabsareh_text}>
              قبل از اتمام مدت اجاره به موجر اطلاع داده و در صورت موافقت موجر با
              تمدید، کل مبلغ مدت تمدیدی را در سایت سپریس واریز نماید. در صورت
              عدم موافقت موجر با تمدید یا در صورت موافقت و عدم واریز مبلغ مدت
              تمدیدی، قرارداد اجاره منفسخ گردیده و مستأجر در صورت عدم عودت خودرو
              در پایان مدت قرارداد اجاره مسئول تمام خسارات خواهد بود.
            </Text>
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
          <View>
            <Text style={styles.paraghraph_title}></Text>
            <Text style={styles.text}></Text>
          </View>

          <Text style={styles.tabsareh_title}></Text>
          <Text style={styles.tabsareh_text}></Text>
        </Page>
      </Document>
    </>
  );
};

export default Contract;
