import { useState } from "react";
import Icon from "../Icons";
import { supportedLanguages } from "../../../utils/types";
import classNames from "classnames";
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
        dir={props.activeLanguage === "fa" ? "rtl" : "ltr"}
        className="FQ_BOX"
        onClick={() => {
          ClickHandler(i);
        }}
        itemProp="mainEntity"
        itemScope
        itemType="https://schema.org/Question"
      >
        <h3
          className={i === index ? "activeQA" : ""}
          dangerouslySetInnerHTML={{ __html: item.title }}
        ></h3>
        <span
          className={classNames(
            "ICON_CHevron",
            i === index && "ACTIVE_CHEVRON"
          )}
        >
          <Icon name="chevronUp" color="#202020" width="20px" height="20px" />
        </span>
        <div
          itemScope
          itemProp="acceptedAnswer"
          itemType="https://schema.org/Answer"
          className={["QuestionPart", i === index ? "activeQA" : ""].join(" ")}
          dangerouslySetInnerHTML={{ __html: item.content }}
        ></div>
      </div>
    );
  });
};

interface IAccordion {  
  question_set: any;
  activeLanguage: supportedLanguages;
}

export default Accordion;
