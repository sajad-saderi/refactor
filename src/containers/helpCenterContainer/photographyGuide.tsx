import Link from "next/link"; 
import Icon from "../../components/Icons";
export const PhotographyGuide = () => (
  <>
    <h2>راهنمای عکاسی برای ثبت خودرو در سپریس</h2>
    <p>
      از آنجایی که عکس‌ها به اجاره سریع‌تر خودروی شما کمک می‎کنند، بهتر است برای
      تهیه عکس‌ها زمان بگذارید. همچنین در صورت تمایل و تماس با پشتیبانی سپریس،
      می‌توانید از عکاسان سپریس برای تهیه عکس از خودروتان استفاده کنید.
    </p>
    <ul>
      <li>
        <Link href="/guide-picture#guidePictureHowTakePicture">
          چطور از خودرو عکاسی کنیم؟
        </Link>
      </li>
      <li>
        <Link href="/guide-picture#guidePictureDontMakeMistake">
          چطور از خودرو عکاسی نکنیم؟
        </Link>
      </li>
    </ul>
    <Link href="/guide-picture">
      <a className="guide-center__readMore">
        بیشتر
        <Icon name="arrow" width="30px" height="30px" color="#3fa6da" />
      </a>
    </Link>
  </>
);
