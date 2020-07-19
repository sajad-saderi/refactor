import React, { useEffect } from "react";

import Car from "./car";
// import "./search_result.scss";
import CarLoading from "../../../components/cartPlaceholder/CarLoading";

const SearchResultList = (props) => {
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

  return (
    <section className="search_result_section minHeight">
      {props.result ? (
        props.result.length > 0 ? (
          props.result.map((item, i) => {
            return <Car key={i} data={item} />;
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

export default SearchResultList;
