import { useState } from "react";
import { IoIosArrowDown } from "react-icons/io";
import { supportedLanguages } from '../../../utils/types';
// import "./Accordion.scss";

const Accordion = (props: IAccordion) => {
  const [index, setIndex] = useState(0);

  const ClickHandler = (i) => {
    // If the given index is equal to the current index thi tab will be closing
    if (i === index) {
      setIndex(undefined);
    } else setIndex(i);
  };

  return props.question_set.map((item, i) => {
    return (
      <div
        key={i}
        dir={props.activeLanguage === 'fa' ? 'rtl' : 'ltr'}
        className='FQ_BOX'
        onClick={() => {
          ClickHandler(i);
        }}
        itemProp='mainEntity'
        itemScope
        itemType='https://schema.org/Question'
      >
        <h3
          className={i === index ? "activeQA" : ""}
          dangerouslySetInnerHTML={{ __html: item.title }}
        ></h3>
        <IoIosArrowDown
          color='#202020'
          size='2rem'
          className={["ICON_CHevron", i === index ? "ACTIVE_CHEVRON" : ""].join(
            " "
          )}
        />
        <div
          itemScope
          itemProp='acceptedAnswer'
          itemType='https://schema.org/Answer'
          className={["QuestionPart", i === index ? "activeQA" : ""].join(" ")}
          dangerouslySetInnerHTML={{ __html: item.content }}
        ></div>
      </div>
    );
  });
};

interface IAccordion {
  /**
   * @question_set
   * A list of questions and answers
   */
  question_set: any;
  activeLanguage: supportedLanguages
}

export default Accordion;
