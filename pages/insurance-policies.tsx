import React from "react";
import Layout from "../src/Layout";
import { NextSeo } from "next-seo";

const InsurancePolicies = () => {
  return (
    <Layout showToTop={true}>
      <NextSeo
        title="بیمه | اجاره آسان خودرو"
        description="پوشش بیمه برای اجاره خودرو در اتولی نیز یکی از سرمایه‌گذاری‌های ما برای جبران خطرات و خسارات احتمالی است که متوجه اجاره‌گیرنده ماشین خواهند بود."
        openGraph={{
          title: "بیمه | اجاره آسان خودرو",
          description:
            "پوشش بیمه برای اجاره خودرو در اتولی نیز یکی از سرمایه‌گذاری‌های ما برای جبران خطرات و خسارات احتمالی است که متوجه اجاره‌گیرنده ماشین خواهند بود.",
          site_name: "اتولی",
        }}
        twitter={{
          handle: "@otoli_net",
          site: "@otoli_net",
          cardType: "summary_large_image",
        }}
      />
      {/* Most of the static pages have a same class named 'static_pages' which set some common style for the main wrapper box*/}
      <section className="responsive static_pages minHeight">
        <h1>بیمه</h1>
        <p>
          شرکت‌های بیمه سعی دارند میزان ریسک روزمره زندگی را به کم‌ترین حد خود
          برسانند. همه ما با انتخاب پوشش‌های بیمه در موارد مختلف، سعی داریم تا
          برای خطرات و اتفاقات احتمالی آینده سرمایه‌گذاری کنیم تا کمترین خسارت
          را در زندگی متحمل شویم. پوشش بیمه برای اجاره خودرو در اتولی نیز یکی از
          سرمایه‌گذاری‌های ما برای جبران خطرات و خسارات احتمالی است که متوجه
          اجاره‌گیرنده ماشین خواهند بود.
        </p>
        <p>
          <strong>
            <u>
              در رسیدگی و پرداخت خسارت، شرایط زیر در نظر گرفته شده و اعمال
              می‌شود. موارد ذکر شده را به دقت مطالعه کنید و مدنظر قرار دهید.
            </u>
          </strong>
        </p>
        <h2>
          <u>پوشش‌ها</u>
        </h2>
        <p>
          حوادث تحت پوشش خواه اتومبيل در حال حرکت باشد يا در حال توقف عبارتند از
          :
        </p>
        <ul>
          سرقت کلی: سرقت كلي اتومبيل و همچنین خسارت ناشی از شروع به دزدی جزء
          خطرات اصلي بيمه‌ی بدنه است.
          <li>
            آتش سوزي: خساراتی که در اثر آتش سوزی، صاعقه یا انفجار به اتومبیل و
            یا لوازم یدکی و اصلی همراه آن وارد گردد. 
          </li>
          <li>
            تصادف: خسارت‌های وارد شده به اتومبیل در صورتي مشمول بيمه است كه در
            نتيجه‌ی تقصير يا قصور راننده اتومبيل بيمه شده باشد؛ در غير اين صورت،
            جبران آن بر عهده وارد كننده خسارت است که مشمول بیمه نامه شخص ثالث
            اتومبیل می‌شود.
          </li>
          <li>رنگ، اسید و مواد شیمیایی</li>
          <li>بلایای طبیعی</li>
        </ul>
        <h2>اصطلاحات</h2>
        <p>
          اصطلاحات زیر صرف‌نظر از هر معنی و مفهوم دیگری که ممکن است داشته باشند
          در این شرایط عمومی با تعریف مقابل آن به کار رفته است:
        </p>
        <p>
          <strong>بیمه‌گر: </strong>شرکت بیمه‌ای است که مشخصات آن در بیمه‌نامه
          درج گردیده و در ازای دریافت حق بیمه، جبران خسارت احتمالی را طبق شرایط
          این بیمه‌نامه به عهده می‌گیرد.
        </p>
        <p>
          <strong>بیمه‌گزار: </strong>شخص حقیقی یا حقوقی که مالک موضوع بیمه‌ است
          یا به یکی از عناوین قانونی، نمایندگی مالک یا ذینفع را داشته یا مسئولیت
          حفظ بیمه را از طرف مالک دارد و قرارداد بیمه را با بیمه‌گر منعقد می‌کند
          و متعهد پرداخت حق بیمه آن است.
        </p>
        <p>
          <strong>ذینفع: </strong>شخصی است که بنا به درخواست بیمه‌گزار نام وی در
          بیمه‌نامه درج گردیده است و تمام یا بخشی از خسارت به وی پرداخت می‌شود.
        </p>
        <p>
          <strong>حق بیمه: </strong>مبلغی است که در بیمه‌نامه مشخص شده و
          بیمه‌گزار موظف است آن را هنگام صدور بیمه‌نامه یا به ترتیبی که در
          بیمه‌نامه مشخص می‌شود به بیمه‌گر پرداخت نماید.
        </p>
        <p>
          <strong>موضوع بیمه: </strong>وسیله نقلیه زمینی است که مشخصات آن در
          بیمه‌نامه درج شده است. لوازمی که مطابق کاتالوک وسیله نقلیه بیمه شده به
          خریدار تحویل و یا در بیمه‌نامه درج شده است نیز جزو موضوع بیمه محسوب
          می‌شود.
        </p>
        <p>
          <strong>فرانشیز: </strong>بخشی از هر خسارت است که به عهده بیمه‌گزار
          است و میزان آن در بیمه‌نامه مشخص می‌گردد.
        </p>
        <p>
          <strong>مدت اعتبار بیمه‌نامه: </strong>شروع و پایان مدت اعتبار
          بیمه‌نامه به ترتیبی خواهد بود که در بیمه‌نامه معین می‌گردد.
        </p>
        <h2>
          <u>خسارت‌ها و هزینه‌های تحت پوشش</u>
        </h2>
        <h3>خسارت‌های تحت پوشش</h3>
        <p>
          جبران خسارت‌های وارده به موضوع بیمه و هزینه‌های مربوط، به شرح زیر در
          تعهد بیمه‌گر خواهد بود:
        </p>
        <ul>
          <li>
            خسارتی که ناشی از برخورد موضوع بیمه به یک جسم ثابت یا متحرک و یا
            برخورد اجسام دیگر به موضوع بیمه و یا واژگونی و سقوط موضوع بیمه باشد
            و چناچه در حین حرکت، اجزا و یا محمولات موضوع بیمه به آن برخورد نماید
            و موجب بروز خسارت شود.
          </li>
          <li>
            خسارتی که در اثر آتش‌سوزی، صاعقه و یا انفجار به موضوع بیمه و یا
            لوازم یدکی اصلی همراه آن وارد گردد.
          </li>
          <li>
            در صورتی که موضوع بیمه دزدیده شود و یا در اثر عمل دزدی یا شروع به
            دزدی به وسیله نقلیه و یا وسایل اضافی آن که در بیمه‌نامه درج شده است
            خسارت وارد شود.
          </li>
          <li>
            خسارتی که در جریان نجات و یا انتقال موضوع بیمه خسارت دیده به آن وارد
            شود.
          </li>
          <li>
            خسارت باطری و لاستیک‌های چرخ موضوع بیمه در اثر هریک از خطرات بیمه
            شده تا پنجاه درصد قیمت نو قابل پرداخت است.
          </li>
        </ul>
        <h3>هزینه‌های قابل تامین</h3>
        <p>
          هزینه‌های متعارفی که بیمه‌گزار برای نجات موضوع بیمه‌ی خسارت‌دیده و
          جلوگیری از توسعه خسارت و نیز انتقال موضوع بیمه‌ی خسارت‌دیده به
          نزدیک‌ترین محل مناسب برای تعمیر آن پرداخت می‌نماید، حداکثر تا بیست
          درصد کل خسارت‌ وارده قابل جبران خواهد بود.
        </p>
        <h2>
          <u>خسارت‌های مستثنا شده و یا غیرقابل جبران</u>
        </h2>
        <h3>خسارت‌های مستثنا شده</h3>
        <p>
          خسارت‌های زیر تحت پوشش بیمه‌نامه نیست مگر آنکه در بیمه‌نامه یا الحاقیه
          آن به نحو دیگری توافق شده باشد:
        </p>
        <ul>
          <li>
            خسارت‌هایی که به علت استفاده از موضوع بیمه در مسابقه‌ اتومبیل‌رانی
            یا آزمایش سرعت به آن وارد شود.
          </li>
          <li>
            خسارت‌های وارده به موضوع بیمه به علت حمل مواد منفجره، سریع‌الاشتعال
            و یا اسیدی مگر آنکه موضوع بیمه مخصوص حمل آن باشد.
          </li>
          <li>
            خسارت‌های ناشی از سرقت لوازم و قطعات موضوع بیمه پس از وقوع حادثه
          </li>
          <li>خسارت ناشی از کشیدن میخ و سایر اشیا مشابه روی بدنه موضوع بیمه</li>
          <li>کاهش ارزش موضوع بیمه حتی اگر در اثر وقوع خطرات بیمه‌شده باشد</li>
          <li>
            زیان ناشی از عدم امکان استفاده از موضوع بیمه حادثه‌دیده به علت تحقق
            خطرات تحت پوشش بیمه‌نامه
          </li>
        </ul>
        <h3>خسارت‌های غبرقابل جبران</h3>
        <p>در موارد زیر جبران خسارت در تعهد بیمه‌گر نخواهد بود:</p>
        <ul>
          <li>خسارت‌های ناشی از جنگ، شورش، اعتصاب و یا تهاجم</li>
          <li>خسارت‌های مستقیم و غیرمستقیم ناشی از انفجارهای هسته‌ای</li>
          <li>
            خسارت‌هایی که عمدا توسط بیمه‌گزار، ذینفع و یا راننده موضوع بیمه به
            آن وارد می‌شود.
          </li>
          <li>
            خسارت‌های وارده به موضوع بیمه حین گریز از تعقیب مقامات انتظامی مگر
            آنکه عمل گریز توسط متصرفین غیرقانونی باشد.
          </li>
          <li>
            در صورتی که راننده موضوع بیمه هنگام وقوع حادثه فاقد گواهینامه
            رانندگی باشد با گواهینامه رانندگی وی باطل شده باشد و یا مطابق مقررات
            راهنمایی و رانندگی گواهینامه راننده برای رانندگی موضوع بیمه متناسب
            نباشد. توجه: اتمام اعتبار در حکم بطلان آن نیست.
          </li>
          <li>
            خسارت‌های ناشی از حوادثی که طبق گزارش مقامات ذی‌صلاح به علت مصرف
            مشروبات الکی و یا استعمال موادمخدر یا روان‌گردان توسط راننده موضوع
            بیمه به وجود آمده باشد.
          </li>
          <li>
            خسارت ناشی از بکسل کردن وسیله نقلیه دیگر مگر آنکه موضوع بیمه مخصوص و
            مجاز به انجام این کار باشد و اصول و مقررات ایمنی را رعایت کرده باشد.
          </li>
          <li>
            خسارت‌های وارده به وسایل و دستگاه‌های الکتریکی و الکترونیکی موضوع
            بیمه در صورتی که ناشی از نقض و خرابی در کارکرد آن‌ها باشد.
          </li>
          <li>
            خسارت‌هایی که به علت حمل بار بیش از حد مجاز توسط موضوع بیمه به آن
            وارد شود.
          </li>
        </ul>
        <h2>
          <u>وظایف و تعهدات بیمه‌گزار</u>
        </h2>
        <h3>رعایت اصل حد اعلای حسن نیت</h3>
        <p>
          بیمه‌گزار مکلف است پرسش‌های کتبی بیمه‌گر را با دقت و صداقت و به طور
          کامل پاسخ دهد. هرگاه بیمه‌گزار در پاسخ به پرسش‌های بیمه‌گر عمدا از
          اظهار مطلبی خودداری و یا اظهار خلاف واقع بنماید، به نحوی که مطالب
          اظهار نشده و یا اظهارات خلاف واقع، موضوع خطر را تغییر دهد و یا از
          اهمیت آن در نظر بیمه‌گر بکاهد، قرارداد بیمه از تاریخ انعقاد باطل و
          بلااثر خواهد بود حتی اگر مطلبی که کتمان شده یا برخلاف واقع اظهار شده
          است هیچگونه تاثیری در وقوع حادثه نداشته باشد. در این‌ صورت وجوه
          پرداختی بیمه‌گزار به وی مسترد نخواهد شد.
        </p>
        <h3>اعلام خسارت</h3>
        <p>
          بیمه‌گزار موظف است حداکثر ظرف پنج روز کاری از تاریخ اطلاع خود از وقوع
          حادثه به یکی از مراکز پرداخت خسارت بیمه‌گر مراجعه و با تکمیل فرم اعلام
          خسارت، وقوع حادثه را اعلام نماید یا مراتب را ظرف مدت مذکور از طریق پست
          سفارشی و یا از طریق تماس با شماره تلفن ۸۹۴۳ داخلی ۳ به اطلاع بیمه‌گر
          برساند. همچنین بیمه‌گزار موظف است مدارک مثبته و سایر اطلاعاتی که راجع
          به حادثه و تعیین میزان خسارت از او خواسته می‌شود را در اختیار بیمه‌گر
          قرار دهد. در صورتی که بیمه‌گزار هر یک از تعهدات فوق را انجام ندهد
          بیمه‌گر می‌تواند ادعای خسارت را رد کند مگر آنکه بیمه‌گزار ثابت کند به
          دلیل امور غیرقابل اجتناب از عهده انجام آن برنیامده است که در این موارد
          تهیه فیلم و عکس از همه زوایای حادثه ضروری است.
        </p>
        <h3>عدم اظهارات خلاف واقع</h3>
        <p>
          هر گاه بیمه‌گزار به قصد تقلب در خصوص خسارت و کیفیت وقوع حادثه به طور
          کتبی اظهارات نادرستی بنماید و یا مدارک مجعول تسلیم کند بیمه‌گر
          می‌تواند وی را از دریافت خسارت محروم کند.
        </p>
        <h2>جلوگیری از وقوع حادثه و توسعه خسارت</h2>
        <p>
          بیمه‌گزار موظف است برای جلوگیری از وقوع حادثه و توسعه خسارت و یا نجات
          موضوع بیمه و لوازم همراه آن، اقدامات و احتیاط‌های لازم را که هر کس
          عرفا از مال خود می‌کند به عمل آورد. چنانچه ثابت شود که بیمه‌گزار عمدا
          از انجام این اقدامات خودداری نموده است بیمه‌گر می تواند نسبت به تاثیر
          قصور بیمه‌گزار، خسارت پرداختی را تقلیل دهد.
        </p>
        <h2>خودداری از جابجایی و یا تعمیر وسیله نقلیه</h2>
        <p>
          در صورت بروز حادثه بیمه‌گزار باید از جابجایی وسیله نقلیه جز به حکم
          مقررات یا دستور مقامات انتظامی و همچنین تعمیر آن بدون موافقت بیمه‌گر
          خودداری نماید.
        </p>
        <h2>انتقال حقوق بیمه‌گزار به بیمه‌گر</h2>
        <p>
          بیمه‌گر در حدودی که خسارت وارده را قبول یا پرداخت می‌کند در مقابل
          اشخاصی که مسئول وقوع حادثه یا خسارت هستند قائم مقام بیمه‌گزار خواهد
          بود و بیمه‌گزار موظف است از هر عملی که اقدام بیمه‌گر را علیه مسئول
          خسارت مشکل و یا نا مقدور می‌سازد خودداری نماید. در غیر این‌صورت
          بیمه‌گر می‌تواند خسارت را پرداخت نکند یا در صورت پراخت خسارت، حق
          استرداد آن را از بیمه‌گزار خواهد داشت.
        </p>
        <h2>
          <u>فسخ و انفساخ قرارداد بیمه</u>
        </h2>
        <h3>فسخ قرارداد بیمه</h3>
        <p>
          در موارد زیر بیمه‌گر با بیمه‌گزار می‌تواند قرارداد بیمه را فسخ نماید:
        </p>
        <h4>الف- موارد فسخ از طرف بیمه‌گر:</h4>
        <ul>
          <li>در صورتی که بیمه‌گزار حق بیمه را به موقع پرداخت نکند.</li>
          <li>
            در صورت تشدید خطر، مگر آنکه توافق خاصی بین طرفین صورت گرفته باشد.
          </li>
          <li>
            چنانچه بیمه‌گزار سهوا از اظهار مطالبی خودداری کند و یا اظهارات خلاف
            واقع بنماید و مطالب اعلام نشده یا اظهارات خلاف واقع در ارزیابی خطر
            موثر باشد.
          </li>
        </ul>
        <h4>ب- موارد فسخ از طرف بیمه‌گزار</h4>
        <ul>
          <li>
            در صورتی که خطر موضوع بیمه کاهش یابد و بیمه‌گر حاضر به تخفیف در حق
            بیمه نشود.
          </li>
          <li>در صورتی که فعالیت بیمه‌گر به هر دلیل متوقف شود.</li>
        </ul>
        <h4>انفساخ قرارداد بیمه</h4>
        <p>
          در صورتی که موضوع بیمه به علت وقوع حوادثی که تحت پوشش بیمه‌نامه نیست
          از بین برود، بیمه‌نامه منفسخ می‌شود.
        </p>
        <h2>نحوه تعیین و پرداخت خسارت</h2>
        <h3>نحوه تعیین مقدار خسارت</h3>
        <p>
          مقدار خسارت قابل پرداخت توسط بیمه‌گر به ترتیب زیر تعیین می‌شود. در
          صورت عدم توافق در مورد میزان خسارت به داوری ارجاع داده می‌شود.
        </p>
        <h3>الف- خسارت کلی</h3>
        <p>
          موضوع بیمه موقعی به‌کلی از بین رفته تلقی خواهد شد که حداقل ۶۰ روز پس
          از سرقت پیدا نشود یا به علت حوادث مشمول بیمه به نحوی آسیب ببیند که
          مجموع هزینه‌های تعمیر و تعویض قسمت‌های خسارت دیده آن با احتساب
          هزینه‌ّی نجات، از ۷۵ درصد قیمت آن در روز حادثه بیشتر باشد.
        </p>
        <p>
          <strong>تبصره ۱- </strong>در خسارت کلی، ملاک محاسبه و تصفیه خسارت،
          ارزش معاملاتی موضوع بیمه در روز حادثه و حداکثر تا مبلغ بیمه‌شده خواهد
          بود. از خسارت کلی، ارزش بازیافتی احتمالی و کسورات مقرر کسر و هزینه
          متعارف نجات و حمل تا حد مقرر به آن اضافه می شود، مشروط بر اینکه از کل
          مبلغ بیمه بیشتر نشود.
        </p>
        <p>
          <strong>تبصره ۲- </strong>ارزش بازیافتی موضوع بیمه توسط بیمه‌گر تعیین
          می‌شود. در صورت عدم موافقت بیمه‌گزار با ارزش تعیین‌شده، بیمه‌گر پس از
          تملک موضوع بیمه و انتقال سند، خسارت را با کسر فرانشیز و سایر کسورات و
          اضافه نمودن هزینه‌های متعارف نجات و حمل پرداخت خواهد نمود.
        </p>
        <p>
          <strong>تبصره ۳- </strong>قبل از پرداخت خسارت کلی مربوط به سرقت کلی
          موضوع بیمه، سند مالکیت وسیله نقلیه باید به بیمه‌گر منتقل شود.
        </p>
        <p>
          <strong>تبصره ۴- </strong>چنانچه تا یک سال پس از پرداخت خسارت وسیله
          نقلیه سرقت‌شده و انتقال مالکیت آن به بیمه‌گر، وسیله نقلیه مذکور پیدا
          شود بیمه‌گر موظف است آن را با رعایت آیین‌نامه بازیافت خسارت مصوب شواری
          عالی بیمه به فروش رساند و سهم بیمه‌گزار از مبلغ بازیافتی را با توجه به
          درصدی که از خسارت پرداختی کسر کرده است به وی پرداخت نماید.
        </p>

        <h3>ب- خسارت جزئی</h3>
        <p>
          خسارت‌هایی که مشمول تعریف مندرج در بند الف نیست خسارت جزئی تلقی می
          شود. ملاک تعیین خسارت جزئی، هزینه تعمیر شامل دستمزد عادله و قیمت روز
          لوازم تعویضی پس از کسر استهلاک و فرانشیز و اضافه نمودن هزینه نجات و
          حمل تا حد مقرر خواهد بود. میزان استهلاک برای قطعات تعویضی(به‌جز
          شیشه‌ها و شیشه چراغ‌ها) از شروع سال پنجم وسیله نقلیه به بعد برای هر
          سال ۵ درصد و حداکثر ۲۵ درصد خواهد بود.
        </p>
        <h2>
          <u>مهلت و نحوه پرداخت خسارت</u>
        </h2>
        <p>
          بیمه‌گر موظف است حداکثر پانزده روز بعد از تکمیل مدارک و توافق طرفین در
          خصوص میزان خسارت یا اعلام رای داور مرضی‌الطرفین، هیئت داوری یا دادگاه
          خسارت را پرداخت کند. این مدت برای پرداخت خسارت سرقت موضوع بیمه ۶۰ روز
          است که از تاریخ اعلام خسارت به بیمه‌گر شروع و پس از سپری شدن این مدت
          در صورت پیدا نشدن موضوع بیمه، خسارت وارده به موجب شرایط بیمه‌نامه
          پرداخت می‌شود.
        </p>
        <p>
          <strong>تبصره۱- </strong>بیمه‌گر می‌تواند به جای پراخت نقدی خسارت،
          موضوع بیمه را در مدتی که عرفا کمتر از آن میسر نیست تعمیر کند یا وسیله
          نقلیه مشابهی را در عوض آن به تملک بیمه‌گزار در آورد. در هر حال فرانشیز
          و استهلاک به عهده بیمه‌گزار خواهد بود.
        </p>
        <p>
          <u>
            <strong>تبصره ۲- </strong>در صورتی که مبلغ بیمه‌شده کمتر از ارزش
            موضوع بیمه در روز وقوع حادثه باشد بیمه‌گر فقط تناسب مبلغ بیمه‌شده با
            قیمت واقعی آن در روز حادثه مسئول جبران خسارت خواهد بود.
          </u>
        </p>
        <h2>
          <u>سایر مقررات</u>
        </h2>
        <h3>بیمه مضاعف</h3>
        <p>
          اگر وسیله نقلیه موضوع این بیمه‌نامه در طول مدت اعتبار قرارداد بدون قصد
          تقلب به موجب بیمه‌نامه یا بیمه‌نامه‌های دیگری در مقابل تمام یا بخشی از
          خطرات مذکور در این قرارداد بیمه شده باشد، در صورت وقوع خطرهای تحت
          پوشش، بیمه‌گر موظف است خسارت را جبران و سپس برای دریافت سهم بقیه
          بیمه‌گرها به آنان مراجعه نماید. چناچه قبلا تمام خسارت با استفاده از
          سایر بیمه‌نامه‌ها جبران شده باشد بیمه‌گر تعهدی برای جبران خسارت در
          قبال بیمه‌گزار نخواهد داشت ولی اگر بخشی از خسارت توسط بیمه‌گرها جبران
          شده باشد بیمه‌گر موظف است با توجه به نسبت تعهد خود به مجموع پوشش همه
          بیمه‌نامه‌ها، خسارت را جبران نماید.
        </p>
        <h3>ارجاع به داوری</h3>
        <p>
          طرفین قرارداد باید اختلاف خود را تا حد امکان از طریق مذاکره حل‌و‌فصل
          نمایند. اگر اختلاف از طریق مذاکره حل‌و‌فصل نشد می‌توانند از طریق داوری
          یا مراجعه به دادگاه موضوع را حل‌و‌فصل کنند. در صورت انتخاب روش داوری،
          طرفین قرارداد می‌توانند یک نفر داور مرضی‌الطرفین را انتخاب کنند. در
          صورت عدم توافق برای انتخاب داور مرضی‌الطرفین هر یک از طرفین داور
          انتخابی خود را به صورت کتبی به طرف دیگر معرفی می‌کند. اگر داوران منتخب
          برای انتخاب داور سوم به توافق نرسند هر یک از طرفین می تواند داور سوم
          را از دادگاه صالح خواستار شود. هر یک از طرفین حق‌الزحمه داور انتخابی
          خود را می‌پردازد و حق‌الزحمه داور سوم به تساوی تقسیم می شود.
        </p>
        <h3>مهلت اقامه دعوی</h3>
        <p>
          هر گونه ادعای ناشی از بیمه‌نامه باید حداکثر ظرف مدت دو سال از تاریخ
          بطلان، فسخ و یا انقضای مدت بیمه‌نامه و در صورت وقوع حوادث تحت‌پوشش، از
          تاریخ وقوع حادثه اقامه شود و پس از دو سال مذکور ادعای ناشی از
          بیمه‌نامه مسموع خواهد بود. مرور زمان می‌تواند یک دفعه توسط هر یک از
          طرفین با اظهارنامه رسمی قطع شود. در صورت قطع شدن مرور زمان، به مدت
          باقی‌مانده مرور زمان یک سال اضافه خواهد شد.
        </p>
        <h3>قلمرو جغرافیایی پوشش قرارداد بیمه</h3>
        <p>
          پوشش‌های این قرارداد شامل خسارت‌هایی است که در محدوده جغرافیایی ایران
          ایجاد شود و تعمیم آن به حوادث خارج از کشور مشروط به توافق خاص است.
        </p>

        <h2>سایر شرایط</h2>
        <h3>شرایط عمومی</h3>
        <p>
          <strong>اعلام خسارت: </strong>بیمه‌گزار موظف است حداکثر ظرف پنج روز
          کاری از تاریخ اطلاع خود از وقوع حادثه به یکی از مراکز پرداخت خسارت
          بیمه‌گر مراجعه و با تکمیل فرم اعلام خسارت، وقوع حادثه را اعلام نماید
          یا مراتب را ظرف مدت مذکور از طریق پست سفارشی و یا از طریق تماس با
          شماره تلفن ۸۹۴۳ داخلی ۳ به اطلاع بیمه‌گر برساند. همچنین بیمه‌گزار موظف
          است مدارک مثبته و سایر اطلاعاتی که راجع به حادثه و تعیین میزان خسارت
          از او خواسته می‌شود را در اختیار بیمه‌گر قرار دهد. در صورتی که
          بیمه‌گزار هر یک از تعهدات فوق را انجام ندهد بیمه‌گر می‌تواند ادعای
          خسارت را رد کند مگر آنکه بیمه‌گزار ثابت کند به دلیل امور غیرقابل
          اجتناب از عهده انجام آن برنیامده است که در این موارد تهیه فیلم و عکس
          از همه زوایای حادثه ضروری است.
        </p>
        <h2>شرایط خصوصی</h2>
        <ul>
          <li>
            <strong>عدم تعمیر خودرو</strong>
          </li>
          <p className="intends">
            در صورت وقوع حادثه منجر به خسارت قبل از جابجایی اتومبیل خسارت‌دیده
            سریعا جهت تهیه گزارش توسط مقامات انتظامی اقدام و سپس قبل از انجام
            تعمیرات، با اتومبیل خسارتی و مدارک لازم با شرکت بیمه تماس یا به شرکت
            بیمه مراجعه فرمائید. برای اعلام خسارت و دریافت آن، مراجعه بیمه‌گزار
            (مالک) یا نماینده قانونی او با در دست داشتن اسناد شناسایی به شرکت
            بیمه الزامی است.
          </p>
          <li>
            <strong>
              فرانشیز و استهلاک خسارت برای انواع وسایل نقلیه زمینی به شرح زیر
              است:
            </strong>
          </li>
          <ul className="intends">
            <li>
              فرانشیز خسارت جزیی ناشی از حوادث: خسارت اول ۱۰ درصد مبلغ خسارت و
              حداقل ۵۰۰ هزار ریال، خسارت دوم دو برابر فرانشیز خسارت اول (درصد و
              حداقل)، خسارت سوم سه برابر خسارت اول (درصد و حداقل)
            </li>
            <li>
              فرانشیز برای رانندگانی که سابقه رانندگی آن‌‌ها کمتر از سه سال است،
              ۱0 درصد بیشتر از فرانشیزهای فوق‌الذکر
            </li>
            <li>
              فرانشیز خسارت ناشی از آتش‌سوزی، صاعقه و انفجار به تنهایی ۱۰ درصد
              مبلغ خسارت و حداقل ۵۰۰ هزار ریال
            </li>
            <li>فرانشیز خسارت شکست شیشه به تنهایی ۲۰ درصد مبلغ خسارت</li>
            <li>فرانشیز پاشیدن مواد اسیدی ۳۰ درصد مبلغ خسارت</li>
            <li>فرانشیز بلایای طبیعی ۱۰ درصد و حداقل ۵۰۰ هزار ریال</li>
            <li>فرانشیز خسارت سرقت اعم از جزیی و کلی ۲۰ درصد مبلغ خسارت</li>
            <li>
              فرانشیز خسارت کلی ناشی از حوادث (بجز سرقت) ۱۰ درصد مبلغ خسارت
            </li>
            <li>
              فرانشیز خسارت ناشی از تصادفات رانندگی در صورتی که راننده اتومبیل
              بیمه‌شده مقصر نباشد و مقصر شناخته‌شده‌ای وجود داشته و امکان تعقیب
              مقصر نیز فراهم گردد، ۵۰ درصد فرانشیز خسارت اول خواهد بود.
            </li>
          </ul>

          <p>
            <strong>تبصره ۱- </strong>از خسارت جزیی استهلاک کسر خواهد شد. میزان
            استهلاک برای قطعات تعویضی (به‌جز شیشه‌ها و شیشه چراغ‌ها) از شروع سال
            پنجم تولید وسیله نقلیه برای هر سال ۵ درصد و حداکثر ۲۵ درصد خواهد
            بود. استهلاک لوازم و قطعاتی که به سرعت فرسوده می‌شود مانند باطری و
            لاستیک‌ها با رعایت مدت مصرف، حداقل پنجاه درصد است.
          </p>
          <p>
            <strong>تبصره ۲- </strong>هر گاه تهیه قطعات یدکی و لوازم تعویضی به
            قیمت کمتر از قیمت بازار به سهولت مقدور باشد قیمت کمتر ملاک محاسبه
            خسارت قرار خواهدگرفت.
          </p>
          <p>
            در صورت پرداخت خسارت کلی و تحویل لاشه به عنوان بازیافتی و همچنین
            سرقت کلی مورد بیمه، انتقال سند مالکیت وسیله نقلیه به بیمه‌گز الزامی
            است.
          </p>
          <p>
            <strong>تبصره ۳- </strong>چنانچه هنگام بازدید اولیه قبل از شروع تعهد
            بیمه‌گر، خودرو دارای نقاط آسیب‌دیده باشد، نقاط مزبور فاقد پوشش
            بیمه‌ای است. مگر اینکه بیمه‌گزار نسبت به بازسازی آن اقدام و مراتب را
            به رویت کارشناس شرکت رسانده باشد.
          </p>
          <li>
            <strong>
              ترمیم ارزش خودرو پس از دریافت خسارات جزیی بیش از بیست درصد ارزش
              خودرو
            </strong>
          </li>
          <p>
            چنانچه وسیله نقلیه دچار خسارت گردد، ارزش بیمه‌شده به میزان خسارت
            پرداختی تقلیل می‌یابد. لذا بیمه‌گزار می‌تواند با پرداخت حق بیمه
            اضافی (الحاقیه ترمیم سرمایه) ارزش بیمه‌شده را تکمیل نماید. و همچنین
            پس از انجام تعمیرات و تایید کارشناس، مواضع آسیب‌دیده مجددا جزء تعهد
            بیمه‌گر خواهد بود.
          </p>
          <li>
            <strong>شرایط مربوط به خودروهای منطقه آزاد</strong>
          </li>
          <p>
            در صورتی‌ که وسیله نقلیه بدون در نظر گرفتن حقوق و عوارض گمرکی
            بیمه‌شده باشه به ترتیب زیر عمل خواهد شد:
          </p>
          <ul className="intends">
            <li>
              در مورد خسارت کلی چنانچه بیمه‌گزار به علت عدم پرداخت حقوق و عوارض
              گمرکی نتواند مالکیت اتومبیل را به بیمه‌گر منتقل کند حداکثر خسارت
              قابل پرداخت، مبلغ بیمه‌شده پس از کسر ارزش بازیافتی و فرانشیز که از
              طرف بیمه‌گر تعیین شده، خواهد بود.
            </li>
            <li>
              در مورد سرقت کلی تسویه حساب خسارت موکول به پرداخت حقوق و عوارض
              گمرکی و انتقال اسناد مالکیت وسیله نقلیه به بیمه‌گر خواهد بود.
            </li>
          </ul>
          <p>
            <strong>تبصره: </strong>در خصوص وسایل نقلیه دارای پلاک انتظامی مناطق
            آزاد تجاری، تعهد بیمه‌گر فقط در مورد خسارت‌های واقع شده در منطقه
            مذکور بوده و در صورت خروج از منطقه تجاری، جهت تحت پوشش قرار گرفتن
            جبران خسارت‌های احتمالی، هماهنگی با بیمه‌گر جهت صدور الحاقیه اصلاح
            قیمت، الزامی است.
          </p>
          <li>
            <strong>پوشش خطر سرقت کلی مورد بیمه</strong>
          </li>
          <p>
            پوشش خطر سرقت کلی مورد بیمه منوط به اخذ پلاک دائم (شماره انتظامی)
            اتومبیل از نیروهای انتظامی ذیربط توسط بیمه‌گزار است. در غیر این صورت
            بیمه‌گر در مقابل خسارت سرقت کلی تعهدی ندارد. در هر حال پرداخت خسارت
            سرقت کلی موکول به انتقال مالکیت وسیله نقلیه به بیمه‌گر خواهد بود.
          </p>
          <li>
            <u>
              <strong>شرایط آفرود</strong>
            </u>
          </li>
          <p>
            در صورت تغییر مورد بیمه جهت استفاده موارد بیابان‌گردی (آفرود)، مراتب
            می‌بایست به بیمه‌گر اعلام شود، در غیر این صورت چنانچه خسارتی حادث
            گردد، موضوع بیمه مشمول ۳۰ درصد قاعده نسبی حق بیمه می‌شود.
          </p>
          <li>
            <strong>جانشینی بیمه‌گر در مواقعی که بیمه‌گزار مقصر نیست</strong>
          </li>
          <p>
            چنانچه در تصادفات رانندگی مقصر حادثه نبودید و مسئول حادثه شخص
            شناخته‌شده‌ای باشد، از افزایش فرانشیز خسارت متوالی معاف می‌گردید و
            علاوه بر آن مورد فرانشیز متعلقه شما ۵۰ درصد فرانشیز معمول خواهد بود.
            برای استفاده از این مزایا و جهت حفظ حقوق خود موارد زیر را دقیقا
            مراعات نمایید:
          </p>
          <p>
            الف- در صورت اقرار به تقصیر از طرف مقصر و قبول نظر کارشناس تصادفات،
            مشخصات کامل و نشانی محل کار و سکونت ایشان در برگ بازجویی قید شود.
          </p>
          <p>
            ب- در برگ بازجویی خود ضمن اعلام شکایت از مقصر حادثه، با وی سازش
            نکنید.
          </p>
          <p>
            ج- در صورتی که برای تعیین میزان خسارت، کارشناس رسمی انتخاب گردد و
            نظر ایشان در خصوص میزان خسارت و یا چگونگی حادثه مورد قبول شما نباشد،
            ضمن اعتراض کتبی نسبت به نظر کارشناس، مراتب را حداکثر ظرف مدت ۵ روز
            از تاریخ اظهار نظر کارشناس به این شرکت اعلام فرمایید، تا نظر کارشناس
            مذکور ملاک پرداخت خسارت از طرف این شرکت قرار نگیرد.
          </p>
        </ul>
      </section>
    </Layout>
  );
};

export default InsurancePolicies;
