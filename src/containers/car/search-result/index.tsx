import React from "react";

import Car from "./car";
import './search_result.module.scss'

const SearchResultList = props => {
  return (
    <section className="search_result_section">
      {props.result.length > 0 &&
        props.result.map((item, i) => {
          return <Car key={i} data={item} />;
        })}
    </section>
  );
};

export default SearchResultList;
