import { useState, useEffect, useRef, useContext } from "react";
import dynamic from "next/dynamic";

const TextInput = dynamic(() => import("../../../components/form/TextInput"));
const DropdownSearch = dynamic(() =>
  import("../../../components/form/Dropdown")
);
// import TextInput from "../../../components/form/TextInput";
// import DropdownSearch from "../../../components/form/Dropdown";
import Checkbox from "../../../components/form/Checkbox";
// import "./DiscountBox.scss";
import { IoMdAdd, IoMdTrash, IoMdCreate } from "react-icons/io";
import { dynamicString } from '../../../helpers/dynamicString';
import languageCTX from '../../../context/languageCTX'

const DiscountBox = ({
  initialDiscountList,
  addDiscount,
  removeDiscountList,
  discountCheck,
  showDiscount,
  setShowBox,
  error,
  language,
}: IDiscountBox) => {
  const [discount_percent, setDiscount_percent] = useState("");
  const [Error_discount_percent, setError_discount_percent] = useState({
    status: false,
    message: "",
  });
  const [DiscountList, setDiscountList] = useState([]);
  const [days_limit, setDays_limit] = useState(null);
  const [days_limit_name, setDays_limit_name] = useState(null);
  const [Error_days_limit, setError_days_limit] = useState({
    status: false,
    message: "",
  });
  const [Discountcheck, setDiscountcheck] = useState(0);
  const [mode, setMode] = useState({
    status: false,
    index: null,
  });
  const { activeLanguage } = useContext(languageCTX)
  const daysFarsi = [
    { key: "1", value: "1", name: { fa: "۱ روز", en: '1 day' } },
    { key: "2", value: "2", name: { fa: "۲ روز", en: '2 days' } },
    { key: "3", value: "3", name: { fa: "۳ روز", en: '3 days' } },
    { key: "4", value: "4", name: { fa: "۴ روز", en: '4 days' } },
    { key: "5", value: "5", name: { fa: "۵ روز", en: '5 days' } },
    { key: "6", value: "6", name: { fa: "۶ روز", en: '6 days' } },
    { key: "7", value: "7", name: { fa: "۷ روز", en: '7 days' } },
    { key: "8", value: "8", name: { fa: "۸ روز", en: '8 days' } },
    { key: "9", value: "9", name: { fa: "۹ روز", en: '9 days' } },
    { key: "10", value: "10", name: { fa: "۱۰ روز", en: '10 days' } },
    { key: "11", value: "11", name: { fa: "۱۱ روز", en: '11 days' } },
    { key: "12", value: "12", name: { fa: "۱۲ روز", en: '12 days' } },
    { key: "13", value: "13", name: { fa: "۱۳ روز", en: '13 days' } },
    { key: "14", value: "14", name: { fa: "۱۴ روز", en: '14 days' } },
    { key: "15", value: "15", name: { fa: "۱۵ روز", en: '15 days' } },
    { key: "16", value: "16", name: { fa: "۱۶ روز", en: '16 days' } },
    { key: "17", value: "17", name: { fa: "۱۷ روز", en: '17 days' } },
    { key: "18", value: "18", name: { fa: "۱۸ روز", en: '18 days' } },
    { key: "19", value: "19", name: { fa: "۱۹ روز", en: '19 days' } },
    { key: "20", value: "20", name: { fa: "۲۰ روز", en: '20 days' } },
    { key: "21", value: "21", name: { fa: "۲۱ روز", en: '21 days' } },
    { key: "22", value: "22", name: { fa: "۲۲ روز", en: '22 days' } },
    { key: "23", value: "23", name: { fa: "۲۳ روز", en: '23 days' } },
    { key: "24", value: "24", name: { fa: "۲۴ روز", en: '24 days' } },
    { key: "25", value: "25", name: { fa: "۲۵ روز", en: '25 days' } },
    { key: "26", value: "26", name: { fa: "۲۶ روز", en: '26 days' } },
    { key: "27", value: "27", name: { fa: "۲۷ روز", en: '27 days' } },
    { key: "28", value: "28", name: { fa: "۲۸ روز", en: '28 days' } },
    { key: "29", value: "29", name: { fa: "۲۹ روز", en: '29 days' } },
    { key: "30", value: "30", name: { fa: "۳۰ روز", en: '30 days' } },
  ];
  // const DiscountWrapper = useRef(null);

  const onConfirm = (data?, autoFill = false) => {
    // if it's edit mode fill it
    if (autoFill) {
      setDiscountList((DiscountList) =>
        DiscountList.concat({
          days_limit: data.days_limit,
          discount_percent: data.discount_percent,
        })
      );
    } else {
      if (!days_limit) {
        setError_days_limit({
          status: true,
          message: language.CAR_SETTING.error20,
        });
        return;
      }
      setError_days_limit({
        status: false,
        message: "",
      });
      if (discount_percent === "") {
        setError_discount_percent({
          status: true,
          message: language.CAR_SETTING.error21,
        });
        return;
      }
      setError_discount_percent({
        status: false,
        message: "",
      });
      // if (mode.status) {
      //   let temp = [...DiscountList];
      //   temp[mode.index] = {
      //     days_limit: days_limit,
      //     discount_percent: discount_percent,
      //   };
      //   setDiscountList(temp);
      //   addDiscount(temp, true);
      //   setMode({
      //     status: false,
      //     index: null,
      //   });
      // } else {
      setDiscountList((DiscountList) =>
        DiscountList.concat({
          days_limit: days_limit,
          discount_percent: discount_percent,
        })
      );
      addDiscount({
        days_limit: days_limit,
        discount_percent: discount_percent,
      });
      // }
      setDiscount_percent("");
      setDays_limit_name(null);
      setDays_limit(null);
      setDiscountcheck(0);
    }
  };

  useEffect(() => {
    if (initialDiscountList) {
      setDiscountcheck(showDiscount);
      initialDiscountList.forEach((item) => {
        onConfirm(item, true);
      });
      setDiscountcheck(0);
    }
  }, [initialDiscountList]);

  // useEffect(() => {
  //   if (error) {
  //     scrollTo(0, DiscountWrapper.current.offsetTop);
  //   }
  // }, [error]);

  return (
    <div className='Discount_form_container' dir={activeLanguage === 'fa' ? 'rtl' : 'ltr'}>
      <p>{language.CAR_SETTING.discountNote}</p>
      {Discountcheck === 1 ? (
        <div className='Discount_Controller'>
          <div className='containers'>
            <DropdownSearch
              data={daysFarsi}
              language={language}
              // clearField={() => {
              //   setDays_limit_name(null);
              //   setDays_limit(null);
              // }}
              label={language.CAR_SETTING.moreThan}
              disableSearch={true}
              error_status={Error_days_limit.status || error}
              InputDisable={true}
              defaultVal={days_limit_name}
              Select={(e) => {
                if (Error_days_limit.status) {
                  setError_days_limit({
                    status: false,
                    message: "",
                  });
                }
                setDays_limit_name(e.text);
                setDays_limit(e.value);
              }}
            />
            {Error_days_limit.status && (
              <p className='input_error_message'>{Error_days_limit.message}</p>
            )}
          </div>
          <div className='tail containers'>
            <TextInput
              name='price'
              label={language.CAR_SETTING.percentage}
              error={{
                status: Error_discount_percent.status || error,
                message: Error_discount_percent.message,
              }}
              value={discount_percent}
              number={true}
              autoFocus={false}
              clearField={() => {
                setDiscount_percent("");
              }}
              min={1}
              max={2}
              onChangeHandler={(e) => {
                if (Error_discount_percent.status) {
                  setError_discount_percent({
                    status: false,
                    message: "",
                  });
                }
                setDiscount_percent(e);
              }}
              validation={{
                required: true,
                messages: {
                  required: language.CAR_SETTING.error22,
                },
              }}
            />
            <span> %</span>
          </div>
          <div className='divs button_box'>
            <p className='confirm' onClick={onConfirm}>
              {language.COMMON.submit}
            </p>
            <p
              // className="cancel"
              onClick={() => {
                if (mode.status) {
                  onConfirm();
                } else {
                  setMode({
                    status: false,
                    index: null,
                  });
                  setDiscount_percent("");
                  setDays_limit_name(null);
                  setDays_limit(null);
                  setDiscountcheck(0);
                }
                setShowBox(0);
              }}
            >
              {language.COMMON.cancel}
            </p>
            {mode.status && (
              <IoMdTrash
                className='Trash_icon_in_price_cart'
                onClick={() => {
                  setMode({
                    status: false,
                    index: null,
                  });
                  setDiscount_percent("");
                  setDays_limit_name(null);
                  setDays_limit(null);
                  setDiscountcheck(0);
                  setShowBox(0);
                }}
                color='#737373'
                size='2rem'
              />
            )}
          </div>
        </div>
      ) : (
        <div
          className='add_new_one HEAP_SetCarAndTiming_Btn_AddDiscount'
          onClick={() => {
            setShowBox(1);
            setDiscountcheck(1);
          }}
        >
          <p>
            {language.CAR_SETTING.addingDiscount}
            <IoMdAdd size='2rem' color='#4ba3ce' />
          </p>
        </div>
      )}
      <div className='Discount_list'>
        {DiscountList.map((item, i) => {
          return (
            <div key={i} className='discount_item_container'>
              <div className='discount_item'>
                <p>
                  {dynamicString([item.days_limit], language.CAR_SETTING.more)}
                  {/* {language.more} {item.days_limit} {language.day}{" "} */}
                  <br />
                  {item.discount_percent} {language.CAR_SETTING.percentage}
                </p>
                <span
                  // className="confirm"
                  onClick={() => {
                    setMode({
                      status: true,
                      index: i,
                    });
                    setDays_limit(item.days_limit);
                    setDays_limit_name(`${item.days_limit} روز`);
                    setDiscountcheck(1);
                    setDiscount_percent(item.discount_percent);

                    setDiscountList((DiscountList) =>
                      DiscountList.filter((_, index) => {
                        return index !== i;
                      })
                    );
                    removeDiscountList(i);
                  }}
                >
                  <IoMdCreate size='2rem' />
                </span>
                <span
                  // className="cancel"
                  onClick={() => {
                    setDiscountList((DiscountList) =>
                      DiscountList.filter((_, index) => {
                        return index !== i;
                      })
                    );
                    setDiscountcheck(0);
                    removeDiscountList(i);
                    setShowBox(0);
                  }}
                >
                  <IoMdTrash size='2rem' />
                </span>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

interface IDiscountBox {
  initialDiscountList: any;
  addDiscount: any;
  removeDiscountList: any;
  discountCheck: any;
  showDiscount: number;
  setShowBox: any;
  error?: boolean;
  language: any;
}

export default DiscountBox;
