import { useState, useEffect } from "react";
import dynamic from "next/dynamic";
import { supportedLanguages } from '../../../types';

const Icon = dynamic(() => import("../../../utils/Icon"));
// import Icon from "../../../utils/Icon";

const StarGenerator = ({ count, locale }: IReview) => {
  return (
    <span className={`start_generator_container ${locale === 'fa' ? '' : 'ltr_start_generator_container'}`}>
      {Array(count)
        .fill("0")
        .map((i) => {
          return <Icon name='star' />;
        })}
    </span>
  );
};

interface IReview {
  count: number;
  locale: supportedLanguages
}

export default StarGenerator;
