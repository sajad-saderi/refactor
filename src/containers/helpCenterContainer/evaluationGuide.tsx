import Link from "next/link";
import Icon from "../../components/Icons";

export const EvaluationGuide = () => (
  <>
    <h2>اعتبارسنجی مشتریان</h2>
    <p>
      سپریس با سیستم اعتبارسنجی مورد تایید بانک مرکزی، مشتریان (مهمان) را از نظر
      سوابق و رفتار مالی در هشت سال گذشته را بررسی می‌کند و گزارشی از جزییات این
      بررسی را در اختیار میزبان می‌گذارد که تصمیم‌گیری مناسب‌تری در قبول یا رد
      درخواست مشتری برای اجاره خودرو داشته باشد.
    </p>
    <Link href="/evaluation">
      <a className="guide-center__readMore static-position">
        بیشتر
        <Icon name="arrow" width="30px" height="30px" color="#3fa6da" />
      </a>
    </Link>
  </>
);
