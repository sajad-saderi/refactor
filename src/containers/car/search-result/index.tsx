import React from "react";

import Car from "./car";

const SearchResultList = props => {
  return (
    props.result.length > 0 &&
    props.result.map((item, i) => {
      return <Car key={i} data={item} />;
    })
  );
};

export default SearchResultList;
