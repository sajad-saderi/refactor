
import Link from "next/link";
import Icon from "../../components/Icons";

export const InsuranceGuide = () => (
  <>
    <h2>بیمه اجاره خودرو</h2>
    <h3>شرایط بیمه اجاره خودرو سپریس</h3>
    <ul>
      <li>سرقت کلی</li>
      <li>تصادف</li>
      <li>آتش سوزي</li>
      <li>بلایای طبیعی</li>
      <li>رنگ، اسید و مواد شیمیایی</li>
    </ul>
    <Link href="/car-insurance">
      <a className="guide-center__readMore">
        بیشتر
        <Icon name="arrow" width="30px" height="30px" color="#3fa6da" />
      </a>
    </Link>
  </>
);
