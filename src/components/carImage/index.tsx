import Image from "next/image";
import React from "react";
// import { useStore } from '../../context/store';
import Icon from "../Icons";
import { ImageUrl } from "../../../utils/constances";
import SeprisCarLogo from "../../../public/image/seprisCarLogo.svg";
import { SeprisTextFa } from "../Icons/svg/seprisTextFa";
import { SeprisTextEn } from "../icons/svg/seprisTextEn";
import styles from "./carImage.module.scss";
import { supportedLanguages } from "../../../types";

const CarImage: React.FC<{
  title: string;
  hasMedia: boolean;
  activeLanguage: supportedLanguages;
  mediaSet: { id: number; thumbnail_url: string; url: string }[] | [];
}> = ({ title, hasMedia, mediaSet, activeLanguage }) => {
  // const {
  //   store: { activeLanguage }
  // } = useStore();

  return hasMedia ? (
    <>
      {mediaSet.length > 1 && (
        <div className={styles.imageCounter}>
          <Icon name='pictures' height='20px' width='20px' color='#fafafa' />
        </div>
      )}
      <Image
        src={hasMedia ? mediaSet[0].thumbnail_url : SeprisCarLogo}
        objectFit='cover'
        objectPosition='center'
        layout='fill'
        alt={title}
        placeholder='blur'
        blurDataURL={ImageUrl}
      />
    </>
  ) : activeLanguage === "fa" ? (
    <SeprisTextFa width='200px' height='40px' color='#ebebeb' />
  ) : (
    <SeprisTextEn width='200px' height='40px' color='#ebebeb' />
  );
};

export default CarImage;
