import { useState, useEffect } from "react";
import dynamic from "next/dynamic";
import { supportedLanguages } from '../../../types';
import Icon from "../Icons";


const StarGenerator = ({ count, locale }: IReview) => {
  return (
    <span className={`start_generator_container ${locale === 'fa' ? '' : 'ltr_start_generator_container'}`}>
      {Array(count)
        .fill("0")
        .map((i) => {
          return <Icon name='star' width="16px" height="20px" color="#116B98"/>;
        })}
    </span>
  );
};

interface IReview {
  count: number;
  locale: supportedLanguages
}

export default StarGenerator;
