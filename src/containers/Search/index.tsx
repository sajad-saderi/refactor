import { useState, useEffect, useContext } from 'react';
import DatePicker, { DayRange, utils } from '../../components/datePicker';
import moment from 'moment-jalaali';
import dynamic from 'next/dynamic';
import net_CTX from '../../context/internetConnectionCTX';
import languageCTX from '../../context/languageCTX';
const Button = dynamic(() => import('../../components/form/Button'));
import toast_context from '../../context/Toast_context';
import DropdownSearch from '../../components/form/Dropdown';
import { REQUEST_GET_LOCATION } from '../../API/index';

import { useRouter } from 'next/router';

// import "./search.scss";
// import Button from "../../components/form/Button";

import modal_context from '../../context/Modal_context';
import AppStore from '../../context/app';
import ErrorHelper from '../../../utils/error_helper';
import { activeCities } from '../../helpers/activeCities';
import { twoWayDateConvertor } from '../../helpers/dateControler';
import { ICalender } from '../../../types';
import { numberChanger } from '../../../utils/numberChanger';
import { limitForSearchResult, listOfCities } from '../../../utils/constances';
import classNames from 'classnames';
import Select from '../../components/form/select';

moment.loadPersian({ dialect: 'persian-modern', usePersianDigits: false });

let dateObject: ICalender | null = { from: null, to: null };
let initialCity = {
  key: 1,
  name: {
    fa: 'تهران',
    breadcrumb_fa: 'تهران',
    en: 'Tehran',
    breadcrumb_en: 'Tehran'
  },
  value: 1
};
const Search = ({ dynamic, searchSubmit, language }: ISearch) => {
  const [LocationId, setLocationId] = useState(1);
  const [LocationName, setLocationName] = useState('');
  const [fromDay, setFromDay] = useState('');
  const [toDay, setToDay] = useState('');
  const [dayRange, setDayRange] = useState<DayRange>({
    to: null,
    from: null
  });

  const [locationsList, setLocationsList] = useState(listOfCities);
  const [loading, setLoading] = useState(false);
  const [showBorder, setShowBorder] = useState(false);
  const [fromError, setFromError] = useState({
    status: false,
    message: ''
  });
  const [toError, setToError] = useState({
    status: false,
    message: ''
  });

  const MODAL_CONTEXT = useContext(modal_context);
  const store = useContext(AppStore);
  const toastCTX = useContext(toast_context);
  const router = useRouter();
  const netCTX = useContext(net_CTX);
  const { activeLanguage } = useContext(languageCTX);

  useEffect(() => {
    if (localStorage['location']) {
      let location_storage = JSON.parse(localStorage['location']);
      if (!activeCities(location_storage.value)) {
        setLocationId(location_storage.value);
        setLocationName(location_storage.name[activeLanguage]);
      } else {
        setLocationId(initialCity.value);
        setLocationName(initialCity.name[activeLanguage]);
      }
    } else {
      setLocationId(initialCity.value);
      setLocationName(initialCity.name[activeLanguage]);
    }
    // get_car_location();
    setDateFromStorage();
  }, []);

  useEffect(() => {
    if (activeLanguage === 'fa') {
      moment.locale('fa');
    } else {
      moment.locale('en');
    }
    if (localStorage['location']) {
      let location_storage = JSON.parse(localStorage['location']);
      if (!activeCities(location_storage.value))
        setLocationName(location_storage.name[activeLanguage]);
      else {
        setLocationId(initialCity.value);
        setLocationName(initialCity.name[activeLanguage]);
      }
    } else {
      setLocationId(initialCity.value);
      setLocationName(initialCity.name[activeLanguage]);
    }
    setDateFromStorage();
  }, [activeLanguage]);

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
                _400Message: language.COMMON.fetchCitiesError
              })
            : error,
          color: '#ed9026',
          time: 0,
          autoClose: false
        });
    }
  };

  // set the start and end date from storage if there are there
  const setDateFromStorage = () => {
    let localStorageDate = localStorage['date'];
    if (localStorageDate) {
      let { from, to } = JSON.parse(localStorageDate);
      if (!from) {
        localStorage.removeItem('date');
        set_default_date_for_search();
        return;
      }
      // if the start date on storage is bigger then today
      if (activeLanguage === 'fa') {
        if (from.fa.dump.day > moment().jDate()) {
          if (from.fa.dump.month >= moment().jMonth() + 1) {
            if (from.fa.dump.year >= moment().jYear()) {
              setDayRange({
                from: from.fa.dump,
                to: to.fa.dump
              });
            } else {
              localStorage.removeItem('date');
              set_default_date_for_search();
            }
          }
          // id the day is smaller than the saved one but the current month is bigger then the month on storage
          else {
            localStorage.removeItem('date');
            set_default_date_for_search();
          }
        } else if (from.fa.dump.month > moment().jMonth() + 1) {
          if (from.fa.dump.year >= moment().jYear()) {
            setDayRange({
              from: from.fa.dump,
              to: to.fa.dump
            });
          } else {
            localStorage.removeItem('date');
            set_default_date_for_search();
          }
        } else if (from.fa.dump.year > moment().jYear()) {
          setDayRange({
            from: from.fa.dump,
            to: to.fa.dump
          });
        } else {
          localStorage.removeItem('date');
          set_default_date_for_search();
        }
      } else {
        let date = new Date();
        if (from.en.dump.day > date.getDate()) {
          if (from.en.dump.month >= date.getMonth() + 1) {
            if (from.en.dump.year >= date.getFullYear()) {
              setDayRange({
                from: from.en.dump,
                to: to.en.dump
              });
            } else {
              localStorage.removeItem('date');
              set_default_date_for_search();
            }
          }
          // id the day is smaller than the saved one but the current month is bigger then the month on storage
          else {
            localStorage.removeItem('date');
            set_default_date_for_search();
          }
        } else if (from.en.dump.month > date.getMonth() + 1) {
          if (from.en.dump.year >= date.getFullYear()) {
            setDayRange({
              from: from.en.dump,
              to: to.en.dump
            });
          } else {
            localStorage.removeItem('date');
            set_default_date_for_search();
          }
        } else if (from.en.dump.year > date.getFullYear()) {
          setDayRange({
            from: from.en.dump,
            to: to.en.dump
          });
        } else {
          localStorage.removeItem('date');
          set_default_date_for_search();
        }
      }
    } else {
      set_default_date_for_search();
    }
  };

  const set_default_date_for_search = () => {
    // if start date and end date is not set, automatically show the result for 3 to 6 days ahead
    if (activeLanguage === 'fa') {
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
        to: { day: +to_date[2], month: +to_date[1], year: +to_date[0] }
      });
    } else {
      let from_date = moment()
        .add(3, 'day')
        .format('YYYY/MM/DD')
        .split('/');
      let to_date = moment()
        .add(6, 'day')
        .format('YYYY/MM/DD')
        .split('/');
      setDayRange({
        from: { day: +from_date[2], month: +from_date[1], year: +from_date[0] },
        to: { day: +to_date[2], month: +to_date[1], year: +to_date[0] }
      });
    }
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
            End_date: `${dayRange.to.year}/${dayRange.to.month}/${dayRange.to.day}`
          }
        });
        return;
      }
      // save date to storage as start and end dates
      // localStorage['start'] = JSON.stringify(dayRange.from);
      // localStorage['end'] = JSON.stringify(dayRange.to);
      setLoading(true);
      router.push(
        `/search-result?location_id=${LocationId}&location_name=${LocationName}&start_date=${dayRange.from.year}/${dayRange.from.month}/${dayRange.from.day}&end_date=${dayRange.to.year}/${dayRange.to.month}/${dayRange.to.day}&price_order=-price&page=1&limit=${limitForSearchResult}&without_driver=1`
      );
    } else if (!dayRange.from) {
      setFromError({ status: true, message: language.COMMON.errorStartDate });
    } else if (!dayRange.to) {
      setToError({ status: true, message: language.COMMON.errorEndDate });
    }
  };

  useEffect(() => {
    if (dayRange.from) {
      setFromError({ status: false, message: '' });
      setFromDay(convertDate(dayRange.from));
      dateObject = { from: twoWayDateConvertor(dayRange.from), to: null };
    } else {
      setFromDay(' ');
      setToDay(' ');
      dateObject = { from: null, to: null };
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
          to: null
        });
        setToError({
          status: true,
          message: language.COMMON.errorEmptyDate
        });
        dateObject = { from: null, to: null };
      } else {
        setToError({ status: false, message: '' });
        setShowBorder(false);
        setToDay(convertDate(dayRange.to));
        dateObject.to = twoWayDateConvertor(dayRange.to);
      }
    } else {
      setToDay(' ');
    }
    if (dateObject.from && dateObject.to) {
      store.setDate(dateObject);
      localStorage['date'] = JSON.stringify(dateObject);
    }
  }, [dayRange]);

  useEffect(() => {
    if (store.store.location.id !== LocationId) {
      setLocationId(store.store.location.id);
      setLocationName(store.store.location[activeLanguage]);
    }
  }, [store]);

  const convertDate = (v) => {
    let value = null;
    if (activeLanguage === 'fa') {
      value = moment(`${v.year}/${v.month}/${v.day}`, 'jYYYY/jM/jD').format(
        'dddd jDD jMMMM'
      );
    } else {
      value = moment(`${v.year}/${v.month}/${v.day}`, 'YYYY/M/D').format(
        'ddd DD MMM'
      );
    }
    return value;
  };

  return (
    <section className='search_box'>
      <form
        data-test-id='GotoSearchResult'
        onSubmit={(e) => GotoSearchResult(e)}>
        <div className='search_box_div'>
          <p className='label'>{language.COMMON.pickupLocation}</p>
          <Select
            activeLanguage={activeLanguage}
            inputValue={LocationName}
            onClear={() => {}}
            language={language}
            data={listOfCities}
            noClear
            searchPlaceHolder={language.COMMON.inCities}
            onSelect={(i) => {
              localStorage['location'] = JSON.stringify(i);
              if (activeCities(i.value)) {
                MODAL_CONTEXT.modalHandler('TellMe');
              } else {
                store.setLocation({
                  value: i.value,
                  text: i.name.fa,
                  en: i.name.en
                });
                setLocationId(i.value);
                setLocationName(i.name[activeLanguage]);
              }
            }}
          />
          {/* <DropdownSearch
            language={language}
            data={locationsList}
            InputDisable={true}
            hardValue={LocationName}
            search_place_holder={language.COMMON.inCities}
            Select={(i) => {
              localStorage['location'] = JSON.stringify(i);
              if (activeCities(i.value)) {
                MODAL_CONTEXT.modalHandler('TellMe');
              } else {
                store.setLocation({
                  value: i.value,
                  text: i.name.fa,
                  en: i.name.en
                });
                setLocationId(i.value);
                setLocationName(i.name[activeLanguage]);
              }
            }}
            // clearField={() => setLocationId(1)}
          /> */}
        </div>
        <div className='Date_picker_container'>
          <div
            className={[
              'date_Input_Container',
              dayRange.from
                ? dayRange.to
                  ? activeLanguage === 'fa'
                    ? 'PushToRight'
                    : 'PushToLeft'
                  : activeLanguage === 'fa'
                  ? 'PushToLeft'
                  : 'PushToRight'
                : activeLanguage === 'fa'
                ? 'PushToRight'
                : 'PushToLeft'
            ].join(' ')}
            onClick={() => setShowBorder(true)}>
            <DatePicker
              value={dayRange}
              onChange={setDayRange}
              shouldHighlightWeekends
              minimumDate={
                dayRange.from && !dayRange.to
                  ? dayRange.from
                  : utils(activeLanguage).getToday()
              }
              calendarPopperPosition='bottom'
              locale={activeLanguage}
              colorPrimary='#4ba3ce'
              wrapperClassName={classNames(
                'customCalenderClass',
                !dayRange.to ? 'pushLeft' : ''
              )}
            />
            <div
              className={`${
                activeLanguage !== 'fa' ? 'en_input_container' : ''
              } input_container`}>
              <p className='label'>{language.COMMON.pickUpDate}</p>
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
                value={fromDay ? numberChanger(fromDay, activeLanguage) : ''}
              />
              {/* appear the error for the start date here */}
              <span>{fromError.message}</span>
            </div>
            <div
              className={`${
                activeLanguage !== 'fa' ? 'en_input_container' : ''
              } input_container`}>
              <p className='label'>{language.COMMON.dropOffDate}</p>
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
                    : null
                ].join(' ')}
                readOnly={true}
                value={toDay ? numberChanger(toDay, activeLanguage) : ''}
              />
              {/* appear the error for the end date here */}
              <span>{toError.message}</span>
            </div>
          </div>
        </div>
        <div className='search_box_div'>
          <p className='Search_Text_transparent'>search</p>
          <Button
            value={language.COMMON.search}
            customClass={classNames('searchButton', 'HEAP_Home_Btn_Search')}
            loading={loading}
            click={() => {}}
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
