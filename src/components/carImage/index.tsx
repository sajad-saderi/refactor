import Image from "next/image";
import React from "react";
// import { useStore } from '../../context/store';
import Icon from "../Icons";
import SeprisCarLogo from "../../../public/image/seprisCarLogo.svg";
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
      />
    </>
  ) : (
    <Image
      style={{ transform: `rotateY(${activeLanguage === "fa" ? 0 : 180}deg)` }}
      src={hasMedia ? mediaSet[0].thumbnail_url : SeprisCarLogo}
      width='150px'
      height='80px'
      alt={title}
    />
  );
};

export default CarImage;
