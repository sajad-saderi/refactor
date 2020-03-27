import react, { useState, useEffect } from "react";
import filterContext from "../../context/filter-context";
import Filters from "../Filters";
import SearchResultList from "../car/search-result";
import Router from "next/router";
import { REQUEST_GET_SEARCH_FOR_RENT } from "../../API";
import "./Search_result.module.scss";

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
let deliver_at_renters_place = 0;
let with_driver = 0;
let body_style_id = [];
let brand_id = null;
let car_id = null;
let filtersChecker = {
  price: false,
  with_driver: false,
  body_style_id: false,
  deliver_at_renters_place: false,
  brand_id: false,
  car_id: false
};
const Search_result = () => {
  const [result, setResult] = useState([]);
  const [extra_info, setExtra_info] = useState([]);

  useEffect(() => {
    const { location_id, start_date, end_date } = Router.router.query;
    Location = location_id;
    Start_date = start_date;
    End_date = end_date;
    initSearch();
  }, []);

  async function initSearch() {
    setResult([]);
    setExtra_info([]);
    let queryString = `location_id=${Location}&start_date=${Start_date}&end_date=${End_date}&o=${o}`;
    if (filtersChecker.price) {
      queryString += `&min_price=${price.min}&max_price=${price.max}`;
    }
    if (filtersChecker.deliver_at_renters_place) {
      queryString += `&deliver_at_renters_place=1`;
    }
    if (filtersChecker.with_driver) {
      queryString += `&with_driver=1`;
    }
    if (filtersChecker.body_style_id) {
      queryString += `&body_style_id=${body_style_id.join(",")}`;
    }
    if (filtersChecker.brand_id) {
      queryString += `&brand_id=${brand_id}`;
    }
    if (filtersChecker.car_id) {
      queryString += `&car_id=${car_id}`;
    }
    const res: any = await REQUEST_GET_SEARCH_FOR_RENT({
      queryString,
      limit: 14,
      page
    });
    console.log(res);
    
    if (loadMoreCar) {
      setExtra_info(res.extra_info);
      setResult(result.concat(res.results));
      loadMoreCar = false;
    } else {
      setExtra_info(res.extra_info);
      setResult(res.results);
    }
  }

  function filterResults(v) {
    if (v.price) {
      filtersChecker.price = v.price.status;
      price = {
        min: +v.price.value[0],
        max: +v.price.value[1]
      };
    }
    if (v.deliver_at_renters_place) {
      filtersChecker.deliver_at_renters_place =
        v.deliver_at_renters_place.status;
      deliver_at_renters_place = v.deliver_at_renters_place.value;
    }
    if (v.with_driver) {
      filtersChecker.with_driver = v.with_driver.status;
      with_driver = v.with_driver.value;
    }
    if (v.body_style_id) {
      filtersChecker.body_style_id = v.body_style_id.status;
      body_style_id = v.body_style_id.value;
    }
    if (v.brand_id) {
      filtersChecker.brand_id = v.brand_id.status;
      brand_id = v.brand_id.value;
    }
    if (v.car_id) {
      filtersChecker.car_id = v.car_id.status;
      car_id = v.car_id.value;
    }
    page = 1;
    initSearch();
  }

  const loadMore = () => {
    page = 1 + page;
    loadMoreCar = true;
    initSearch();
  };

  return (
    <article className="search_result_page_container">
      <section className="content_container">
        <filterContext.Provider
          value={{
            setDataForSearch: v => {
              filterResults(v);
            }
          }}
        >
          <Filters extra_info={extra_info} />
        </filterContext.Provider>
        <SearchResultList result={result} />
      </section>
      <span onClick={() => loadMore()}>نمایش بیشتر</span>
    </article>
  );
};

export default Search_result;
