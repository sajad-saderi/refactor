import { useState, useEffect, useContext } from 'react';

import 'react-modern-calendar-datepicker/lib/DatePicker.css';
import DatePicker, { DayRange, utils } from 'react-modern-calendar-datepicker';
import moment from 'moment-jalaali';
import dynamic from 'next/dynamic';
import net_CTX from '../../context/internetConnectionCTX';

const DropdownSearch = dynamic(() => import('../../components/form/Dropdown'));
const Button = dynamic(() => import('../../components/form/Button'));
import toast_context from '../../context/Toast_context';
// import DropdownSearch from "../../components/form/Dropdown";
import { REQUEST_GET_LOCATION } from '../../API/index';

import { useRouter } from 'next/router';

// import "./search.scss";
// import Button from "../../components/form/Button";

import modal_context from '../../context/Modal_context';
import AppStore from '../../context/app';
import ErrorHelper from '../../../utils/error_helper';
import { activeCities } from '../../helpers/activeCities';

moment.loadPersian({ dialect: 'persian-modern' });

const Search = ({ dynamic, searchSubmit, language }: ISearch) => {
  const [LocationId, setLocationId] = useState(1);
  const [LocationName, setLocationName] = useState('تهران');
  const [fromDay, setFromDay] = useState('');
  const [toDay, setToDay] = useState('');
  const [dayRange, setDayRange] = useState<DayRange>({
    from: null,
    to: null,
  });

  const [locationsList, setLocationsList] = useState([]);
  const [loading, setLoading] = useState(false);
  const [showBorder, setShowBorder] = useState(false);
  const [fromError, setFromError] = useState({
    status: false,
    message: '',
  });
  const [toError, setToError] = useState({
    status: false,
    message: '',
  });

  const MODAL_CONTEXT = useContext(modal_context);
  const store = useContext(AppStore);
  const toastCTX = useContext(toast_context);
  const router = useRouter();
  const netCTX = useContext(net_CTX);

  useEffect(() => {
    if (localStorage['User_Location']) {
      let location_storage = JSON.parse(localStorage['User_Location']);
      if (
        location_storage.value == 1 ||
        location_storage.value == 2 ||
        location_storage.value !== 3 ||
        location_storage.value == 1657 ||
        location_storage.value !== 1656 ||
        location_storage.value !== 1660 ||
        location_storage.value !== 1690 ||
        location_storage.value !== 1655 ||
        location_storage.value !== 1685 ||
        location_storage.value !== 1658
      ) {
        setLocationId(location_storage.value);
        setLocationName(location_storage.text);
      }
    }
    get_car_location();
    setDateFromStorage();
  }, []);

  // get a list of cities
  const get_car_location = async () => {
    try {
      const res: any = await REQUEST_GET_LOCATION();
      setLocationsList(res.data);
    } catch (error) {
      if (error === 111) {
        netCTX.toggleTheContainer(true);
      } else
        toastCTX.toast_option({
          message: error.response
            ? ErrorHelper({
              errorObj: error.response,
              _400Message: 'خطا در دریافت لیست شهر‌ها',
            })
            : error,
          color: '#ed9026',
          time: 0,
          autoClose: false,
        });
    }
  };

  // set the start and end date from storage if there are there
  const setDateFromStorage = () => {
    if (localStorage['start'] && localStorage['end']) {
      if (localStorage['start'] !== 'null' && localStorage['end'] !== 'null') {
        let start = JSON.parse(localStorage['start']);
        // if the start date on storage is bigger then today
        if (start.day > moment().jDate()) {
          if (start.month >= moment().jMonth() + 1) {
            setDayRange({
              from: JSON.parse(localStorage['start']),
              to: JSON.parse(localStorage['end']),
            });
          }
          // id the day is smaller than the saved one but the current month is bigger then the month on storage
          else {
            localStorage.removeItem('start');
            localStorage.removeItem('end');
          }
        } else if (start.month > moment().jMonth() + 1) {
          setDayRange({
            from: JSON.parse(localStorage['start']),
            to: JSON.parse(localStorage['end']),
          });
        } else {
          localStorage.removeItem('start');
          localStorage.removeItem('end');
          set_default_date_for_search();
        }
      }
    } else {
      set_default_date_for_search();
    }
  };

  const set_default_date_for_search = () => {
    // if start date and end date is not set, automatically show the result for 3 to 6 days ahead
    let from_date = moment()
      .add(3, 'day')
      .format('jYYYY/jMM/jDD')
      .split('/');
    let to_date = moment()
      .add(6, 'day')
      .format('jYYYY/jMM/jDD')
      .split('/');

    setDayRange({
      from: { day: +from_date[2], month: +from_date[1], year: +from_date[0] },
      to: { day: +to_date[2], month: +to_date[1], year: +to_date[0] },
    });
  };

  const GotoSearchResult = (e) => {
    e.preventDefault();
    if (dayRange.from && dayRange.to) {
      // if we are on dynamic page don't change the route
      localStorage['searchedLocation'] = LocationName;
      if (dynamic) {
        searchSubmit({
          location_id: LocationId,
          location_name: LocationName,
          date: {
            // convert dates to standard structure
            Start_date: `${dayRange.from.year}/${dayRange.from.month}/${dayRange.from.day}`,
            End_date: `${dayRange.to.year}/${dayRange.to.month}/${dayRange.to.day}`,
          },
        });
        return;
      }
      // save date to storage as start and end dates
      localStorage['start'] = JSON.stringify(dayRange.from);
      localStorage['end'] = JSON.stringify(dayRange.to);
      setLoading(true);
      router.push(
        `/search-result?location_id=${LocationId}&location_name=${LocationName}&start_date=${dayRange.from.year}/${dayRange.from.month}/${dayRange.from.day}&end_date=${dayRange.to.year}/${dayRange.to.month}/${dayRange.to.day}&price_order=-price&page=1&limit=15&without_driver=1`,
      );
    } else if (!dayRange.from) {
      setFromError({ status: true, message: language.search.error_start_date });
    } else if (!dayRange.to) {
      setToError({ status: true, message: language.search.error_end_date });
    }
  };

  useEffect(() => {
    if (dayRange.from) {
      setFromError({ status: false, message: '' });
      setFromDay(convertDate(dayRange.from));
    } else {
      setFromDay(' ');
      setToDay(' ');
    }
    if (dayRange.to) {
      if (
        dayRange.to.day === dayRange.from.day &&
        dayRange.to.month === dayRange.from.month &&
        dayRange.to.year === dayRange.from.year
      ) {
        setFromDay('');
        setDayRange({
          from: null,
          to: null,
        });
        setToError({
          status: true,
          message: language.search.error_empty_dates,
        });
      } else {
        setToError({ status: false, message: '' });
        setShowBorder(false);
        setToDay(convertDate(dayRange.to));
      }
    } else {
      setToDay(' ');
    }
  }, [dayRange]);

  const convertDate = (v) => {
    let value = moment(`${v.year}/${v.month}/${v.day}`, 'jYYYY/jM/jD').format(
      'dddd jDD jMMMM',
    );
    return value;
  };

  return (
    <section className="search_box">
      <form
        data-test-id="GotoSearchResult"
        onSubmit={(e) => GotoSearchResult(e)}
      >
        <div className="search_box_div">
          <p className="label">{language.search.label_location}</p>
          <DropdownSearch
            data={locationsList}
            InputDisable={true}
            hardValue={LocationName}
            search_place_holder={
              language.search.label_location_search_place_holder
            }
            Select={(i) => {
              localStorage['User_Location'] = JSON.stringify(i);
              if (activeCities(i.value)) {
                MODAL_CONTEXT.modalHandler('TellMe');
              } else {
                store.setLocation(i.value)
                setLocationId(i.value);
                setLocationName(i.text);
              }
            }}
          // clearField={() => setLocationId(1)}
          />
        </div>
        <div className="Date_picker_container">
          <div
            className={[
              'date_Input_Container',
              dayRange.from
                ? dayRange.to
                  ? 'PushToRight'
                  : 'PushToLeft'
                : 'PushToRight',
            ].join(' ')}
            onClick={() => setShowBorder(true)}
          >
            <DatePicker
              value={dayRange}
              onChange={setDayRange}
              shouldHighlightWeekends
              minimumDate={utils('fa').getToday()}
              locale="fa"
              colorPrimary="#4ba3ce"
            // disabledDays={[utils("fa").getToday()]}
            />
            <div className="input_container">
              <p className="label">{language.search.label_start_date}</p>
              <input
                data-hj-allow
                className={
                  fromError.status
                    ? 'input_Error'
                    : showBorder
                      ? dayRange.from
                        ? dayRange.to
                          ? 'activeBorder'
                          : null
                        : 'activeBorder'
                      : null
                }
                readOnly={true}
                value={fromDay ? fromDay : ''}
              />
              {/* appear the error for the start date here */}
              <span>{fromError.message}</span>
            </div>
            <div className="input_container">
              <p className="label">{language.search.label_end_date}</p>
              <input
                data-hj-allow
                className={[
                  'exception_input',
                  toError.status
                    ? 'input_Error'
                    : showBorder
                      ? dayRange.to
                        ? dayRange.from
                          ? null
                          : null
                        : dayRange.from
                          ? 'activeBorder'
                          : null
                      : null,
                ].join(' ')}
                readOnly={true}
                value={toDay ? toDay : ''}
              />
              {/* appear the error for the end date here */}
              <span>{toError.message}</span>
            </div>
          </div>
        </div>
        <div className="search_box_div">
          <p className="Search_Text_transparent">search</p>
          <Button
            value={language.search.btn}
            class="Blue_BTN search_Btn HEAP_Home_Btn_Search"
            loading={loading}
            click={() => { }}
          />
        </div>
      </form>
    </section>
  );
};

interface ISearch {
  // if the search box is at the top of the dynamic page
  dynamic?: boolean;
  searchSubmit?: any;
  language: any;
}

export default Search;
