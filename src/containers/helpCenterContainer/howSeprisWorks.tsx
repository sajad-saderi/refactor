import Link from "next/link";
import { IoIosArrowRoundBack } from "react-icons/io";

export const HowSeprisWorks = () => (
  <>
    <h2>سپریس چگونه کار می‌کند؟</h2>
    <div className="howSeprisWorksInsideGrid">
      <div>
        <h3>خودرو اجاره دهید</h3>
        <ul>
          <li>در سپریس ثبت‌نام کنید</li>
          <li>در سپریس ماشین ثبت کنید</li>
          <li>درخواست‌ها را بررسی کنید</li>
          <li>با مهمان تماس بگیرید</li>
        </ul>
      </div>
      <div>
        <h3>خودرو اجاره کنید</h3>
        <ul>
          <li>در سپریس ثبت‌نام کنید</li>
          <li>بهترین خودرو را انتخاب کنید</li>
          <li>بیمه بخرید و ماشین اجاره‌ای را رزرو کنید</li>
          <li>مبلغ اجاره را پرداخت کنید</li>
        </ul>
      </div>
    </div>
    <Link href="/sepris">
      <a className="guide-center__readMore">
        بیشتر
        <IoIosArrowRoundBack size="30px" color="##3fa6da" />
      </a>
    </Link>
  </>
);
