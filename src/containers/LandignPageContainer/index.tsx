import { useState, useEffect, useRef, useContext } from "react";
import filterContext from "../../context/filter-context";
import dynamic from "next/dynamic";

const SearchResultList = dynamic(() => import("../car/search-result"));

// const Filters = dynamic(() => import("../Filters"));
const Search = dynamic(() => import("../Search"));
const Spinner = dynamic(() => import("../../components/Spinner"));

// import SearchResultList from "../car/search-result";
import { REQUEST_GET_SEARCH_FOR_RENT } from "../../API";
import { useRouter } from "next/router";
import moment from "moment-jalaali";
// import "./Search_result.scss";
// import Spinner from "../../components/Spinner";
import UrlCreator from "../../../utils/UrlCreator";
import UrlChecker from "../../../utils/UrlChecker";
import search_query_builder from "../../../utils/search-query-builder";
import net_CTX from "../../context/internetConnectionCTX";
import languageCTX from "../../context/languageCTX";
import AppStore from "../../context/app";
import { twoWayDateConvertor } from "../../helpers/dateControler";

import Filters from "../Filters";
import { dynamicString } from "../../helpers/dynamicString";
import { numberChanger } from "../../../utils/numberChanger";
import Icon from "../../components/Icons";
// import Search from "../Search";

// let Glob_route = null;
// default location is Tehran
let staticRoute = null;
let Location = 1;
let location_n = "";
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
let without_driver = 0;
let body_style_id = [];
let body_style_names = [];
let brand_id = null;
let brand_name = null;
let car_id = null;
let car_name = null;
let result_key = null;
let category_id = null;
let category_name = "...";
let inactive_the_category = null;

// this object check which filter is activated
// you can combined several filter in a single search request
let filtersChecker = {
  Location: false,
  price: false,
  with_driver: false,
  without_driver: false,
  body_style_id: false,
  deliver_at_renters_place: false,
  brand_id: false,
  car_id: false,
  category_id: false,
};

const Landing_page_container = ({
  landing_data,
  language,
  content,
}: ILanding_page_container) => {
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState(null);
  const [extra_info, setExtra_info] = useState<any>([]);
  const [total_count, setTotal_count] = useState(0);
  const [remained_count, setRemained_count] = useState(0);
  const [show_spinner_loadMore, setShow_spinner_loadMore] = useState(false);
  const [show_filter, setShow_filter] = useState(false);
  const [showSearch, setShowSearch] = useState(false);
  const [sliderRange, setSliderRange] = useState([]);
  const [sliderPrice, setSliderPrice] = useState([]);
  const [filterReset, setFilterReset] = useState({
    location: false,
    price: false,
    with_driver: false,
    without_driver: false,
    body_style_id: false,
    deliver_at_renters_place: false,
    brand_id: false,
    car_id: false,
    category_id: false,
  });
  const [carLocationName, setCarLocationName] = useState("");
  const new_search_ref = useRef(null);
  const router = useRouter();
  const netCTX = useContext(net_CTX);
  const { activeLanguage } = useContext(languageCTX);
  const appStore = useContext(AppStore);
  const handleClickOutside = (e) => {
    // If the click is outside of the drop-down box the drop-down section will be close
    if (!new_search_ref.current.contains(e.target)) {
      setShowSearch(false);
      return;
    }
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    // reset the data
    return () => {
      // Glob_route = null;
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
      without_driver = 0;
      body_style_id = [];
      body_style_names = [];
      brand_id = null;
      brand_name = null;
      car_id = null;
      result_key = null;
      category_name = null;
      category_id = null;
      inactive_the_category = null;
      filtersChecker = {
        Location: false,
        price: false,
        with_driver: false,
        without_driver: false,
        body_style_id: false,
        deliver_at_renters_place: false,
        brand_id: false,
        car_id: false,
        category_id: false,
      };
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  useEffect(() => {
    // Glob_route = `/rent/${router.query.id}`;
    const { search_params } = landing_data;

    const url_checked = UrlChecker(
      { ...router.query, ...search_params },
      router.locale
    );
    staticRoute = { ...router.query, ...search_params };
    if (url_checked.location_id) {
      filtersChecker.Location = true;
      setCarLocationName(url_checked.location_n);
      Location = url_checked.location_id;
      location_n = url_checked.location_name;
    }
    o = url_checked.price_order;
    if (url_checked.page > 1) {
      page = url_checked.page;
    }
    if (url_checked.min_price > 0 || url_checked.max_price < 10000000) {
      price.min = url_checked.min_price;
      price.max = url_checked.max_price;
      filtersChecker.price = true;
      price = {
        min: url_checked.min_price,
        max: url_checked.max_price,
      };
    }
    if (router.query.deliver_at_renters_place === "1") {
      filtersChecker.deliver_at_renters_place = true;
    }
    deliver_at_renters_place = +url_checked.deliver_at_renters_place;
    if (router.query.with_driver == "1" || url_checked.with_driver == "1") {
      filtersChecker.with_driver = true;
    }
    with_driver = +url_checked.with_driver;

    if (
      router.query.without_driver == "1" ||
      url_checked.without_driver == "1"
    ) {
      filtersChecker.without_driver = true;
    }
    without_driver = +url_checked.without_driver;

    if (router.query.category_id) {
      filtersChecker.category_id = true;
    }
    category_id = +url_checked.category_id;

    if (url_checked.body_style_id !== "") {
      filtersChecker.body_style_id = true;
      body_style_id = url_checked.body_style_id
        ? [url_checked.body_style_id]
        : [];
    }
    if (url_checked.brand_id !== "") {
      brand_id = +url_checked.brand_id;
      filtersChecker.brand_id = true;
    }
    if (url_checked.car_id !== "") {
      car_id = +url_checked.car_id;
      filtersChecker.car_id = true;
    }

    if (localStorage["start"] && localStorage["start"] !== "null") {
      let start = JSON.parse(localStorage["start"]);
      let end = JSON.parse(localStorage["end"]);
      Start_date = `${start.year}/${start.month}/${start.day}`;
      End_date = `${end.year}/${end.month}/${end.day}`;
    } else {
      // if start date and end date is not set, automatically show the result for 3 to 6 days ahead
      const Today = moment().format("jYYYY/jMM/jDD");
      Start_date = url_checked.start_date;

      End_date = url_checked.end_date;
    }
    initSearch();
  }, [landing_data]);

  async function initSearch() {
    setLoading(true);
    // set the filter name
    body_style_names = [];
    // setSliderRange([]);
    // const searchParamKey: any = Object.keys(landing_data.search_params);
    let activeParamsArray = Object.keys(landing_data.search_params);
    if (activeParamsArray.includes("category_id") && !inactive_the_category) {
      filtersChecker.category_id = true;
    }

    if (!loadMoreCar) {
      page = 1;
      setResult(null);
    }
    setExtra_info([]);
    // filter by landing page unique parameter
    // let queryString = `${searchParamKey}=${landing_data.search_params[searchParamKey]}&start_date=${Start_date}&end_date=${End_date}&o=${o}`;
    // check the location filer
    // if (filtersChecker.Location) {
    //   queryString += `&location_id=${Location}`;
    // }
    // // check the price sort
    // if (filtersChecker.price) {
    //   queryString += `&min_price=${price.min}&max_price=${price.max}`;
    // }
    // // check the delivery option
    // if (filtersChecker.deliver_at_renters_place) {
    //   queryString += `&deliver_at_renters_place=1`;
    // }
    // // with driver
    // if (filtersChecker.with_driver) {
    //   queryString += `&with_driver=1`;
    // }
    // // body style
    // if (filtersChecker.body_style_id) {
    //   queryString += `&body_style_id=${body_style_id.join(",")}`;
    // }
    // // check the brand id
    // if (filtersChecker.brand_id) {
    //   queryString += `&brand_id=${brand_id}`;
    // }
    // // check the car id
    // if (filtersChecker.car_id) {
    //   queryString += `&car_id=${car_id}`;
    // }
    try {
      let searchQuery = null;
      if (loadMoreCar) {
        searchQuery = search_query_builder({
          result_key,
          page,
          limit: 15,
          price_order: o,
        });
      } else {
        searchQuery = search_query_builder({
          location_id: Location,
          start_date: Start_date,
          end_date: End_date,
          price_order: o,
          min_price: filtersChecker.price
            ? price.min
              ? price.min
              : null
            : null,
          max_price: filtersChecker.price
            ? price.max
              ? price.max
              : null
            : null,
          deliver_at_renters_place: filtersChecker.deliver_at_renters_place
            ? 1
            : 0,
          with_driver: filtersChecker.with_driver ? 1 : 0,
          without_driver: filtersChecker.without_driver ? 1 : 0,
          body_style_id: filtersChecker.body_style_id
            ? body_style_id.join(",")
            : null,
          brand_id: filtersChecker.brand_id ? brand_id : null,
          car_id: filtersChecker.car_id ? car_id : null,
          category_id: filtersChecker.category_id ? category_id : null,
          // [searchParamKey]: searchParamKey
          //   ? landing_data.search_params[searchParamKey]
          //   : null,
          page,
          limit: 15,
        });
      }
      const res: any = await REQUEST_GET_SEARCH_FOR_RENT({
        searchQuery,
      });
      setLoading(false);
      result_key = res.result_key;
      setTotal_count(res.total_count);
      setRemained_count(res.remained_count);
      filter_checker_controller({
        params: res.extra_info.params,
        pre_loads: res.extra_info.pre_loads,
        sliderMin: res.extra_info.avg_price_per_day_min,
        sliderMax: res.extra_info.avg_price_per_day_max,
      });

      if (filtersChecker.category_id) {
        category_name =
          res.extra_info.pre_loads.category_set[0].name[activeLanguage];
      }
      setExtra_info(res.extra_info);
      if (loadMoreCar) {
        // add the new result to old result
        setShow_spinner_loadMore(false);
        setResult(result.concat(res.results));
        loadMoreCar = false;
      } else {
        setResult(res.results);
      }
    } catch (error) {
      setLoading(false);
      if (error === 111) {
        netCTX.toggleTheContainer(true);
      }
    }
  }

  useEffect(() => {
    Location = appStore.store.location.id;
  }, [appStore.store.location.id]);

  // const pre_load_controller = (data) => {
  //   const;
  // };

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
      staticRoute.min_price = +v.price.value[0];
      staticRoute.max_price = +v.price.value[1];
    }
    if (v.deliver_at_renters_place) {
      filtersChecker.deliver_at_renters_place =
        v.deliver_at_renters_place.status;
      deliver_at_renters_place = v.deliver_at_renters_place.value;
      staticRoute.deliver_at_renters_place = v.deliver_at_renters_place.value;
    }
    if (v.with_driver) {
      filtersChecker.with_driver = v.with_driver.status;
      with_driver = v.with_driver.value;
      staticRoute.with_driver = v.with_driver.value;
    }
    if (v.without_driver) {
      filtersChecker.without_driver = v.without_driver.status;
      without_driver = v.without_driver.value;
      staticRoute.without_driver = v.without_driver.value;
    }
    if (v.body_style_id) {
      if (v.body_style_id.value.length === 0) {
        filtersChecker.body_style_id = false;
      } else {
        filtersChecker.body_style_id = v.body_style_id.status;
      }
      body_style_id = v.body_style_id.value;
      staticRoute.body_style_id =
        v.body_style_id.value.length === 0
          ? ""
          : v.body_style_id.value.join(",");
    }
    if (v.brand_id) {
      filtersChecker.brand_id = v.brand_id.status;
      brand_id = v.brand_id.value;
      staticRoute.brand_name = v.brand_id.value
        ? v.brand_id.name[activeLanguage].replace(/ +/g, "-")
        : "";
      staticRoute.brand_id = v.brand_id.value ? v.brand_id.value : "";
    }
    if (v.car_id) {
      filtersChecker.car_id = v.car_id.status;
      car_id = v.car_id.value;
      staticRoute.car_name = v.car_id.value
        ? v.car_id.name[activeLanguage].replace(/ +/g, "-")
        : "";
      staticRoute.car_id = v.car_id.value ? v.car_id.value : "";
    }
    UrlCreator({
      query: staticRoute,
      route: router.route,
      cb: UrlUpdater,
    });
    page = 1;
    initSearch();
  }

  const loadMore = () => {
    page = 1 + page;
    setShow_spinner_loadMore(true);
    loadMoreCar = true;
    staticRoute = {
      ...staticRoute,
      page: page,
    };
    // UrlCreator({
    //   query: staticRoute,
    //   route: router.route,
    //   cb: UrlUpdater,
    // });
    initSearch();
  };

  const clearReset = (v) => {
    switch (v) {
      case "location":
        setFilterReset((filterReset) => {
          return { ...filterReset, location: false };
        });
        break;
      case "price":
        setFilterReset((filterReset) => {
          return { ...filterReset, price: false };
        });
        break;
      case "with_driver":
        setFilterReset((filterReset) => {
          return { ...filterReset, with_driver: false };
        });
        break;
      case "without_driver":
        setFilterReset((filterReset) => {
          return { ...filterReset, without_driver: false };
        });
        break;
      case "body_style_id":
        setFilterReset((filterReset) => {
          return { ...filterReset, body_style_id: false };
        });
        break;

      case "deliver_at_renters_place":
        setFilterReset((filterReset) => {
          return { ...filterReset, deliver_at_renters_place: false };
        });
        break;
      case "brand_id":
        setFilterReset((filterReset) => {
          return { ...filterReset, brand_id: false, car_id: false };
        });
        break;
      case "car_id":
        setFilterReset((filterReset) => {
          return { ...filterReset, car_id: false };
        });
        break;
      case "category_id":
        setFilterReset((filterReset) => {
          return { ...filterReset, category_id: false };
        });
        break;

      default:
        setFilterReset({
          location: false,
          price: false,
          with_driver: false,
          without_driver: false,
          body_style_id: false,
          deliver_at_renters_place: false,
          brand_id: false,
          car_id: false,
          category_id: false,
        });
        break;
    }
  };

  const searchIgniteByClickOnCardTags = (tag) => {
    if (tag.type === "location") {
      setCarLocationName(tag.name);
      appStore.setLocation({ value: tag.value, text: tag.name, en: tag.name });
      clearReset("");
      loadMoreCar = false;
      filtersChecker.Location = true;
      Location = tag.value;
      staticRoute = {
        ...staticRoute,
        location_id: tag.value,
        location_name: tag.name,
      };
      UrlCreator({
        query: staticRoute,
        route: router.route,
        cb: UrlUpdater,
      });
      initSearch();
    }
  };

  const filter_checker_controller = ({
    params,
    pre_loads,
    sliderMin,
    sliderMax,
  }) => {
    let min = params.min_price ? params.min_price : sliderMin;
    let max = params.max_price ? params.max_price : sliderMax;
    if (params.min_price || params.max_price) {
      if (sliderMin > +min || sliderMax < +max) {
        filtersChecker.price = false;
        setSliderPrice([sliderMin, sliderMax]);
        setSliderRange([sliderMin, sliderMax]);
      } else {
        filtersChecker.price = true;
        setSliderRange([sliderMin, sliderMax]);
        setSliderPrice([min, max]);
        price.min = min;
        price.max = max;
        staticRoute.min_price = min;
        staticRoute.max_price = max;
      }
    } else {
      setSliderRange([sliderMin, sliderMax]);
      setSliderPrice([min, max]);
    }
    if (params.deliver_at_renters_place) {
      filtersChecker.deliver_at_renters_place = true;
      deliver_at_renters_place = +params.deliver_at_renters_place;
      staticRoute.deliver_at_renters_place = params.deliver_at_renters_place;
    }
    if (params.with_driver) {
      filtersChecker.with_driver = true;
      with_driver = params.with_driver;
      staticRoute.with_driver = params.with_driver;
    }
    if (params.without_driver) {
      filtersChecker.without_driver = true;
      without_driver = params.without_driver;
      staticRoute.without_driver = params.without_driver;
    }
    if (params.category_id) {
      filtersChecker.category_id = true;
      category_id = params.category_id;
      staticRoute.category_id = params.category_id;
    }
    if (params.body_style_id) {
      filtersChecker.body_style_id = true;
      body_style_id = params.body_style_id.split(",");
      body_style_names = body_style_names.concat(
        pre_loads.body_style_set.map((item) => {
          return item.name[activeLanguage];
        })
      );

      staticRoute.body_style_id = params.body_style_id;
    }
    if (params.brand_id) {
      filtersChecker.brand_id = true;
      brand_id = params.brand_id;
      brand_name = pre_loads.brand_set[0].name[activeLanguage];
      staticRoute.brand_name = pre_loads.brand_set[0].slug[activeLanguage];
      staticRoute.brand_id = params.brand_id;
    }
    if (params.car_id) {
      filtersChecker.car_id = true;
      car_id = params.car_id;
      car_name = pre_loads.car_set[0].name[activeLanguage];
      staticRoute.car_name = pre_loads.car_set[0].slug[activeLanguage];
      staticRoute.car_id = params.car_id;
    }
  };

  const UrlUpdater = (data) => {
    const { pathname, queryString, asPath, query } = data;

    router.replace(
      {
        pathname: pathname,
        query: query,
      },
      `${asPath}${queryString}`,
      { shallow: true }
    );
    // window.history.replaceState(null, "", url);
  };

  return (
    <article
      className="search_result_page_container"
      dir={activeLanguage === "fa" ? "rtl" : "ltr"}
    >
      {/* result count section */}
      <div className="count_bar_container" ref={new_search_ref}>
        <div
          className="count_bar responsive"
          onClick={() => {
            setShowSearch(!showSearch);
          }}
          style={{
            height: showSearch ? "auto" : "42px",
          }}
        >
          {result ? (
            result.length > 0 && !showSearch ? (
              <p className="count_bar_count">
                {extra_info?.params?.start_date
                  ? numberChanger(
                      dynamicString(
                        [
                          total_count,
                          extra_info.params.start_date.slice(5),
                          extra_info.params.end_date.slice(5),
                          carLocationName,
                        ],
                        language.COMMON.carInResult
                      ),
                      activeLanguage
                    )
                  : null}
                {/* {`${total_count}${language.count_bar_khodro
                  }${result[0].start_date.slice(5)}${language.count_bar_ta
                  }${result[0].end_date.slice(5)}`}
                {location_n ? ` در ${location_n}` : null} */}
              </p>
            ) : null
          ) : null}
          <p className="change_search_btn HEAP_LandingPages_Btn_ChangeSearch">
            {showSearch ? (
              <span className="close_text_btn">
                {language.COMMON.close}
                <Icon name="close" width="20px" height="20px" color="#dcdcdc" />
              </span>
            ) : (
              language.COMMON.changeSearch
            )}
          </p>
        </div>
        {/* search box */}
        <section
          className={[
            "new_search_in_landing",
            showSearch ? "show_search_section" : null,
          ].join(" ")}
        >
          <div className="responsive">
            <Search
              language={language}
              dynamic={true}
              searchSubmit={(v) => {
                // if we are not in dynamic page don't need to check loaction filter
                if (v.location_id !== 1) {
                  filtersChecker.Location = true;
                }
                setCarLocationName(v.location_name);
                Location = v.location_id;
                location_n = v.location_name;
                staticRoute.location_name = v.location_name;
                staticRoute.location_id = v.location_id;
                Start_date = v.date.Start_date;
                End_date = v.date.End_date;
                staticRoute.start_date = v.date.Start_date;
                staticRoute.end_date = v.date.End_date;
                loadMoreCar = false;
                UrlCreator({
                  query: staticRoute,
                  route: router.route,
                  cb: UrlUpdater,
                });
                setShowSearch(false);
                initSearch();
              }}
            />
          </div>
        </section>
        {showSearch ? (
          <span onClick={() => setShowSearch(false)}>
            <Icon name="chevronUp" width="20px" height="20px" color="#dcdcdc" />
          </span>
        ) : null}
      </div>
      {content && (
        <h1 className="responsive">{landing_data.short_description}</h1>
      )}
      {/* price sort part */}
      <section className="responsive">
        <div className={`price_sort_container ${loading ? "disableSort" : ""}`}>
          <span
            className={o === "-price" ? "active" : null}
            onClick={() => {
              o = "-price";
              loadMoreCar = false;
              staticRoute.price_order = "-price";
              UrlCreator({
                query: staticRoute,
                route: router.route,
                cb: UrlUpdater,
              });
              initSearch();
            }}
          >
            {language.COMMON.highToLow}
          </span>
          <span
            className={o === "price" ? "active" : null}
            onClick={() => {
              o = "price";
              loadMoreCar = false;
              staticRoute.price_order = "price";
              UrlCreator({
                query: staticRoute,
                route: router.route,
                cb: UrlUpdater,
              });
              initSearch();
            }}
          >
            {language.COMMON.lowToHigh}
          </span>
          {/* Trigger icon in mobile view */}
          <p className="show_filter" onClick={() => setShow_filter(true)}>
            {language.COMMON.advanceSearch}
            <Icon name="options" width="14px" height="14px" color="#656565" />
          </p>
        </div>
      </section>
      <section
        className={`responsive minimal_filters ${
          loading ? "disabledmMinimal_filters" : ""
        }`}
      >
        {/* {filtersChecker.Location ? (
          <p
            className='minimal_filter_tags'
            onClick={() => {
              setFilterReset((filterReset) => {
                return { ...filterReset, location: true };
              });
              loadMoreCar = false;
              filtersChecker.Location = false;
              staticRoute.location_id = "";
              staticRoute.location_name = "";
              UrlCreator({
                query: staticRoute,
                route: router.route,
                cb: UrlUpdater,
              });
              initSearch();
            }}
          >
            <IoMdClose size='1.3rem' color='#ababab' />
            {`${language.minimal_filters_car_location}${carLocationName}`}
          </p>
        ) : null} */}
        {filtersChecker.price ? (
          <p
            className="minimal_filter_tags"
            onClick={() => {
              setFilterReset((filterReset) => {
                return { ...filterReset, price: true };
              });
              setSliderPrice([]);
              loadMoreCar = false;
              filtersChecker.price = false;
              staticRoute.min_price = 0;
              staticRoute.max_price = 0;
              UrlCreator({
                query: staticRoute,
                route: router.route,
                cb: UrlUpdater,
              });
              initSearch();
            }}
          >
            <Icon name="close" width="13px" height="13px" color="#3fa6da" />
            {numberChanger(
              dynamicString(
                [
                  Number(price.min).toLocaleString(),
                  Number(price.max).toLocaleString(),
                ],
                language.COMMON.badgePrice
              ),
              activeLanguage
            )}
            {/* {language.minimal_filters_price_from}
            {Number(price.min).toLocaleString()}
            {language.minimal_filters_ta}
            {Number(price.max).toLocaleString()} */}
          </p>
        ) : null}
        {filtersChecker.deliver_at_renters_place ? (
          <p
            className="minimal_filter_tags"
            onClick={() => {
              setFilterReset((filterReset) => {
                return { ...filterReset, deliver_at_renters_place: true };
              });
              loadMoreCar = false;
              filtersChecker.deliver_at_renters_place = false;
              staticRoute.deliver_at_renters_place = 0;
              UrlCreator({
                query: staticRoute,
                route: router.route,
                cb: UrlUpdater,
              });
              initSearch();
            }}
          >
            <Icon name="close" width="13px" height="13px" color="#3fa6da" />

            {language.COMMON.delivery}
          </p>
        ) : null}
        {filtersChecker.category_id ? (
          <p
            className="minimal_filter_tags"
            onClick={() => {
              inactive_the_category = true;
              setFilterReset((filterReset) => {
                return { ...filterReset, category_id: true };
              });
              loadMoreCar = false;
              filtersChecker.category_id = false;
              staticRoute.category_id = 0;
              UrlCreator({
                query: staticRoute,
                route: router.route,
                cb: UrlUpdater,
              });
              initSearch();
            }}
          > 
            <Icon name="close" width="13px" height="13px" color="#3fa6da" />

            {category_name}
          </p>
        ) : null}
        {filtersChecker.with_driver ? (
          <p
            className="minimal_filter_tags"
            onClick={() => {
              setFilterReset((filterReset) => {
                return { ...filterReset, with_driver: true };
              });
              loadMoreCar = false;
              filtersChecker.with_driver = false;
              staticRoute.with_driver = 0;
              UrlCreator({
                query: staticRoute,
                route: router.route,
                cb: UrlUpdater,
              });
              initSearch();
            }}
          >
            <Icon name="close" width="13px" height="13px" color="#3fa6da" />

            {language.COMMON.withDriver}
          </p>
        ) : null}
        {filtersChecker.without_driver ? (
          <p
            className="minimal_filter_tags"
            onClick={() => {
              setFilterReset((filterReset) => {
                return { ...filterReset, without_driver: true };
              });
              loadMoreCar = false;
              filtersChecker.without_driver = false;
              staticRoute.without_driver = 0;
              UrlCreator({
                query: staticRoute,
                route: router.route,
                cb: UrlUpdater,
              });
              initSearch();
            }}
          >
            <Icon name="close" width="13px" height="13px" color="#3fa6da" />

            {language.COMMON.withoutDriver}
          </p>
        ) : null}
        {body_style_names.length > 0
          ? body_style_names.map((name, i) => {
              return (
                <p
                  key={i}
                  className="minimal_filter_tags"
                  onClick={() => {
                    if (body_style_names.length === 1) {
                      setFilterReset((filterReset) => {
                        return { ...filterReset, body_style_id: true };
                      });
                      filtersChecker.body_style_id = false;
                      staticRoute.body_style_id = "";
                    } else {
                      body_style_id = body_style_id.filter(
                        (_, index) => index !== i
                      );
                      staticRoute.body_style_id = body_style_id.join(",");
                    }
                    loadMoreCar = false;
                    UrlCreator({
                      query: staticRoute,
                      route: router.route,
                      cb: UrlUpdater,
                    });
                    initSearch();
                  }}
                > 
            <Icon name="close" width="13px" height="13px" color="#3fa6da" />

                  {/* {language.minimal_filters_body_style} */}
                  {name[activeLanguage]}
                </p>
              );
            })
          : null}
        {!car_name && brand_name ? (
          <p
            className="minimal_filter_tags"
            onClick={() => {
              setFilterReset((filterReset) => {
                return { ...filterReset, brand_id: true };
              });
              loadMoreCar = false;
              filtersChecker.brand_id = false;
              brand_name = null;
              filtersChecker.car_id = false;
              staticRoute.brand_id = "";
              UrlCreator({
                query: staticRoute,
                route: router.route,
                cb: UrlUpdater,
              });
              initSearch();
            }}
          >
            <Icon name="close" width="13px" height="13px" color="#3fa6da" />

            {/* {language.minimal_filters_brand} */}
            {brand_name}
          </p>
        ) : null}
        {car_name ? (
          <p
            className="minimal_filter_tags"
            onClick={() => {
              setFilterReset((filterReset) => {
                return { ...filterReset, car_id: true };
              });
              car_name = null;
              loadMoreCar = false;
              filtersChecker.car_id = false;
              staticRoute.car_id = "";
              UrlCreator({
                query: staticRoute,
                route: router.route,
                cb: UrlUpdater,
              });
              initSearch();
            }}
          >
            <Icon name="close" width="13px" height="13px" color="#3fa6da" />

            {/* {language.minimal_filters_model} */}
            {car_name}
          </p>
        ) : null}
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
          <Filters
            loading={loading}
            extra_info={extra_info}
            ResultCount={{ total_count, remained_count }}
            reset={filterReset}
            clearReset={clearReset}
            show_filter_prop={show_filter}
            show_filter_prop_reset={() => {
              setShow_filter(false);
            }}
            initialFilterValues={router}
            sliderRange={sliderRange}
            sliderPrice={sliderPrice}
            language={language}
          />
        </filterContext.Provider>
        <SearchResultList
          language={language}
          result={result}
          showLocation={true}
          tagClick={searchIgniteByClickOnCardTags}
          setFilterForSearch={(v) => {
            if (v.o) {
              o = "price";
            }
            filterResults(v);
          }}
        />
      </section>
      {/* load more */}
      {remained_count > 0 && (
        <span
          className={[
            "Load_more_car HEAP_LandingPages_Btn_ShowMore",
            show_spinner_loadMore ? "no_padding" : null,
          ].join(" ")}
          onClick={() => loadMore()}
        >
          {show_spinner_loadMore ? (
            <Spinner display="block" width={20} color="#9E9E9E" />
          ) : (
            <>
            <Icon name="chevronUp" rotate={180} width="20px" height="20px" color="#202020" />
              {language.COMMON.loadMore}
            </>
          )}
        </span>
      )}
    </article>
  );
};

interface ILanding_page_container {
  // dynamic page data
  landing_data: any;
  language: any;
  content: boolean;
}

export default Landing_page_container;
