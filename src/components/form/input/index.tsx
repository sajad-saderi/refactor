import { ChangeEvent } from 'react';
import classNames from 'classnames';
import Icon from '../../Icons';
import { IInput } from '../../../../types';
import { inputValidation } from '../../../../utils/validation/inputValidation';
import { persianNumbers } from '../../../../utils/persianStandardNumbers';
import styles from './input.module.scss';

const Input = ({
  name,
  onClear,
  onChange,
  value,
  error: { status, message },
  disabled,
  label,
  placeholder,
  labelColor,
  number,
  noClear,
  withSeparator,
  validationItems,
  onError,
  tailValue,
  labelCustomClass,
  type
}: IInput) => {
  const valueHandler = (e: ChangeEvent<HTMLInputElement>) => {
    let { value } = e.target;
    if (number) {
      value = persianNumbers(value);
      value = value.replace(/[^0-9]/g, '');
    }
    onChange(value);
  };

  return (
    <div className={styles.inputContainer}>
      {label && (
        <label
          style={{
            color: labelColor
          }}
          className={classNames(styles.label, labelCustomClass)}>
          {label}
        </label>
      )}
      <div className={styles.inputWrapper}>
        <input
          type={type || 'text'}
          className={classNames(
            styles.input,
            status ? styles.inputError : null,
            type === 'number' ? styles.changeDirectionOnFocus : null
          )}
          name={name}
          value={
            number
              ? value === ''
                ? value.toLocaleString()
                : withSeparator
                  ? Number(value).toLocaleString()
                  : value
              : value
          }
          onChange={valueHandler}
          disabled={disabled}
          placeholder={placeholder}
          onBlur={() => {
            if (validationItems) {
              const { status, message } = inputValidation(
                validationItems,
                value
              );
              if (!status && onError) {
                onError({
                  status: true,
                  message: message as string
                });
              }
            }
          }}
          onFocus={() => {
            if (onError)
              onError({
                status: false,
                message: ''
              });
          }}
        />
        {(value as string).length > 0 && !noClear && (
          <span
            className={styles.clean}
            onClick={() => {
              if (onError)
                onError({
                  status: false,
                  message: ''
                });
              onClear();
            }}>
            <Icon name='close' color='#a5a5a5' width='20px' height='20px' />
          </span>
        )}
        {tailValue ? (
          <span className={styles.tailContent}>{tailValue}</span>
        ) : null}
      </div>
      {status && <p className={styles.inputErrorMessage}>{message}</p>}
    </div>
  );
};

export default Input;
