import React, { useEffect } from "react";

import Car from "./car";
// import "./search_result.scss";
import CarLoading from "../../../components/cartPlaceholder/CarLoading";

const SearchResultList = ({
  showLocation,
  result,
  tagClick,
  language,
}: ISearchResultList) => {
  useEffect(() => {
    if (result) {
      if (result.length > 0) {
        let startString = result[0].start_date.split("/");
        let endString = result[0].end_date.split("/");
        let start = {
          year: +startString[0],
          month: +startString[1],
          day: +startString[2],
        };
        let end = {
          year: +endString[0],
          month: +endString[1],
          day: +endString[2],
        };
        localStorage["start"] = JSON.stringify(start);
        localStorage["end"] = JSON.stringify(end);
      }
    }
  }, [result]);

  return (
    <section className="search_result_section minHeight">
      {result ? (
        result.length > 0 ? (
          result.map((item, i) => {
            return (
              <Car
                key={i}
                data={item}
                showLocation={showLocation}
                tagClick={tagClick}
                language={language}
              />
            );
          })
        ) : (
          <p className="Not_Result">
            {language.search_result_section.Not_Result_part_1}
            <br />
            <br />
            {language.search_result_section.Not_Result_part_2}
            <br />
            {language.search_result_section.Not_Result_part_3}
            <a href="tel:02188567759">{language.search_result_section.Not_Result_part_4}</a>
            {language.search_result_section.Not_Result_part_5}
          </p>
        )
      ) : (
        <>
          <CarLoading />
          <CarLoading />
          <CarLoading />
          <CarLoading />
          <CarLoading />
          <CarLoading />
        </>
      )}
    </section>
  );
};

interface ISearchResultList {
  showLocation?: boolean;
  result: any;
  tagClick?: any;
  language: any;
}

export default SearchResultList;
