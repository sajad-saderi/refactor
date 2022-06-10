import { useState } from "react";
import classNames from "classnames";
import Icon from "../Icons";
import { IAccordion } from "../../../types";
import styles from "./Accordion.module.scss";

const Accordion = ({ questions }: IAccordion) => {
  const [index, setIndex] = useState<null | number>(0);

  const clickHandler = (i: number) => {
    if (i === index) {
      setIndex(null);
    } else setIndex(i);
  };
  return (
    <div
      itemScope
      itemType='https://schema.org/FAQPage'
      className={classNames("responsive", styles.AccordionContainer)}
    >
      {questions.map((item, i) => (
        <div
          key={i}
          onClick={() => {
            clickHandler(i);
          }}
          className={styles.singleItem}
          itemProp='mainEntity'
          itemScope
          itemType='https://schema.org/Question'
        >
          <div
            className={classNames(
              i === index ? styles.activeQuestion : "",
              styles.question
            )}
          >
            <h3 dangerouslySetInnerHTML={{ __html: item.title }}></h3>
            <Icon
              name='chevronUp'
              color='#929292'
              width='2rem'
              height='2rem'
              rotate={i === index ? 0 : 180}
            />
          </div>
          <div
            itemScope
            itemProp='acceptedAnswer'
            itemType='https://schema.org/Answer'
            className={classNames(
              styles.answer,
              i === index && styles.activeItem
            )}
            dangerouslySetInnerHTML={{ __html: item.content }}
          ></div>
        </div>
      ))}
    </div>
  );
};

export default Accordion;
