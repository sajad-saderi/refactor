import { useEffect, useState, useContext } from 'react';
import {
  REQUEST_GET_CAR_BRAND,
  REQUEST_GET_CAR_MODEL,
  REQUEST_GET_CAR_PRICE_ESTIMATION
} from '../../API';
import dynamic from 'next/dynamic';

const DropdownSearch = dynamic(() => import('../form/Dropdown'));
const TextInput = dynamic(() => import('../form/TextInput'));
const Button = dynamic(() => import('../form/Button'));
const ShowResult = dynamic(() => import('./ShowResult/ShowResult'));
// import DropdownSearch from "../form/Dropdown";
// import TextInput from "../form/TextInput";
// import Button from "../form/Button";

import Link from 'next/link';
import { guard_controller } from '../../../utils/guard_controller';
import toast_context from '../../context/Toast_context';
import ErrorHelper from '../../../utils/error_helper';
import net_CTX from '../../context/internetConnectionCTX';
import { supportedLanguages } from '../../../utils/types';
import Input from '../form/input';
import PriceCalculator from '../../../utils/priceCalculator';
import Select from '../form/select';
// import ShowResult from "./ShowResult/ShowResult";

const Calculator = ({
  AbText,
  language,
  locale,
  activeLanguage
}: ICalculator) => {
  const [brandList, setBrandList] = useState([]);
  const [modelList, setModelList] = useState([]);
  const [value, setValue] = useState('');
  const [valueError, setValueError] = useState({ status: false, message: '' });
  const [loading, setLoading] = useState(false);
  const [brand, setBrand] = useState({
    name: '',
    id: null
  });
  const [brandError, setBrandError] = useState({ status: false, message: '' });
  const [model, setModel] = useState({
    name: '',
    id: null
  });
  const [modelError, setModelError] = useState({ status: false, message: '' });
  const [daily, setDaily] = useState(0);
  const [weekly, setWeekly] = useState(0);
  const [monthly, setMonthly] = useState(0);
  const [showCalculateBox, setShowCalculateBox] = useState(true);
  const [saveCarInfo, setSaveCarInfo] = useState({
    brand: null,
    model: null,
    value: null
  });
  const [authorize, set_authorize] = useState(true);
  const toastCTX = useContext(toast_context);
  const netCTX = useContext(net_CTX);
  console.log(model.name);

  useEffect(() => {
    const guard = guard_controller();
    if (guard !== 'auth') {
      set_authorize(false);
    }
    fetchData();
  }, []);

  useEffect(() => {
    if (value) {
      setValueError({ status: false, message: '' });
    }
  }, [value]);
  useEffect(() => {
    if (brand.id) {
      setBrandError({ status: false, message: '' });
    }
  }, [brand.id]);
  useEffect(() => {
    if (model.id) {
      setModelError({ status: false, message: '' });
    }
  }, [model.id]);

  const fetchData = async () => {
    /**
     * Get the Bran list from API
     */
    try {
      const brand_list_res: any = await REQUEST_GET_CAR_BRAND();
      setBrandList(brand_list_res.carBrands);
    } catch (error) {
      if (error === 111) {
        netCTX.toggleTheContainer(true);
      } else
        toastCTX.toast_option({
          message: error.response
            ? ErrorHelper({
                errorObj: error.response,
                _400Message: language.COMMON.fetchingBrandsError
              })
            : error,
          color: '#ed9026',
          time: 0,
          autoClose: false
        });
    }
  };

  /**
   *
   * @param brand_id
   * Get the model List From API base on Brand Id
   */
  const fetchModelList = async (brand_id) => {
    try {
      const model_list_res: any = await REQUEST_GET_CAR_MODEL(brand_id);
      setModelList(model_list_res.data);
    } catch (error) {
      if (error === 111) {
        netCTX.toggleTheContainer(true);
      } else
        toastCTX.toast_option({
          message: error.response
            ? ErrorHelper({
                errorObj: error.response,
                _400Message: language.COMMON.fetchingModelError
              })
            : error,
          color: '#ed9026',
          time: 0,
          autoClose: false
        });
    }
  };

  const calculator = async (e) => {
    e.preventDefault();
    setLoading(true);
    /**
     * validation to ignore empty values or if the inputted value is smaller then 10 million
     */
    if (!brand.id) {
      setBrandError({ status: true, message: language.JOIN_US_PAGE.error1 });
      setLoading(false);
      return;
    } else if (!model.id) {
      setModelError({ status: true, message: language.JOIN_US_PAGE.error2 });
      setLoading(false);
      return;
    } else if (value === '') {
      setValueError({ status: true, message: language.JOIN_US_PAGE.error3 });
      setLoading(false);
      return;
    }
    if (+value < 20000000) {
      setValueError({ status: true, message: language.JOIN_US_PAGE.error4 });
      setLoading(false);
      return;
    }

    try {
      // Don't care about the result
      const estimation_res = await REQUEST_GET_CAR_PRICE_ESTIMATION({
        car_id: model.id,
        price: value
      });
      setLoading(false);
      localStorage['car_info'] = JSON.stringify(saveCarInfo);
      // Show the calculator box
      setShowCalculateBox(false);
      // Reset old values in case they were set
      setDaily(0);
      setWeekly(0);
      setMonthly(0);

      // Convert the car value to Numner
      let conToNum = Number(value);
      // Constant base for daily rent: 0.0022
      // let eachDaily =
      //   conToNum < 200000000
      //     ? conToNum * 0.0022
      //     : conToNum <= 400000000
      //     ? conToNum * 0.0019
      //     : conToNum * 0.0015;
      // #FIXME
      // Go to the set car and timing component and change the coefficient there to
      // #REVIEW

      //  Round the daily value before calculating monthly and weekly income
      // let Round = Math.ceil(eachDaily / 10) * 10;

      // // Multiply by 7 for weekly income
      // let eachWeek = Round * 7;

      // // Multiply by 30 for monthly income
      // let eachMonth = Round * 30;

      setDaily(new PriceCalculator(conToNum).getDailyPrice().dailyPrice);
      setWeekly(new PriceCalculator(conToNum).getWeeklyPrice().weeklyPrice);
      setMonthly(new PriceCalculator(conToNum).getMonthlyPrice().monthlyPrice);
    } catch (error) {
      if (error === 111) {
        netCTX.toggleTheContainer(true);
      }
    }
  };

  return (
    <>
      {showCalculateBox ? (
        <>
          <h2>{language.JOIN_US_PAGE.calculatorTitle}</h2>
          <h3 className='title'>{language.JOIN_US_PAGE.formTitle}</h3>
          <form data-test-id='form' onSubmit={calculator}>
            <div className='calculator_dropDown'>
              <Select
                activeLanguage={activeLanguage}
                inputValue={brand.name}
                onClear={() => {}}
                language={language}
                data={brandList}
                noClear
                placeholder={language.JOIN_US_PAGE.brand}
                searchPlaceHolder={language.JOIN_US_PAGE.brand}
                onSelect={(v) => {
                  fetchModelList(v.value);
                  setSaveCarInfo((saveCarInfo) => {
                    return { ...saveCarInfo, brand: v };
                  });
                  setBrand({
                    id: v.value,
                    name: v.name[locale]
                  });
                  setModel({
                    id: null,
                    name: ''
                  });
                  try {
                    if (window['heap']) {
                      window['heap'].addUserProperties({
                        Calc_Car_Brand: `${v.name}`
                      });
                    }
                  } catch (e) {
                    console.log('Em...I think heap is not work correctly :/');
                  }
                }}
              />
              {/* <DropdownSearch
                language={language}
                data-test-id='brand'
                search_place_holder={language.JOIN_US_PAGE.inBrand}
                defaultVal={brand.name}
                data={brandList}
                // clearField={() =>
                //   setBrand({
                //     id: null,
                //     name: null,
                //   })
                // }
                Select={(v) => {
                  fetchModelList(v.value);
                  setSaveCarInfo((saveCarInfo) => {
                    return { ...saveCarInfo, brand: v };
                  });
                  setBrand({
                    id: v.value,
                    name: v.name[locale]
                  });
                  try {
                    if (window['heap']) {
                      window['heap'].addUserProperties({
                        Calc_Car_Brand: `${v.name}`
                      });
                    }
                  } catch (e) {
                    console.log('Em...I think heap is not work correctly :/');
                  }
                }}
                placeholder={language.JOIN_US_PAGE.brand}
                InputDisable={true}
                error_status={brandError.status}
              /> */}
              <span className='error_Field'>{brandError.message}</span>
            </div>
            <div className='calculator_dropDown'>
              <Select
                activeLanguage={activeLanguage}
                inputValue={model.name}
                onClear={() => {}}
                language={language}
                data={modelList}
                disable={!brand.id ? true : false}
                noClear
                placeholder={language.JOIN_US_PAGE.model}
                searchPlaceHolder={language.COMMON.inModel}
                onSelect={(v) => {
                  setSaveCarInfo((saveCarInfo) => {
                    return { ...saveCarInfo, model: v };
                  });
                  try {
                    if (window['heap']) {
                      window['heap'].addUserProperties({
                        Calc_Car_Brand: `${v.name}`
                      });
                    }
                  } catch (e) {
                    console.log('Em...I think heap is not work correctly :/');
                  }
                  setModel({ id: v.value, name: v.name[locale] });
                }}
              />
              {/* <DropdownSearch
                language={language}
                defaultVal={model.name}
                data={modelList}
                search_place_holder={language.COMMON.inModel}
                // clearField={() => {
                //   setModel({ id: null, name: null });
                // }}
                disabled={!brand.id ? true : false}
                InputDisable={true}
                Select={}
                error_status={modelError.status}
              /> */}
              <span className='error_Field'>{modelError.message}</span>
            </div>
            <div className='value_container'>
              <Input
                withSeparator={true}
                labelCustomClass={'labelCustomClass'}
                type='text'
                placeholder={language.COMMON.carPrice}
                error={valueError}
                onError={(e) => setValueError(e)}
                name='value'
                onChange={(e: string) => {
                  setSaveCarInfo((saveCarInfo) => {
                    return { ...saveCarInfo, value: e };
                  });
                  setValue(e);
                }}
                number
                noClear
                value={value}
                onClear={() => {}}
                validationItems={{
                  number: true,
                  min: 20000000,
                  messages: {
                    require: language.COMMON.enterCarValue,
                    min: language.COMMON.minimunCarValue
                  },
                  require: true
                }}
              />
              {/* <TextInput
                name='value'
                number={true}
                onChangeHandler={(e) => {
                  setSaveCarInfo((saveCarInfo) => {
                    return { ...saveCarInfo, value: e };
                  });
                  setValue(e);
                }}
                clearField={() => setValue('')}
                autoFocus={false}
                error={{
                  status: valueError.status,
                  message: valueError.message
                }}
                min={7}
                max={14}
                value={value}
                placeholder={language.COMMON.carPrice}
                validation={{
                  number: true,
                  min: 20000000,
                  messages: {
                    required: language.COMMON.enterCarValue,
                    min: language.COMMON.minimunCarValue
                  },
                  required: true
                }}
              /> */}
              <span>{language.COMMON.toman}</span>
            </div>
            <Button
              // onClick on this button nothing happened, the event listening to submitting the form
              value={language.JOIN_US_PAGE.estimate}
              click={() => {}}
              customClass='local_Button_joinUs'
              loading={loading}
            />
          </form>
        </>
      ) : (
        <>
          <ShowResult
            language={language}
            daily={daily}
            weekly={weekly}
            monthly={monthly}
          />
          <div
            className='addCarnowInlanding'
            onClickCapture={() => {
              if (!authorize) {
                localStorage['last_location'] = '/add-car';
              }
            }}>
            <Link href={authorize ? '/add-car' : '/login'} prefetch={false}>
              <a
                className='Blue_BTN addCar_top_joinus_a'
                data-test-id='addCar_top_joinus_a'>
                {AbText ? AbText : language.COMMON.addYourCar}
              </a>
            </Link>
          </div>
          {/* show the calculation box */}
          <p
            className='tryAgainCalc'
            onClick={() => {
              window.scrollTo(0, 0);
              // Reset the car value
              setValue('');
              setBrand({
                name: null,
                id: null
              });
              setModel({
                name: null,
                id: null
              });
              setLoading(false);
              setShowCalculateBox(true);
            }}>
            {language.JOIN_US_PAGE.tryAgain}
          </p>
        </>
      )}
    </>
  );
};

interface ICalculator {
  AbText?: string;
  language: any;
  locale: supportedLanguages;
  activeLanguage: supportedLanguages;
}

export default Calculator;
