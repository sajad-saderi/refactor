import React from "react";

import Car from "./car";
// import "./search_result.scss";
import CarLoading from "../../../components/cartPlaceholder/CarLoading";

const SearchResultList = (props) => {
  return (
    <section className="search_result_section minHeight">
      {/* {props.result ? ( */}
      {false ? (
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
