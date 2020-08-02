import React, { useEffect } from "react";
import economic from "../../../../public/image/affordable.svg";
import offRoad from "../../../../public/image/SUV.svg";

import Car from "./car";
// import "./search_result.scss";
import CarLoading from "../../../components/cartPlaceholder/CarLoading";

let quickAccessClick = false;
const SearchResultList = (props: ISearchResultList) => {
  useEffect(() => {
    if (props.result) {
      if (props.result.length > 0) {
        let startString = props.result[0].start_date.split("/");
        let endString = props.result[0].end_date.split("/");
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
  }, [props.result]);

  useEffect(() => {
    return () => {
      quickAccessClick = false;
    };
  }, []);

  return (
    <section className="search_result_section minHeight">
      {props.result ? (
        props.result.length > 0 ? (
          props.result.map((item, i) => {
            return i === 3 && !quickAccessClick ? (
              <section className="quick_access_middle_searchResult">
                <h2>دسترسی سریع</h2>
                <div className="quick_access_child_container">
                  <div
                    onClick={() => {
                      window.scrollTo(0, 0);
                      quickAccessClick = true;
                      props.setFilterForSearch({
                        body_style_id: { value: [2], status: true },
                      });
                    }}
                  >
                    <img src={offRoad} alt="خودرو های شاسی‌بلند" />
                    <p>خودرو های شاسی‌بلند</p>
                  </div>
                  <div
                    onClick={() => {
                      window.scrollTo(0, 0);
                      quickAccessClick = true;
                      props.setFilterForSearch({
                        price: { value: ["0", "1000000"], status: true },
                      });
                    }}
                  >
                    <img src={economic} alt="خودرو های اقتصادی" />
                    <p>خودرو های اقتصادی</p>
                  </div>
                </div>
              </section>
            ) : (
              <Car key={i} data={item} />
            );
          })
        ) : (
          <p className="Not_Result">
            متاسفانه نتیجه‌ای برای جستجوی شما پیدا نشد.
            <br />
            <br />
            اگر از فیلترها استفاده کرده‌اید می‌توانید آنها را غیرفعال کنید یا
            تاریخ‌های دیگر را امتحان کنید.
            <br />
            همیشه می‌توانید با پشتیبانی اتولی (
            <a href="tel:02188567759">۰۲۱۸۸۵۶۷۷۵۹</a>) تماس بگیرید.
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
  setFilterForSearch: any;
  result: any;
}

export default SearchResultList;
