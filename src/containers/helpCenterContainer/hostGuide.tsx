import Link from "next/link";
import { IoIosArrowRoundBack } from "react-icons/io";
export const HostGuide = () => (
  <>
    <h2>راهنمای کامل سپریس برای میزبان</h2>
    <ul>
      <li>
        <Link href="/guide-renter#guideForHostBeforeRent">
          قوانینی که باید قبل از ثبت خودرو بدانید
        </Link>
      </li>
      <li>
        <Link href="/guide-renter#guideForHostAddCar">ماشین را ثبت کنید</Link>
      </li>
      <li>
        <Link href="/guide-renter#guideForHostCancelationPolicies">
          شرایطتان را برای اجاره تعیین کنید
        </Link>
      </li>
      <li>
        <Link href="/guide-renter#guideForHostRequestManagment">
          درخواست‌های رزرو را مدیریت کنید
        </Link>
      </li>
      <li>
        <Link href="/guide-renter#guideForHostDeliverCar">
          خودرو را تحویل دهید
        </Link>
      </li>
      <li>
        <Link href="/guide-renter#guideForHostReturnCar">
          خودرو را بازتحویل بگیرید
        </Link>
      </li>
    </ul>
    <Link href="/guide-renter">
      <a className="guide-center__readMore">
        بیشتر
        <IoIosArrowRoundBack size="30px" color="##3fa6da" />
      </a>
    </Link>
  </>
);
