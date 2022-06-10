import { useReducer, useState, useContext, useEffect } from 'react';
// import "./complete_register.scss";
import dynamic from 'next/dynamic';

const TextInput = dynamic(() => import('../../components/form/TextInput'));
const Button = dynamic(() => import('../../components/form/Button'));
// import DropdownSearch from "../../components/form/Dropdown";
// import TextInput from "../../components/form/TextInput";
// import Button from "../../components/form/Button";
import Modal_context from '../../context/Modal_context';
import toast_context from '../../context/Toast_context';
import context_user from '../../context/User_info';
import { REQUEST_USER_INFO_UPDATE } from '../../API';
import { useRouter } from 'next/router';
import jsCookie from 'js-cookie';
import ErrorHelper from '../../../utils/error_helper';
import net_CTX from '../../context/internetConnectionCTX';
import languageCTX from '../../context/languageCTX';
import Icon from '../../components/Icons';
import Input from '../../components/form/input';

const stateReducer = (current, action) => {
  switch (action.type) {
    case 'first_name':
      return { ...current, first_name: action.first_name };
    case 'last_name':
      return { ...current, last_name: action.last_name };
    case 'company_name':
      return { ...current, company_name: action.company_name };
    case 'day':
      return { ...current, day: action.day };
    case 'month':
      return { ...current, month: action.month };
    case 'year':
      return { ...current, year: action.year };
    default:
      throw new Error('Something is wrong');
  }
};

const stateErrorReducer = (current, action) => {
  switch (action.type) {
    case 'first_name':
      return {
        ...current,
        first_name: action.first_name,
        message: action.message
      };
    case 'last_name':
      return {
        ...current,
        last_name: action.last_name,
        message: action.message
      };
    case 'company_name':
      return {
        ...current,
        company_name: action.company_name,
        message: action.message
      };
    case 'day':
      return { ...current, day: action.day, message: action.message };
    case 'month':
      return { ...current, month: action.month, message: action.message };
    case 'year':
      return { ...current, year: action.year, message: action.message };
    case 'condition':
      return {
        ...current,
        condition: action.condition,
        message: action.message
      };
    case 'message':
      return { ...current, year: action.year, message: action.message };
    default:
      throw new Error('Something is wrong');
  }
};

const Complete_register_container = ({
  language
}: IComplete_register_container) => {
  const [rolesCheck, setRolesCheck] = useState(false);
  const [showCompanyName, setShowCompanyName] = useState(false);
  const [show, setShow] = useState(false);
  const [deactivate_form, set_deactivate_form] = useState(false);
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const [state, dispatch] = useReducer(stateReducer, {
    first_name: '',
    last_name: '',
    company_name: ''
    // day: "",
    // month: null,
    // year: "",
  });

  const [stateError, errorDispatch] = useReducer(stateErrorReducer, {
    first_name: false,
    last_name: false,
    company_name: false,
    day: false,
    month: false,
    year: false,
    condition: false,
    message: null
  });

  const monthsFarsi = [
    { key: '1', value: '1', text: 'فروردین' },
    { key: '2', value: '2', text: 'اردیبهشت' },
    { key: '3', value: '3', text: 'خرداد' },
    { key: '4', value: '4', text: 'تیر' },
    { key: '5', value: '5', text: 'مرداد' },
    { key: '6', value: '6', text: 'شهریور' },
    { key: '7', value: '7', text: 'مهر' },
    { key: '8', value: '8', text: 'آبان' },
    { key: '9', value: '9', text: 'آذر' },
    { key: '10', value: '10', text: 'دی' },
    { key: '11', value: '11', text: 'بهمن' },
    { key: '12', value: '12', text: 'اسفند' }
  ];
  const MODAL_CONTEXT = useContext(Modal_context);
  const toastCTX = useContext(toast_context);
  const user = useContext(context_user);
  const netCTX = useContext(net_CTX);
  const { activeLanguage } = useContext(languageCTX);

  useEffect(() => {
    // if the user is not register the login modal will show up
    if (window['auth']) {
      if (window['complete_register']) {
        set_deactivate_form(true);
        // router.push("/");
      }
    }

    // else {
    //   set_deactivate_form(true);
    //   if (localStorage["last_location"] !== "/add-car") window.history.go(-2);
    //   else
    //     router.push({
    //       pathname: "/add-car",
    //     });
    // }
    setShow(true);
  }, []);

  const submitHandler = async (e, state) => {
    e.preventDefault();
    setLoading(true);
    const userReplica = { ...user.data };
    const image_url =
      'https://core.sepris.com/static/core/default_profile_pic.png';
    // if all the validation is true
    if (validation(state)) {
      try {
        const user_info_res: any = await REQUEST_USER_INFO_UPDATE({
          token: userReplica?.token,
          first_name: state.first_name,
          last_name: state.last_name,
          // company_name is optional
          company_name: state.company_name === '' ? null : state.company_name
          // birth_date constructor 1399/01/01
          // birth_date: `${state.year}/${state.month}/${state.day}`,
        });
        // cache expire after 100 days
        jsCookie.set('first_name', state.first_name, {
          expires: 100
        });
        window['complete_register'] = true;
        user.update_user_data({
          ...userReplica,
          first_name: state.first_name,
          last_name: state.last_name,
          company_name: state.company_name === '' ? null : state.company_name,
          thumbnail_url: image_url,
          image_url,
          name: `${state.first_name} ${state.last_name}`
        });
        if (localStorage['last_location']) {
          router.replace(
            decodeURIComponent(localStorage['last_location']),
            undefined,
            { locale: activeLanguage }
          );

          // router.push(localStorage["last_location"]);
        } else {
          router.replace(
            {
              pathname: `/user/${user.data?.id}`
            },
            undefined,
            { locale: activeLanguage }
          );
        }
      } catch (error) {
        setLoading(false);
        if (error === 111) {
          netCTX.toggleTheContainer(true);
        } else
          toastCTX.toast_option({
            message: error.response
              ? ErrorHelper({
                  errorObj: error.response,
                  _400Message: language.COMMON.errorInRegistery
                })
              : error,
            color: '#ed9026',
            time: 0,
            autoClose: false
          });
      }
    } else {
      setLoading(false);
    }
  };

  // receive the Reducer type and reset the error status
  const resetTheErrorStatus = (value_name) => {
    if (value_name === 'message') {
      errorDispatch({
        type: value_name,
        message: null
      });
    } else {
      errorDispatch({
        type: value_name,
        [value_name]: null,
        message: null
      });
    }
  };

  const validation = (state) => {
    if (state.first_name.trim() === '') {
      errorDispatch({
        type: 'first_name',
        first_name: true,
        message: language.COMPLETE_REGISTER.errorName
      });
      return;
    } else {
      resetTheErrorStatus('first_name');
    }
    if (state.last_name.trim() === '') {
      errorDispatch({
        type: 'last_name',
        last_name: true,
        message: language.COMPLETE_REGISTER.errorLastname
      });
      return;
    } else {
      resetTheErrorStatus('last_name');
    }
    if (showCompanyName && state.company_name === '') {
      errorDispatch({
        type: 'company_name',
        company_name: true,
        message: 'لطفاً نام شرکت را وارد کنید'
      });
      return;
    } else {
      resetTheErrorStatus('company_name');
    }
    // if (state.day.trim() === "") {
    //   errorDispatch({
    //     type: "day",
    //     day: true,
    //     message: language.fill_day,
    //   });
    //   return;
    // } else if (+state.day > 31) {
    //   errorDispatch({
    //     type: "day",
    //     day: true,
    //     message: language.fill_correctly,
    //   });
    //   return;
    // } else {
    //   resetTheErrorStatus("day");
    // }
    // if (!state.month) {
    //   errorDispatch({
    //     type: "month",
    //     month: true,
    //     message: language.fill_month,
    //   });
    //   return;
    // } else {
    //   resetTheErrorStatus("month");
    // }
    // if (state.year.trim() === "") {
    //   errorDispatch({
    //     type: "year",
    //     year: true,
    //     message: language.fill_year,
    //   });
    //   return;
    // } else {
    //   resetTheErrorStatus("year");
    // }
    if (!rolesCheck) {
      errorDispatch({
        type: 'condition',
        condition: true,
        message: language.COMPLETE_REGISTER.errorPolicies
      });
      return;
    } else {
      resetTheErrorStatus('message');
    }
    return true;
  };

  useEffect(() => {
    if (rolesCheck) {
      errorDispatch({
        type: 'condition',
        condition: false,
        message: ''
      });
    }
  }, [rolesCheck]);

  return show ? (
    <article
      className='responsive  complete_register_container'
      dir={activeLanguage === 'fa' ? 'rtl' : 'ltr'}>
      {/* <div className='pageTitle'>
        <IoMdPersonAdd className='Person_icon' size='6rem' color='#4ba3ce' />
        <h3>{language.complete_register}</h3>
      </div> */}
      <form
        className='complete_register_form'
        onSubmit={(e) => submitHandler(e, state)}>
        <div className='login_modal_title'>
          <Icon name='avatar' width='20px' height='20px' color='#ffffff' />
          <h2>{language.COMPLETE_REGISTER.title}</h2>
        </div>
        <div className='name_container'>
          <Input
            name='first_name'
            label={language.COMMON.name}
            onClear={() => dispatch({ type: 'first_name', first_name: '' })}
            onChange={(e) => dispatch({ type: 'first_name', first_name: e })}
            value={state.first_name}
            error={{
              status: stateError.first_name,
              message: ''
            }}
            validationItems={{
              max: 50,
              require: true,
              messages: {
                require: language.COMPLETE_REGISTER.name
              }
            }}
          />
          {/* <TextInput
            name='first_name'
            label={language.COMMON.name}
            // min={2}
            max={50}
            clearField={() => dispatch({ type: 'first_name', first_name: '' })}
            onChangeHandler={(e) =>
              dispatch({ type: 'first_name', first_name: e })
            }
            value={state.first_name}
            autoFocus={false}
            error={{
              status: stateError.first_name,
              message: null
            }}
            validation={{
              required: true,
              messages: {
                required: language.COMPLETE_REGISTER.name
              }
            }}
          /> */}
          <Input
            name='last_name'
            label={language.COMMON.lastName}
            onClear={() => dispatch({ type: 'last_name', last_name: '' })}
            onChange={(e) => dispatch({ type: 'last_name', last_name: e })}
            value={state.last_name}
            error={{
              status: stateError.last_name,
              message: ''
            }}
            validationItems={{
              require: true,
              messages: {
                require: language.COMPLETE_REGISTER.lastName
              }
            }}
          />
          {/* <TextInput
            name='last_name'
            // min={2}
            label={language.COMMON.lastName}
            max={50}
            clearField=
            onChangeHandler=
            value={state.last_name}
            autoFocus={false}
            error={{
              status: stateError.last_name,
              message: null
            }}
            validation={{
              required: true,
              messages: {
                required: language.COMPLETE_REGISTER.lastname
              }
            }}
          /> */}
        </div>
        {/* <div className='company_part'>
          {!showCompanyName ? (
            <p onClick={() => setShowCompanyName(true)}>
              {language.add_company_name}
              <span> ({language.just_for_rental_companies})</span>
            </p>
          ) : (
            <div className='add_company_input_container'>
              <TextInput
                name='company_name'
                number={false}
                // min={1}
                max={100}
                label={language.company_name}
                clearField={() =>
                  dispatch({ type: "company_name", company_name: "" })
                }
                onChangeHandler={(e) =>
                  dispatch({ type: "company_name", company_name: e })
                }
                value={state.company_name}
                autoFocus={false}
                error={{
                  status: stateError.company_name,
                  message: null,
                }}
              />
              <span
                onClick={() => {
                  dispatch({ type: "company_name", company_name: "" });
                  setShowCompanyName(false);
                }}
              >
                {language.cancel}
              </span>
            </div>
          )}
        </div> */}
        {/* <label>{language.dob}</label>
        <div className='date_birth'>
          <TextInput
            name='day'
            number={true}
            min={1}
            max={2}
            placeholder={language.day}
            clearField={() => dispatch({ type: "day", day: "" })}
            onChangeHandler={(e) => dispatch({ type: "day", day: e })}
            value={state.day}
            autoFocus={false}
            error={{
              status: stateError.day,
              message: null,
            }}
            validation={{
              number: true,
              min: 1,
              max: 31,
              required: true,
              messages: {
                required: language.error_1,
                min: language.error_2,
                max: language.error_3,
              },
            }}
          />
          <DropdownSearch
            data={monthsFarsi}
            // clearField={() => dispatch({ type: "month", month: null })}
            Select={(i) => dispatch({ type: "month", month: i.value })}
            disableSearch={true}
            error_status={stateError.month}
          />
          <TextInput
            name='year'
            number={true}
            min={4}
            max={4}
            clearField={() => dispatch({ type: "year", year: "" })}
            onChangeHandler={(e) => dispatch({ type: "year", year: e })}
            value={state.year}
            placeholder={language.year_example}
            autoFocus={false}
            localeString={true}
            error={{
              status: stateError.year,
              message: null,
            }}
            validation={{
              number: true,
              length: 4,
              messages: {
                required: language.error_4,
              },
              required: true,
            }}
          />
        </div> */}
        <div
          className='check_box_container'
          dir={activeLanguage === 'fa' ? 'rtl' : 'ltr'}>
          <label className='container'>
            <span
              onClick={() => MODAL_CONTEXT.modalHandler('Law')}
              style={{
                textDecoration: 'underline',
                color: '#3fa6da',
                cursor: 'pointer',
                display: 'inline-block',
                marginBottom: '11px'
              }}>
              {' '}
              {language.COMPLETE_REGISTER.policies}
            </span>
            <span onClick={() => setRolesCheck(true)}>
              {' '}
              {language.COMPLETE_REGISTER.iAgree}
            </span>
            <input
              type='checkbox'
              onChange={(e) => {
                e.persist();
                if (e.target.checked) {
                  setRolesCheck(true);
                } else {
                  setRolesCheck(false);
                }
              }}
              name='roles'
            />
            <span
              className={[
                'checkmark',
                stateError.condition ? 'red_check_box' : null
              ].join(' ')}></span>
          </label>
        </div>
        <Button
          customClass={[
            'local_BTN HEAP_CompleteRegister_Btn_Submit',
            ,
            deactivate_form ? 'disable_BTN' : null
          ].join(' ')}
          value={language.COMMON.ok}
          disable={deactivate_form}
          click={() => {}}
          loading={loading}
        />
        {stateError.message ? (
          <p className='Error_message_text'> {stateError.message}</p>
        ) : null}
      </form>
    </article>
  ) : (
    <article className='minHeight'></article>
  );
};

interface IComplete_register_container {
  language: any;
}

export default Complete_register_container;
