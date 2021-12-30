import { useContext, useEffect } from "react";
import economic from "../../../../public/image/affordable.svg";
import offRoad from "../../../../public/image/SUV.svg";
import dynamic from "next/dynamic";

// const Car = dynamic(() => import("./car"));
// const CarLoading = dynamic(() =>
//   import("../../../components/cartPlaceholder/CarLoading")
// );
import Car from "./car";
// import "./search_result.scss";
import CarLoading from "../../../components/cartPlaceholder/CarLoading";
import languageCTX from '../../../context/languageCTX'
import { addingCountryCodeToNumber } from '../../../helpers/addingCountryCodeToNumber';
let quickAccessClick = false;
const SearchResultList = ({
  showLocation,
  noQuickAccess,
  setFilterForSearch,
  result,
  tagClick,
  language,
}: ISearchResultList) => {
  const { activeLanguage } = useContext(languageCTX)
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

  useEffect(() => {
    return () => {
      quickAccessClick = false;
    };
  }, []);

  return (
    <section className='search_result_section minHeight'
      dir={activeLanguage === 'fa' ? 'rtl' : 'ltr'}>
      {result ? (
        result.length > 0 ? (
          result.map((item, i) => {
            return i === 14 && !quickAccessClick && !noQuickAccess ? (
              <>
                <Car
                  key={i}
                  data={item}
                  showLocation={showLocation}
                  tagClick={tagClick}
                  language={language}
                />
                <section className='quick_access_middle_searchResult'
                dir={activeLanguage === 'fa' ? 'rtl' : 'ltr'}>
                  <h2>{language.COMMON.quickAccess}</h2>
                  <div className='quick_access_child_container'>
                    <div
                      className='HEAP_Search_Result_Quick_Access_SUV'
                      onClick={() => {
                        window.scrollTo(0, 0);
                        quickAccessClick = true;
                        setFilterForSearch({
                          body_style_id: { value: [2], status: true },
                        });
                      }}
                    >
                      <img src={offRoad} alt={language.COMMON.suvCars} />
                      <p>{language.COMMON.suvCars}</p>
                    </div>
                    <div
                      className='HEAP_Search_Result_Quick_Access_Economy'
                      onClick={() => {
                        window.scrollTo(0, 0);
                        quickAccessClick = true;
                        setFilterForSearch({
                          o: "-price",
                          price: {
                            value: ["0.00", "500000.00"],
                            status: true,
                          },
                        });
                      }}
                    >
                      <img src={economic} alt={language.COMMON.affordableCars} />
                      <p>{language.COMMON.affordableCars}</p>
                    </div>
                  </div>
                </section>
              </>
            ) : (
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
          <p className='Not_Result'>
            {language.COMMON.part1}
            <br />
            <br />
            {language.COMMON.part2}
            <br />
            {language.COMMON.part3}
            <a href={`tel:${addingCountryCodeToNumber(language.COMMON.number1)}`}>
              {language.COMMON.number1}
            </a>
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
  noQuickAccess?: boolean;
  showLocation?: boolean;
  result: any;
  setFilterForSearch?: any;
  tagClick?: any;
  language: any;
}

export default SearchResultList;
