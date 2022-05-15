import Link from "next/link";
import Icon from "../../components/Icons";

export const FaqQuestions = () => (
  <>
    <h2>سوالات پرتکرار</h2>
    <p>سپریس چه کار می‌کند؟</p>
    <p>در چه شهرهایی ماشین اجاره‌ای دارید؟ از کجا می‌تونم ببینم؟</p>
    <p>قیمت اجاره ماشین روی سایت سپریس چگونه مشخص می‌شود؟</p>
    <p>آیا کل پروسه اجاره دادن و یا اجاره کردن خودرو آنلاین است؟</p>
    <p>حساب کاربری‌ام مشکل پیدا کرده، آیا باید حساب جدید باز کنم؟</p>
    <p>آیا ممکن است سپریس حساب کاربری من را ببندد؟</p>
    <Link href="/faq">
      <a className="guide-center__readMore">
        بیشتر
        <Icon name="arrow" width="30px" height="30px" color="#3fa6da" />

      </a>
    </Link>
  </>
);
