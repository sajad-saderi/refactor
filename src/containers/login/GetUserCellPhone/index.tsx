import { useState, useContext } from 'react';
import TextInput from '../../../components/form/TextInput';
import Button from '../../../components/form/Button';
import Error_middleware from '../../../API/ApiUtils';
import toast_context from '../../../context/Toast_context';
import languageCTX from '../../../context/languageCTX';
import ErrorHelper from '../../../../utils/error_helper';
import { errorCodeFormatter } from '../../../../utils/errorCodeFormatter';
import Icon from '../../../components/Icons';
import { ILocale } from '../../../../types';
import { axiosInstance } from '../../../../utils/axiosInstance';
import classNames from 'classnames';
import styles from './userCellPhone.module.scss';
import Input from '../../../components/form/input';

const GetUserCellPhone: React.FC<{
  cellPhone: string;
  language: ILocale;
  inactivateForm: boolean;
  setCellPhone: (arg: string) => void;
  panelController: () => void;
}> = ({
  cellPhone,
  language,
  inactivateForm,
  setCellPhone,
  panelController
}) => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState({
    status: false,
    message: ''
  });
  const toastCTX = useContext(toast_context);
  const { activeLanguage } = useContext(languageCTX);

  const sendConfirmCode = (e) => {
    e.preventDefault();
    if (!cellPhone) {
      setError({
        status: true,
        message: language.COMMON.insertYourPhone
      });
      return;
    }
    if (/[^0-9۰-۹]/g.test(cellPhone.toString())) {
      setError({
        status: true,
        message: language.COMMON.invalidCharacters
      });
      return;
    }
    setLoading(true);
    const SEND_CONFIRM_CODE = '/core/device/send-code';
    let CellNumber = cellPhone;
    if (/^[9][0-9][0-9]{8,8}$/.test(cellPhone)) {
      CellNumber = '0' + cellPhone;
    }
    axiosInstance({
      method: 'post',
      url: process.env.PRODUCTION_ENDPOINT + SEND_CONFIRM_CODE,
      data: {
        cell: CellNumber
      }
    })
      .then((response) => {
        if (response.data.success) {
          if (!response.data.has_utm_data) {
            sessionStorage['send_utm_data'] = true;
          }
          setLoading(false);
          panelController();
        }
      })
      .catch((error) => {
        Error_middleware(e);
        setLoading(false);
        if (error.response.data.error === 'INVALID_CELL') {
          setError({
            status: true,
            message:
              activeLanguage === 'fa'
                ? error.response.data.message
                : errorCodeFormatter(error.response.data.error)
          });
        } else {
          toastCTX.toast_option({
            message: error.response
              ? ErrorHelper({
                  errorObj: error.response,
                  _400Message: language.COMMON.errorInLogin
                })
              : error,
            color: '#ed9026',
            time: 0,
            autoClose: false
          });
        }
      });
  };

  return (
    <>
      <div className={styles.title}>
        <span className={styles.icon}>
          <Icon name='avatar' width='20px' height='20px' color='#fff' />
        </span>
        <h2>{language.LOGIN.login}</h2>
      </div>
      <form onSubmit={sendConfirmCode} className={styles.form}>
        <Input
          labelCustomClass={styles.labelCustomClass}
          type='text'
          error={error}
          // onError={(e) => setInputError(e)}
          name='cell Phone'
          onChange={(e) => {
            if (error.status) {
              setError({
                status: false,
                message: ''
              });
            }
            setCellPhone(e);
          }}
          number
          noClear
          value={cellPhone}
          label={language.LOGIN.cellPhone}
          onClear={() => setCellPhone('')}
          validationItems={{
            require: true,
            messages: {
              require: language.LOGIN.error1
            }
          }}
        />
        {/* <TextInput
          type='text'
          error={error}
          name='cell Phone'
          onChangeHandler={}
          autoFocus={false}
          localeString={false}
          HideClearIcon={true}
          value={cellPhone}
          label={language.LOGIN.cellPhone}
          clearField={}
          validation={{
            number: true,
            LengthControl: {
              minLen: 10,
              maxLen: 11
            },
            messages: {
              required: language.LOGIN.error1,
              length: language.LOGIN.error2,
              minLen: language.LOGIN.error_3,
              maxLen: language.LOGIN.error_3
            },
            required: true
          }}
        /> */}
        <Button
          disable={inactivateForm}
          customClass={classNames(
            styles.localClass,
            'actionButton',
            inactivateForm && 'disable_BTN'
          )}
          value={language.LOGIN.send}
          loading={loading}
          click={() => {}}
        />
      </form>
    </>
  );
};

export default GetUserCellPhone;
