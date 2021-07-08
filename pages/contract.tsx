import { useState, useRef, useEffect, useContext } from "react";
import dynamic from "next/dynamic";
import { GET_ORDER_REQUEST } from "../src/API";
const Generate_pdf = dynamic(
  () => import("../src/components/contract/generate_pdf"),
  { ssr: false }
);

import language from "../public/languages/fa/contract.json";
import jsCookie from "js-cookie";
import { useRouter } from "next/router";
import context_user from "../src/context/User_info";
import { guard_controller } from "../utils/guard_controller";
import moment from "moment-jalaali";
import NumbersAndCurrencyUnit from "../utils/NumbersAndCurrencyUnit";

const token = jsCookie.get("token");

const Contract_page = () => {
  const [show_download, set_show_download] = useState(false);
  const [dots, set_dots] = useState(
    "............................................"
  );
  const [result, setResult] = useState(null);

  const user_info = useContext(context_user);
  const router = useRouter();
  const html_ref = useRef(null);

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

  return result ? (
    <div>
      <Generate_pdf html={html_ref} />
      <div className='content' ref={html_ref}>
        <h1> قرارداد اجاره خودرو</h1>
        <h2>
          {result.rent_search_dump.with_driver
            ? "(بدون راننده)"
            : "(با راننده)"}
        </h2>
        <p id='contract_date'>
          تاریخ:{` `}
          {moment().format("jYYYY/jMM/jDD")}
        </p>
        <p id='contract_number'>
          شماره:{` ${result.id} - ${moment().format(" jMM - jYY")}`}
        </p>
        <div id='page_1'>
          <p>ماده یک: مشخصات طرفین قرارداد</p>
          <p>
            موجر: آقا/خانم
            {` ${
              result.rent_search_dump.owner.official_name
                ? result.rent_search_dump.owner.official_name
                : dots
            } `}
            {result.rent_search_dump.owner.lawyer_name
              ? `اصالتاً/ با وکالت ${result.rent_search_dump.owner.lawyer_name}‍‍‍‍‍`
              : null}
            نام پدر
            {` ${
              result.rent_search_dump.owner.official_fathers_name
                ? result.rent_search_dump.owner.official_fathers_name
                : dots
            } `}
            به شماره ملی
            {` ${
              result.rent_search_dump.owner.national_id
                ? result.rent_search_dump.owner.national_id
                : dots
            } `}
            شماره تماس ثابت
            {` ${
              result.rent_search_dump.owner.fixed_phone
                ? result.rent_search_dump.owner.fixed_phone
                : dots
            } `}
            شماره همراه
            {` ${
              result.rent_search_dump.owner.cell
                ? "0" + result.rent_search_dump.owner.cell
                : dots
            } `}
            نشانی اقامتگاه
            {` ${
              result.rent_search_dump.owner.address
                ? result.rent_search_dump.owner.address
                : dots
            } `}
          </p>
          <p>
            مستأجر: آقا/خانم
            {` ${
              result.renter.official_name ? result.renter.official_name : dots
            } `}
            نام پدر
            {` ${
              result.renter.official_fathers_name
                ? result.renter.official_fathers_name
                : dots
            } `}
            به شماره ملی
            {` ${
              result.renter.national_id ? result.renter.national_id : dots
            } `}
            شماره تماس ثابت
            {` ${
              result.renter.fixed_phone ? result.renter.fixed_phone : dots
            } `}
            شماره همراه
            {` ${result.renter.cell ? "0" + result.renter.cell : dots} `}
            نشانی اقامتگاه
            {` ${result.renter.address ? result.renter.address : dots} `}
            شماره گواهینامه رانندگی
            {` ${
              result.renter.driving_license
                ? result.renter.driving_license
                : dots
            } `}
            تاریخ صدور
            {` ${
              result.renter.driving_license_issue_date.name.fa
                ? result.renter.driving_license_issue_date.name.fa
                : dots
            } `}
            تاریخ اعتبار
            {` ${
              result.renter.driving_license_expiration_date.name.fa
                ? result.renter.driving_license_expiration_date.name.fa
                : dots
            } `}
            نوع گواهینامه
            {` ${
              result.renter.driving_license_type.name.fa
                ? result.renter.driving_license_type.name.fa
                : dots
            } `}
          </p>
          <p>ماده دو: مشخصات مورد اجاره</p>
          <p>
            یک دستگاه اتومبیل‌ سواری
            {` ${
              result.rent_search_dump.car.name.fa
                ? result.rent_search_dump.car.name.fa
                : dots
            } `}
            به مدل
            {` ${
              result.rent_search_dump.year.name.fa
                ? result.rent_search_dump.year.name.fa
                : dots
            } `}
            سیستم سوخت
            {` ${
              result.rent_search_dump.fuel
                ? result.rent_search_dump.fuel.name.fa
                : dots
            } `}
            دارای
            {` ${
              result.rent_search_dump.cylinder.name.fa
                ? result.rent_search_dump.cylinder.name.fa
                : dots
            } `}
            به شماره شاسی
            {` ${
              result.rent_search_dump.vin ? result.rent_search_dump.vin : dots
            }`}
            شماره موتور
            {` ${
              result.rent_search_dump.engine_id
                ? result.rent_search_dump.engine_id
                : dots
            }`}
            رنگ
            {` ${
              result.rent_search_dump.color.name.fa
                ? result.rent_search_dump.color.name.fa
                : dots
            }، `}
            و به شماره پلاک
            {result.rent_search_dump.registration_plate_forth_part
              ? ` ${result.rent_search_dump.registration_plate_forth_part} | ${result.rent_search_dump.registration_plate_third_part} ${result.rent_search_dump.registration_plate_second_part} ${result.rent_search_dump.registration_plate_first_part} `
              : dots}
            بیمه‌نامه ثالث به شماره
            {` ${
              result.rent_search_dump.third_party_insurance_id
                ? result.rent_search_dump.third_party_insurance_id
                : dots
            } `}
            و تاریخ اعتبار
            {` ${
              result.rent_search_dump.third_party_insurance_expiration_date
                ? result.rent_search_dump.third_party_insurance_expiration_date
                    .name.fa
                : dots
            } `}
            ارزش مورد اجاره -قیمت کل ماشین-
            {` ${(result.rent_search_dump.value * 10).toLocaleString()} `}
            ریال معادل
            {` ${NumbersAndCurrencyUnit({
              value: result.rent_search_dump.value,
            })} `}
            تومان است
          </p>
          <p>ماده سه: مدت اجاره و مسافت</p>
          <p>
            مورد اجاره در تاریخ
            {` ${result.rent_search_dump.start_date} `}
            به مدت
            {` ${result.rent_search_dump.no_of_days} `}
            روز و در ساعت{` ${result.rent_search_dump.no_of_days} `}در
            {` ${
              result.delivery_time.name.fa ? result.delivery_time.name.fa : dots
            } `}
            نشانی
            {` ${result.delivery_address ? result.delivery_address : dots} `}
            به مستأجر تحویل شد. مستأجر متعهد گردید مورد اجاره را در تاریخ
            {` ${result.rent_search_dump.end_date} `}و در ساعت
            {` ${
              result.return_time.name.fa ? result.return_time.name.fa : dots
            } `}
            در نشانی فوق به موجر عودت دهد. مستأجر متعهد گردید از مورد اجاره
            شخصاً و فقط برای سواری و با تعداد سرنشین
            {`${result.rent_search_dump.car.capacity} `}
            نفر و در شهر/شهرهای
            {` ${result.destinations ? result.destinations : dots} `}و با مسافت
            حداکثر روزانه
            {` ${result.rent_search_dump.max_km_per_day} `}
            کیلومتر استفاده کند. کند و به ازای هر کیلومتر اضافه مبلغ
            {` ${(
              result.rent_search_dump.extra_km_price * 10
            ).toLocaleString()} `}
            ریال معادل
            {` ${result.rent_search_dump.extra_km_price_name} `}
            پرداخت کند
          </p>
          <p>
            کیلومتر خودرو در زمان تحویل: ..................................
            کیلومتر
          </p>
        </div>
        <span id='signature_1_renter'>نام و امضای مستأجر</span>
        <span id='signature_1_owner'>نام و امضای موجر</span>
        <div id='page_2'>
          {/* <p>
            تبصره یک:در صورت تمایل مستأجر به اقاله -فسخ- قرارداد پیش از اتمام
            مدت اجاره بایستی حداقل ۱۲ ساعت قبل از اتمام مدت قرارداد به موجر
            اطلاع داده و در صورت موافقت موجر برای اقاله، پس از کسر.........درصد
            از مبلغ باقیمانده قرارداد و مبلغ..................................
            ریال بابت سایر هزینه‌ها، باقیمانده مبلغ به مستأجر مسترد خواهد شد.
          </p> */}
          <p>ماده چهار: اجاره بهاء و نحوه پرداخت</p>
          <p>
            اجاره خودرو از قرار روزی
            {` ${(
              result.rent_search_dump.avg_price_per_day * 10
            ).toLocaleString()} `}
            ریال معادل
            {` ${result.rent_search_dump.avg_price_per_day_name} `}
            برای
            {` ${result.rent_search_dump.no_of_days} `}
            روز جمعاً به مبلغ
            {` ${(result.rent_search_dump.total_price * 10).toLocaleString()} `}
            ریال معادل
            {` ${result.rent_search_dump.total_price_name} `}
            است که مستأجر آن را در وب‌سایت سپریس -اجاره آنلاین خودرو- پرداخت
            کرده است
          </p>
          {result.has_insurance ? (
            <p>
              مبلغ بیمه اجاره خودرو
              {` ${(
                result.rent_search_dump.insurance_total_price * 10
              ).toLocaleString()} `}
              ریال معادل
              {` ${result.rent_search_dump.insurance_total_price_name} `}
              به مدت
              {` ${result.rent_search_dump.no_of_days} `}
              روز است که مستاجر آن را در وب‌سایت سپریس -اجاره آنلاین خودرو-
              پرداخت کرده است
            </p>
          ) : null}
          <p>
            تبصره دو: در صورت دیرکرد مستأجر در عودت خودرو بایستی به ازای هر ساعت
            تأخیر در تحویل مبلغ
            {` ${(
              result.rent_search_dump.extra_hour_price * 10
            ).toLocaleString()} `}
            ریال معادل
            {` ${result.rent_search_dump.extra_hour_price_name} `}
            بابت خسارت تأخیر در تحویل ، نقداً علاوه بر اجاره بهاء مازاد به موجر
            پرداخت نماید و تأخیر بیشتر از ۶ ساعت معادل یک روز اجاره در نظر گرفته
            می‌شود
          </p>
          <p>
            در صورت عدم پرداخت ، موجر می‌تواند از مبلغ ضمانت بدون هیچ‌گونه قیدی
            مبلغ خسارت دیرکرد، اجاره بهاء مازاد و سایر هزینه‌ها را کسر نماید و
            در صورت عدم تکافوی مبلغ فوق ، موجر حق دارد چک ضمانت را نقد نموده و
            پس از کسر خسارت دیرکرد، مازاد اجاره بهاء سایر هزینه‌ها باقیمانده را
            به مستأجر مسترد نماید و مستأجر حق هیچ‌گونه اعتراضی را نخواهد داشت
          </p>

          <p>
            تبصره سه: در صورت درخواست مستأجر برای تمدید مدت اجاره بایستی حداقل
            ۱۲ ساعت قبل از اتمام مدت اجاره به موجر اطلاع داده و در صورت موافقت
            موجر با تمدید، کل مبلغ مدت تمدیدی را در سایت سپریس واریز نماید. در
            صورت عدم موافقت موجر با تمدید یا در صورت موافقت و عدم واریز مبلغ مدت
            تمدیدی ، قرارداد اجاره منفسخ گردیده و مستأجر در صورت عدم عودت خودرو
            در پایان مدت قرارداد اجاره مسئول تمام خسارات خواهد بود
          </p>

          <p>ماده پنج: تضامین مستأجر</p>
          <p>
            یک- مستأجر متعهد گردید که علاوه بر اجاره بهاء مبلغ
            {` ${(result.cash_deposit * 10).toLocaleString()} `}
            ریال معادل
            {` ${NumbersAndCurrencyUnit({
              value: result.cash_deposit,
            })} `}
            تومان بابت تضمین جرائم احتمالی راهنمایی و رانندگی و سایر هزینه‌ها
            مانند اضافه کیلومتر، بنزین و خسارات احتمالی خودرو که در مدت اجاره
            توسط مستأجر یا ثالث به وجود آمده، هم‌زمان با امضای قرارداد اجاره به
            شماره کارت
            {` ${result.rent_search_dump.owner.bank_account_id} `}
            بانک
            {` ${result.rent_search_dump.owner.bank_name} `}
            به نام
            {` ${result.rent_search_dump.owner.official_name} `} و مبلغ
            {` ${(result.deposit.name.fa * 10).toLocaleString()} `}
            ریال معادل
            {` ${NumbersAndCurrencyUnit({
              value: result.deposit.name.fa,
            })} `}
            تومان به شماره کارت
            {` ${
              result.system_representative_bacnk_account_id
                ? result.system_representative_bacnk_account_id
                : dots
            } `}
            –
            {` ${
              result.system_representative_bacnk_name
                ? result.system_representative_bacnk_name
                : dots
            } `}
            به نام
            {` ${
              result.system_representative_name
                ? result.system_representative_name
                : dots
            } `}
            -نزد شرکت سپریس- واریز نماید.
            {/* </p> */}
            {/* <p > */} مبلغ
            {` ${(
              (result.cash_deposit - result.deposit.name.fa) *
              10
            ).toLocaleString()} `}
            معادل
            {` ${NumbersAndCurrencyUnit({
              value: result.cash_deposit - result.deposit.name.fa,
            })} `}
            تومان بعد از تحویل خودرو پس از کسر جرائم مشخص‌شده به مستأجر مسترد
            خواهد شد و مبلغ
            {` ${(result.deposit.name.fa * 10).toLocaleString()} `}
            ریال معادل
            {` ${NumbersAndCurrencyUnit({
              value: result.deposit.name.fa,
            })} `}
            تومان باقیمانده پس از اخذ خلافی خودرو توسط موجر و پس از کسر جرائم
            راهنمایی و رانندگی در مدت اجاره و سایر هزینه‌های مربوط به آن و پس از
            ۲۰ روز کاری - مورخه
            {` ${result.deposit_return_date.name.fa} `} به شماره کارت
            {` ${result.renter.bank_account_id} `} بانک
            {` ${result.renter.bank_name} `}
            به نام
            {` ${result.renter.official_name} `}
            واریز خواهد شد
          </p>
        </div>
        <span id='signature_2_renter'>نام و امضای مستأجر</span>
        <span id='signature_2_owner'>نام و امضای موجر</span>
        <div id='page_3'>
          <p>
            دو- چک به شماره
            {` ${
              result.deposit_document_id ? result.deposit_document_id : dots
            } `}
            بانک
            {` ${result.deposit_bank ? result.deposit_bank : dots} `}
            به ‌نام
            {` ${
              result.deposit_person_name ? result.deposit_person_name : dots
            } `}
            به مبلغ
            {` ${(result.rent_search_dump.value * 10).toLocaleString()} `}
            ریال معادل
            {` ${NumbersAndCurrencyUnit({
              value: result.rent_search_dump.value,
            })} `}
            تومان بابت تضمین خسارات وارده به خودرو، مازاد اجاره بهاء، جرائم
            رانندگی ، تعمیرات و سایر هزینه‌ها و تخلفات و جرائم توسط مستأجر در
            هنگام امضای قرارداد به موجر تحویل شد. مستأجر ضمن این قرارداد به موجر
            اذن داد در صورت هرگونه تخلف از این قرارداد نسبت به نقد کردن چک فوق و
            کسر هزینه‌ها و جرائم و تخلفات ایجادشده در مدت اجاره ، باقی مبلغ را
            به مستأجر مسترد نماید
            <br />
            در صورت عدم تخلف و عدم بروز اختلاف بین موجر و مستأجر، چک فوق در روز
            تحویل -برگشت- خودرو به مستأجر عودت خواهد شد
          </p>
          <p>ماده شش: تعهدات موجر</p>
          <p>
            یک- موجر متعهد می‌گردد خودرو را به رؤیت مستأجر رسانده و صحیح و سالم
            تحویل ایشان نماید
            <br />
            دو- به مستأجر آموزش‌های لازم را برای استفاده از مورد اجاره دهد
            <br />
            سه- تحویل خودرو با باک بنزین پر به مستأجر
            <br />
            چهار- هزینه‌های از قبیل لنت ، تعویض روغن ، تایر، ضد یخ و سایر قطعات
            مصرفی به عهده موجر است
            <br />
            پنچ- تحویل خودرو در تاریخ و ساعت تعیین‌شده در قرارداد اجاره به
            مستأجر
            <br />
            شش- تحویل اصل کارت خودرو و بیمه‌نامه معتبر شخص ثالث به مستأجر
          </p>

          <p>ماده هفت: تعهدات مستأجر</p>
          <p>
            یک- استرداد خودرو با باک بنزین پر <br />
            دو- رعایت کلیه قوانین راهنمایی و رانندگی <br />
            سه- رعایت شئونات اسلامی ازجمله رعایت حجاب در خودرو در تمام مدت اجاره
            توسط مستأجر و سرنشینان الزامی است و در صورت عدم رعایت این موارد طبق
            قانون مسئولیت و خسارت وارده ناشی از توقیف ماشین بر عهده مستأجر است
            <br />
            چهار- رعایت کلیه موارد متعارف و ایمن در استفاده از خودرو <br />
            پنج- مستأجر هیچ‌گونه حق حمل بار و مسافر را با مورد اجاره نخواهد داشت
            <br />
            شش- در صورت بروز هرگونه خرابی مستأجر مکلف است قبل از هرگونه اقدامی
            با موجر تماس برقرار نموده و با هماهنگی ایشان نسبت به حمل به تعمیرگاه
            -با خودروی مخصوص حمل- یا تعمیر در محل اقدام نماید و بدون هماهنگی و
            تائید موجر حق هیچ‌گونه اقدامی را نخواهد داشت
            <br />
            هفت- مستأجر شخصاً حق هیچ‌گونه تعمیر و تغییری در خودرو را نخواهد داشت
            <br />
            هشت- مستأجر متعهد گردید جهت پارک خودرو در شب از پارکینگ استفاده
            نماید و در صورت سرقت و بروز هرگونه خسارتی در خارج از پارکینگ مستأجر
            مسئولیت تام و بی‌قیدوشرط خواهد داشت
          </p>
        </div>
        <span id='signature_3_renter'>نام و امضای مستأجر</span>
        <span id='signature_3_owner'>نام و امضای موجر</span>
        <div id='page_4'>
          <p>
            نه- مستأجر متعهد گردید که خود شخصاً با خودرو رانندگی نماید
            <br />
            ده- در صورت بروز هرگونه تصادف ، تخلف و حادثه که مستلزم پیگیری اداری
            و قضائی شود مستأجر مکلف است موجر را در تمام مراحل و تا اتمام
            پیگیری‌ها همراهی نماید و کلیه خسارت و هزینه‌های قضائی و اداری را
            پرداخت نماید
            <br />
            یازده- مورد اجاره فقط برای استفاده سواری به مستأجر اجاره داده‌شده و
            مستأجر متعهد گردید در صورت کشف هرگونه جرمی از قبیل حمل مواد مخدر،
            مشروبات الکلی و سایر جرائم و تخلفات که منجر به توقیف خودرو توسط
            مقامات قضائی ، انتظامی و سایر مراجع ذیصلاح گردد، مسئولیت آن بر عهده
            مستأجر است
            <br />
            دوازده- ستأجر حق واگذاری مورد اجاره و انتقال حق منفعت به غیر را
            به‌هیچ‌عنوان ندارد
            <br />
            سیزده- هرگونه خسارت و آسیب بر عهده مستأجر است، که در صورت خرید بیمه
            اجاره خودرو، هزینه فرانشیزها و استهلاک با مستأجر است
            <br />
            چهارده- در صورت تصادف و خسارت که منجر به افت قیمت ماشین شود، تماماً
            به عهده مستأجر است و بیمه پوشش افت را شامل نمی‌شود
          </p>
          <p>ماده هشت: حل اختلاف</p>
          <p>
            هرگاه در تفسیر یا اجرای مفاد قرارداد بین طرفین آن اختلاف‌نظر پیش آید
            اختلاف بین طرفین ابتدا از طریق مذاکره و تفاهم حل‌وفصل خواهد شد و در
            صورت عدم حصول نتیجه امور قضایی و قانونی مرجع حل اختلاف خواهد بود
          </p>
          <p>
            این قرارداد در هشت ماده در 2 نسخه تنظیم گردید که هرکدام حکم واحد
            دارند *
          </p>
          <p>
            این‌جانب
            {` ${
              result.renter.official_name ? result.renter.official_name : dots
            } `}
            مستأجر قرارداد بارویت خودرو و کسب کلیه آموزش‌های استفاده خودرو توسط
            موجر،خودرو را از ایشان صحیح و سالم تحویل گرفتم
          </p>
        </div>
        <span id='signature_4_renter'>نام و امضای مستأجر</span>
        <span id='signature_4_owner'>نام و امضای موجر</span>

        <p>
          <p id='witness_1'>نام و امضاء شاهد یک </p>
          <p id='witness_2'>نام و امضاء شاهد دو</p>
        </p>
      </div>
    </div>
  ) : null;
};

export default Contract_page;
