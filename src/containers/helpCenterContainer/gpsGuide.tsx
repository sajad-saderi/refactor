import Link from "next/link";
import { IoIosArrowRoundBack } from "react-icons/io";

export const GpsGuide = () => (
  <>
    <h2>راهنمای انتخاب ردیاب</h2>
    <p>
      ردیاب‌ها قابلیت نصب بر روی تمامی خودروها را دارند، می‌توانید قبل از اجاره
      دادن خودروی خود بر روی آن ردیاب نصب کنید. برای نصب ردیاب بر روی خودرو
      موارد زیر را در نظر بگیرید
    </p>
    <Link href="/gps">
      <a className="guide-center__readMore static-position">
        بیشتر
        <IoIosArrowRoundBack size="3rem" color="##3fa6da" />
      </a>
    </Link>
  </>
);
