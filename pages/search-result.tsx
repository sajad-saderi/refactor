import React, { useEffect, useState, useContext } from "react";
import Router from "next/router";
import { REQUEST_GET_SEARCH_FOR_RENT } from "../src/API";
import Filters from "../src/containers/Filters";

import filterContext from "../src/context/filter-context";
import SearchResultList from "../src/containers/car/search-result";

let Location: any = 1;
let Start_date = null;
let End_date = null;
let page = 1;
let price = {
  min: null,
  max: null
};
let o = "-price";
let loadMoreCar = false;

const SearchResult = () => {
  const [result, setResult] = useState([]);

  useEffect(() => {
    const { location_id, start_date, end_date } = Router.router.query;
    Location = location_id;
    Start_date = start_date;
    End_date = end_date;
    initSearch();
  }, []);

  async function initSearch() {
    console.log(Start_date, End_date);

    let queryString = `location_id=${Location}&start_date=${Start_date}&end_date=${End_date}&o=${o}`;
    if (price.min && price.max)
      queryString += `&min_price=${price.min}&max_price=${price.max}`;
    const res: any = await REQUEST_GET_SEARCH_FOR_RENT({
      queryString,
      limit: 14,
      page
    });
    if (loadMoreCar) {
      setResult(result.concat(res.results));
      loadMoreCar = false;
    } else setResult(res.results);
  }

  function filterResults(v) {
    page =1
    price = {
      min: +v[0],
      max: +v[1]
    };
    initSearch();
  }

  const loadMore = () => {
    page = 1 + page;
    loadMoreCar = true;
    price = {
      min: null,
      max: null
    };
    initSearch();
  };

  return (
    <>
      <filterContext.Provider
        value={{
          setDataForSearch: v => {
            filterResults(v);
          }
        }}
      >
        <Filters />
      </filterContext.Provider>
      <SearchResultList result={result} />
      <span onClick={() => loadMore()}>نمایش بیشتر</span>
    </>
  );
};

export default SearchResult;
