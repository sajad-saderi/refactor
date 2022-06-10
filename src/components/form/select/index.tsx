import { useState, useEffect, useRef, useContext } from "react";
import classNames from "classnames";
import Icon from "../../Icons";
import useClickAway from "../../../../utils/hooks/useClickAway";
import Spinner from "../../Spinner";
import styles from "./select.module.scss";
import { ISelect } from "../../../../types/components";
import { ISelectedItem } from "../../../../types";

const Select = ({
  inputValue,
  onError,
  disable,
  placeholder,
  data,
  label,
  customInputClass,
  onClear,
  onSelect,
  noSearch,
  noArrow,
  noClear,
  colorPicker,
  nativeSelect,
  resetDropdown,
  searchPlaceHolder,
  language,
  activeLanguage,
}: ISelect) => {
  const [searchValue, setSearchValue] = useState("");
  const [showDropdown, setShowDropdown] = useState(false);
  const [localData, setLocalData] = useState<null | ISelectedItem[]>([]);
  const [colorCode, setColorCode] = useState<null | string>(null);
  const [isAllowedToShowNative, setIsAllowedToShowNative] = useState(false);

  const wrapperRef = useRef(null);

  useClickAway(wrapperRef, () => {
    setSearchValue("");
    setShowDropdown(false);
  });

  useEffect(() => {
    setLocalData(data);
    setIsAllowedToShowNative(window.innerWidth <= 992);
  }, [data]);

  useEffect(() => {
    if (resetDropdown) {
      onClear();
    }
  }, [resetDropdown]);

  const dropDownController = () => {
    setSearchValue("");
    setLocalData(data);
    setShowDropdown(!showDropdown);
  };

  const searchHandler = (e: string) => {
    if (e === "") {
      setLocalData(data);
    }
    if (!/[\(\)\/\\\?\+\*]/g.test(e)) {
      setSearchValue(e);
      if (data) {
        let filter: ISelectedItem[] | [] = data.filter(
          (item: ISelectedItem) => {
            return item.name[activeLanguage].toLowerCase().search(e) !== -1;
          }
        );
        if (filter.length === 0)
          filter = [
            {
              id: -1,
              name: {
                fa: language.COMMON.inputSearchNoResult,
                en: language.COMMON.inputSearchNoResult,
              },
            },
          ];
        setLocalData(filter);
      }
    }
  };

  const onClearField = () => {
    setShowDropdown(true);
    onClear();
  };

  return (
    <div
      className={classNames(
        styles.container,
        disable ? styles.disableContainer : ""
      )}
      ref={wrapperRef}
    >
      {label && <label className={styles.label}>{label}</label>}
      {nativeSelect && isAllowedToShowNative ? (
        <div className={styles.nativeSelect}>
          <span className={styles.nativeWithArrow}>
            <Icon name='chevronUp' width='20px' height='20px' color='#a5a5a5' />
          </span>
          <select
            disabled={disable}
            className={styles.defaultSelect}
            onChange={(e) => {
              e.persist();
              const selectedValue = JSON.parse(e.target.value);
              if (selectedValue.value === -1) {
                onClearField();
              } else {
                onSelect(selectedValue);
              }
            }}
          >
            <option value={JSON.stringify({ value: -1 })}></option>
            {localData?.map((i: any, index) => (
              <option key={index} value={JSON.stringify(i)}>
                {i.name[activeLanguage]}
              </option>
            ))}
          </select>
        </div>
      ) : (
        <div className={styles.inputWrapper}>
          <input
            className={classNames(
              customInputClass ? customInputClass : null,
              onError?.status ? styles.inputError : null
            )}
            readOnly
            data-hj-allow
            disabled={disable}
            value={inputValue}
            placeholder={placeholder}
            onClick={dropDownController}
          />
          {onError?.message ? (
            <span className={styles.errorMessage}>{onError?.message}</span>
          ) : null}
          {!data ? (
            <div className={styles.loading}>
              <Spinner display='block' width={20} color='#9E9E9E' />
            </div>
          ) : colorPicker && inputValue ? (
            <div
              className={styles.colorCube}
              style={{
                background: colorCode
                  ? colorCode
                  : colorPicker
                  ? inputValue
                  : undefined,
              }}
            />
          ) : inputValue.length > 0 && !noClear ? (
            <span className={styles.cleanIcon} onClick={onClearField}>
              <Icon name='close' height='20px' width='20px' color='#737373' />
            </span>
          ) : !noArrow ? (
            <span
              className={[
                styles.withArrow,
                showDropdown ? styles.rotateArrow : null,
              ].join(" ")}
              onClick={dropDownController}
            >
              <Icon
                name='chevronUp'
                color='#737373'
                width='20px'
                height='20px'
              />
            </span>
          ) : null}
        </div>
      )}
      {data && showDropdown && (!nativeSelect || !isAllowedToShowNative) ? (
        <div className={styles.dropdown}>
          {
            <div className={styles.resultList}>
              {!noSearch && (
                <div className={styles.searchContainer}>
                  <input
                    placeholder={`${language.COMMON.search} ${searchPlaceHolder} ..`}
                    name='search'
                    type='text'
                    value={searchValue}
                    onChange={(e) => {
                      searchHandler(e.target.value.trim());
                    }}
                  />
                  {!searchValue ? (
                    <Icon
                      name='search'
                      width='20px'
                      height='20px'
                      color='#737373'
                    />
                  ) : (
                    <span
                      onClick={() => {
                        searchHandler("");
                      }}
                    >
                      <Icon
                        name='close'
                        width='20px'
                        height='20px'
                        color='#737373'
                      />
                    </span>
                  )}
                </div>
              )}
              {localData?.map((i: ISelectedItem) => (
                <p
                  className={styles.items}
                  onClick={() => {
                    if (i.id === -1) return;
                    if (i.code) {
                      setColorCode(i.code);
                    }
                    onSelect(i);
                    dropDownController();
                  }}
                  key={i.id}
                >
                  {i.name[activeLanguage]}
                  {i.code && (
                    <span
                      style={{ background: `${i.code}` }}
                      className={styles.colorBox}
                    />
                  )}
                </p>
              ))}
            </div>
          }
        </div>
      ) : null}
    </div>
  );
};

export default Select;
