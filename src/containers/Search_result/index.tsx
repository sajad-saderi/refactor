import React, { useState, useEffect, useRef } from "react";
import filterContext from "../../context/filter-context";
import Filters from "../Filters";
import SearchResultList from "../car/search-result";
import Router from "next/router";
import { REQUEST_GET_SEARCH_FOR_RENT } from "../../API";
// import "./Search_result.scss";
import { NextSeo } from "next-seo";
import Spinner from "../../components/Spinner";
import jsCookie from "js-cookie";
import { IoMdClose, IoIosOptions, IoIosArrowUp } from "react-icons/io";
import Search from "../Search";

let JumpTo = null;
// default location is Tehran
let Location: any = 1;
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
  price: false,
  with_driver: false,
  body_style_id: false,
  deliver_at_renters_place: false,
  brand_id: false,
  car_id: false,
};

// Set position
let position = 0;

const Search_result = () => {
  const [result, setResult] = useState(null);
  const [extra_info, setExtra_info] = useState([]);
  const [total_count, setTotal_count] = useState(0);
  const [remained_count, setRemained_count] = useState(0);
  const [show_spinner_loadMore, setShow_spinner_loadMore] = useState(false);
  const [show_filter, setShow_filter] = useState(false);
  const [showSearch, setShowSearch] = useState(false);
  const [filterReset, setFilterReset] = useState({
    price: false,
    with_driver: false,
    body_style_id: false,
    deliver_at_renters_place: false,
    brand_id: false,
    car_id: false,
  })

  const new_search_ref = useRef(null)


  useEffect(() => {
    // get the data from url
    const { location_id, start_date, end_date } = Router.router.query;
    Location = location_id;
    Start_date = start_date;
    End_date = end_date;
    initSearch();

    const handleRouteChange = (url) => {
      if (url.includes("/car/")) {
        jsCookie.set("page", page);
      } else {
        let JumpTo = null;
        jsCookie.remove("JumpTo");
      }
    };

    // reset the data
    Router.events.on("routeChangeStart", handleRouteChange);
    return () => {
      Router.events.off("routeChangeStart", handleRouteChange);
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
        price: false,
        with_driver: false,
        body_style_id: false,
        deliver_at_renters_place: false,
        brand_id: false,
        car_id: false,
      };
    };
  }, []);

  async function initSearch() {
    JumpTo = jsCookie.get("JumpTo");

    // reset the data
    if (!loadMoreCar) {
      setResult(null);
    }
    // reset the filter
    setExtra_info([]);
    let queryString = `location_id=${Location}&start_date=${Start_date}&end_date=${End_date}&o=${o}`;
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
      let limit = 15;
      if (JumpTo === "1") {
        limit = 15 * jsCookie.get("page");
      }
      const res: any = await REQUEST_GET_SEARCH_FOR_RENT({
        queryString,
        limit: limit,
        page,
      });
      setTotal_count(res.total_count);
      setRemained_count(res.remained_count);

      setExtra_info(res.extra_info);
      if (loadMoreCar) {
        setShow_spinner_loadMore(false);
        setResult(result.concat(res.results));
        loadMoreCar = false;
      } else {
        setResult(res.results);
      }
      if (JumpTo === "1") {
        window.scrollTo(0, position);
        jsCookie.remove("JumpTo");
        page = +jsCookie.get("page");
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
    setShow_spinner_loadMore(true);
    initSearch();
  };

  const getClickPosition = () => {
    position = window.scrollY;
  };

  const clearReset = (v) => {
    switch (v) {
      case "price":
        setFilterReset(filterReset => {
          return { ...filterReset, price: false }
        })
        break;
      case "with_driver":
        setFilterReset(filterReset => {
          return { ...filterReset, with_driver: false }
        })
        break;

      case "body_style_id":
        setFilterReset(filterReset => {
          return { ...filterReset, body_style_id: false }
        })
        break;

      case "deliver_at_renters_place":
        setFilterReset(filterReset => {
          return { ...filterReset, deliver_at_renters_place: false }
        })
        break;
      case "brand_id":
        setFilterReset(filterReset => {
          return { ...filterReset, brand_id: false }
        })
        break;
      case "car_id":
        setFilterReset(filterReset => {
          return { ...filterReset, car_id: false }
        })
        break;

      default:
        setFilterReset({
          price: false,
          with_driver: false,
          body_style_id: false,
          deliver_at_renters_place: false,
          brand_id: false,
          car_id: false,
        })
        break;
    }
  }

  return (
    <article
      className="search_result_page_container"
      onClick={getClickPosition}
    >
      {result && (
        <NextSeo
          title={`جستجو برای تهران، از ${Start_date} تا ${End_date} | اتولی`}
          description="اتولی سامانه‌ای است برای اجاره خودرو به‌صورت آنلاین. با اتولی هم می‌توانید ماشین اجاره کنید و هم از اجاره ماشین خود کسب درآمد کنید."
          openGraph={{
            title: `درباره اتولی`,
            description:
              "اتولی سامانه‌ای است برای اجاره خودرو به‌صورت آنلاین. با اتولی هم می‌توانید ماشین اجاره کنید و هم از اجاره ماشین خود کسب درآمد کنید.",
            site_name: "اتولی",
          }}
          twitter={{
            handle: "@otoli_net",
            site: "@otoli_net",
            cardType: "summary_large_image",
          }}
        />
      )}
      {/* result count section */}
      <div className="count_bar_container"
        ref={new_search_ref}
      >
        {result
          ? result.length > 0 && (
            <div className="count_bar responsive" onClick={() => { setShowSearch(!showSearch) }}>
              {!showSearch ? <p className="count_bar_count">{`${total_count} خودرو ${result[0].start_date.slice(
                5
              )} تا ${result[0].end_date.slice(5)}`}</p> : null}
              <p className="change_search_btn" >
                {showSearch
                  ? <span className="close_text_btn">
                    بستن
                    <IoMdClose size="2rem" color="#dcdcdc" />
                  </span>
                  : "تغییر جستجو"}
              </p>
            </div>
          )
          : <p className="count_bar_count_empty"></p>
        }
        {/* search box */}
        <section
          className={["new_search_in_landing", showSearch ? "show_search_section" : null].join(" ")}>
          <div className="responsive">
            <Search
              dynamic={true}
              searchSubmit={(v) => {
                Start_date = v.date.Start_date;
                End_date = v.date.End_date;
                setShowSearch(false)
                initSearch();
              }}
            />
          </div>
        </section>
        {showSearch ? <IoIosArrowUp className="Arrow_up_change_search" color="#dcdcdc" size="2rem" onClick={() => setShowSearch(false)} /> : null}
      </div>
      {/* search box */}
      <section className="responsive">
        {/* price sort part */}
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
          {/* Trigger icon in mobile view */}
          <p className="show_filter" onClick={() => setShow_filter(true)}>
            جستجوی پیشرفته
            <IoIosOptions size="1.4rem" color="#656565" />
          </p>
        </div>
      </section>
      <section className="responsive minimal_filters">
        {filtersChecker.price ? <p className="minimal_filter_tags" onClick={() => {
          setFilterReset(filterReset => {
            return { ...filterReset, price: true }
          })
          filtersChecker.price = false;
          initSearch()
        }}>
          <IoMdClose size="1.3rem" color="#ababab" />
          قیمت از {price.min.toLocaleString()} تا {price.max.toLocaleString()}
        </p>
          : null
        }
        {filtersChecker.deliver_at_renters_place ? <p className="minimal_filter_tags" onClick={() => {
          setFilterReset(filterReset => {
            return { ...filterReset, deliver_at_renters_place: true }
          })
          filtersChecker.deliver_at_renters_place = false;
          initSearch()
        }}>
          <IoMdClose size="1.3rem" color="#ababab" />
          تحویل در محل
        </p>
          : null
        }
        {filtersChecker.with_driver ? <p className="minimal_filter_tags" onClick={() => {
          setFilterReset(filterReset => {
            return { ...filterReset, with_driver: true }
          })
          filtersChecker.with_driver = false;
          initSearch()
        }}>
          <IoMdClose size="1.3rem" color="#ababab" />
          اجاره همراه راننده
        </p>
          : null
        }
        {filtersChecker.body_style_id ? <p className="minimal_filter_tags" onClick={() => {
          setFilterReset(filterReset => {
            return { ...filterReset, body_style_id: true }
          })
          filtersChecker.body_style_id = false;
          initSearch()
        }}>
          <IoMdClose size="1.3rem" color="#ababab" />
          فیلتر نوع بدنه
        </p>
          : null
        }
        {filtersChecker.brand_id ? <p className="minimal_filter_tags" onClick={() => {
          setFilterReset(filterReset => {
            return { ...filterReset, brand_id: true }
          })
          filtersChecker.brand_id = false;
          filtersChecker.car_id = false;
          initSearch()
        }}>
          <IoMdClose size="1.3rem" color="#ababab" />
          فیلتر براساس سازنده
        </p>
          : null
        }
        {filtersChecker.car_id ? <p className="minimal_filter_tags" onClick={() => {
          setFilterReset(filterReset => {
            return { ...filterReset, car_id: true }
          })
          filtersChecker.car_id = false;
          initSearch()
        }}>
          <IoMdClose size="1.3rem" color="#ababab" />
          فیلتر براساس نام مدل
        </p>
          : null
        }
      </section>
      {/* filters and result section */}
      <section className="responsive content_container">
        <filterContext.Provider
          value={{
            setDataForSearch: (v) => {
              filterResults(v);
            },
          }}
        >
          <Filters extra_info={extra_info} ResultCount={{ total_count, remained_count }}
            reset={filterReset}
            clearReset={clearReset}
            show_filter_prop={show_filter}
            show_filter_prop_reset={() => { setShow_filter(false) }}
          />
        </filterContext.Provider>
        <SearchResultList result={result} />
      </section>
      {/* load more */}
      {
        remained_count > 0 && (
          <span className="Load_more_car HEAP_SearchResult_Btn_ShowMore" onClick={() => loadMore()}>
            {show_spinner_loadMore ? (
              <Spinner display="block" width={20} color="#9E9E9E" />
            ) : (
                "نمایش ماشین‌های بیشتر"
              )}
          </span>
        )
      }
    </article >
  );
};

export default Search_result;
