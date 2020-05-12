import React, { useState, useEffect } from "react";
import filterContext from "../../context/filter-context";
import Filters from "../Filters";
import SearchResultList from "../car/search-result";
import { REQUEST_GET_SEARCH_FOR_RENT } from "../../API";
import moment from "moment-jalaali";
// import "./Search_result.scss";
import Search from "../Search";

// default location is Tehran
let Location = 1;
let Start_date = null;
let End_date = null;
// start page is 1
let page = 1;
let price = {
  min: null,
  max: null,
};
// default price sort is form highest to lowest price  -> descending
let o = "-price";
let loadMoreCar = false;
let deliver_at_renters_place = 0;
let with_driver = 0;
let body_style_id = [];
let brand_id = null;
let car_id = null;

// this object check which filter is activated
// you can combined several filter in a single search request
let filtersChecker = {
  Location: false,
  price: false,
  with_driver: false,
  body_style_id: false,
  deliver_at_renters_place: false,
  brand_id: false,
  car_id: false,
};

const Landing_page_container = (props: ILanding_page_container) => {
  const [result, setResult] = useState(null);
  const [extra_info, setExtra_info] = useState([]);
  const [total_count, setTotal_count] = useState(0);
  const [remained_count, setRemained_count] = useState(0);

  useEffect(() => {
    // reset the data
    return () => {
      Location = 1;
      Start_date = null;
      End_date = null;
      page = 1;
      price = {
        min: null,
        max: null,
      };
      o = "-price";
      loadMoreCar = false;
      deliver_at_renters_place = 0;
      with_driver = 0;
      body_style_id = [];
      brand_id = null;
      car_id = null;
      filtersChecker = {
        Location: false,
        price: false,
        with_driver: false,
        body_style_id: false,
        deliver_at_renters_place: false,
        brand_id: false,
        car_id: false,
      };
    };
  }, []);

  useEffect(() => {
    // if start date and end date is not set, automatically show the result for 3 to 6 days ahead
    const Today = moment().format("jYYYY/jMM/jDD");
    Start_date = moment(Today)
      .add(3, "day")
      .format("YYYY/MM/DD");
    End_date = moment(Today)
      .add(6, "day")
      .format("YYYY/MM/DD");
    initSearch();
  }, [props.landing_data]);

  async function initSearch() {
    // set the filter name
    const searchParamKey: any = Object.keys(props.landing_data.search_params);
    setResult(null);
    setExtra_info([]);
    // filter by landing page unique parameter
    let queryString = `${searchParamKey}=${props.landing_data.search_params[searchParamKey]}&start_date=${Start_date}&end_date=${End_date}&o=${o}`;
    // check the location filer
    if (filtersChecker.Location) {
      queryString += `&location_id=${Location}`;
    }
    // check the price sort
    if (filtersChecker.price) {
      queryString += `&min_price=${price.min}&max_price=${price.max}`;
    }
    // check the delivery option
    if (filtersChecker.deliver_at_renters_place) {
      queryString += `&deliver_at_renters_place=1`;
    }
    // with driver
    if (filtersChecker.with_driver) {
      queryString += `&with_driver=1`;
    }
    // body style
    if (filtersChecker.body_style_id) {
      queryString += `&body_style_id=${body_style_id.join(",")}`;
    }
    // check the brand id
    if (filtersChecker.brand_id) {
      queryString += `&brand_id=${brand_id}`;
    }
    // check the car id
    if (filtersChecker.car_id) {
      queryString += `&car_id=${car_id}`;
    }
    try {
      const res: any = await REQUEST_GET_SEARCH_FOR_RENT({
        queryString,
        limit: 14,
        page,
      });
      setTotal_count(res.total_count);
      setRemained_count(res.remained_count);

      setExtra_info(res.extra_info);
      if (loadMoreCar) {
        // add the new result to old result
        setResult(result.concat(res.results));
        loadMoreCar = false;
      } else {
        setResult(res.results);
      }
    } catch (error) {
      console.log("!Error", error);
    }
  }

  // adjust the filter object to send for search
  /**
   *
   * @param v
   *  set the data from filter context
   */
  function filterResults(v) {
    if (v.price) {
      filtersChecker.price = v.price.status;
      price = {
        min: +v.price.value[0],
        max: +v.price.value[1],
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
      {/* result count section */}
      {result
        ? result.length > 0 && (
            <p className="count_bar_count">{`${total_count} خودرو نتیجه جستجو از تاریخ ${result[0].start_date.slice(
              5
            )} تا ${result[0].end_date.slice(5)}`}</p>
          )
        : null}
      {/* search box */}
      <section className="new_search_in_landing">
        <div className="responsive">
          <Search
            dynamic={true}
            searchSubmit={(v) => {
              // if we are not in dynamic page don't need to check loaction filter
              if (v.location_id !== 1) {
                filtersChecker.Location = true;
              }
              Start_date = v.date.Start_date;
              End_date = v.date.End_date;
              initSearch();
            }}
          />
        </div>
      </section>
      {/* price sort part */}
      <section className="responsive">
        <div className="price_sort_container">
          <span
            className={o === "-price" ? "active" : null}
            onClick={() => {
              o = "-price";
              initSearch();
            }}
          >
            قیمت زیاد به کم
          </span>
          <span
            className={o === "price" ? "active" : null}
            onClick={() => {
              o = "price";
              initSearch();
            }}
          >
            قیمت کم به زیاد
          </span>
        </div>
      </section>
      {/* filters and result section */}
      <section className=" responsive content_container">
        <filterContext.Provider
          value={{
            setDataForSearch: (v) => {
              filterResults(v);
            },
          }}
        >
          <Filters extra_info={extra_info} />
        </filterContext.Provider>
        <SearchResultList result={result} />
      </section>
      {/* load more */}
      {remained_count > 0 && (
        <span className="Load_more_car" onClick={() => loadMore()}>
          نمایش ماشین‌های بیشتر
        </span>
      )}
    </article>
  );
};

interface ILanding_page_container {
  // dynamic page data
  landing_data: any;
}

export default Landing_page_container;
