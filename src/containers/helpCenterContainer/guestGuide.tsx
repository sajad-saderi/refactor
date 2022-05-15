import Link from "next/link";
import { IoIosArrowRoundBack } from "react-icons/io";
export const GuestGuide = () => (
  <>
    <h2>راهنمای کامل سپریس برای مهمان</h2>
    <ul>
      <li>
        <Link href="/guide-for-rent#guideForRentReserve">انتخاب و رزرو</Link>
      </li>
      <li>
        <Link href="/guide-for-rent#guideForRentCarDelivery">تحویل خودرو</Link>
      </li>
      <li>
        <Link href="/guide-for-rent#guideForRentTimeTravel">در زمان سفر</Link>
      </li>
      <li>
        <Link href="/guide-for-rent#guideForRentEndOfJourney">پایان سفر</Link>
      </li>
    </ul>
    <Link href="/guide-for-rent">
      <a className="guide-center__readMore">
        بیشتر
        <IoIosArrowRoundBack size="30px" color="##3fa6da" />
      </a>
    </Link>
  </>
);
