import classNames from 'classnames';
import React, { useEffect, useRef, useState } from 'react';
import { persianNumbers } from '../../../../../utils/persianStandardNumbers';
import styles from './codeInput.module.scss';

const CodeInput: React.FC<{
  setCode: (e: string) => void;
}> = ({ setCode }) => {
  const input0 = useRef<HTMLInputElement>(null);
  const input1 = useRef<HTMLInputElement>(null);
  const input2 = useRef<HTMLInputElement>(null);
  const input3 = useRef<HTMLInputElement>(null);
  const [value0, setValue0] = useState('');
  const [value1, setValue1] = useState('');
  const [value2, setValue2] = useState('');
  const [value3, setValue3] = useState('');
  const [activeInput, setActiveInput] = useState([true, false, false, false]);

  const characterHandler = (
    e: React.KeyboardEvent<HTMLInputElement>,
    index: number
  ) => {
    let character = persianNumbers(e.key);
    if (!/[0-9]/g.test(character) && character !== 'Backspace') {
      e.preventDefault();
      return;
    }
    if (character === 'Backspace' && index === 1 && value1) {
      setValue1('');
      setActiveInput([false, true, false, false]);
      return;
    } else if (character === 'Backspace' && index === 2 && value2) {
      setValue2('');
      setActiveInput([false, false, true, false]);
      return;
    } else if (character === 'Backspace' && index === 3 && value3) {
      setValue3('');
      setActiveInput([false, false, false, true]);
      return;
    } else if (character === 'Backspace' && index === 0) {
      setValue0('');
      setActiveInput([true, false, false, false]);
      return;
    }
    if (character === 'Backspace' && index === 1) {
      setValue1('');
      input0.current?.focus();
      setActiveInput([true, false, false, false]);
      return;
    } else if (character === 'Backspace' && index === 2) {
      setValue2('');
      input1.current?.focus();
      setActiveInput([false, true, false, false]);
      return;
    } else if (character === 'Backspace' && index === 3) {
      setValue3('');
      input2.current?.focus();
      setActiveInput([false, false, true, false]);
      return;
    } else if (index === 0) {
      setValue0(character);
      input1.current?.focus();
      setActiveInput([false, true, false, false]);
      return;
    } else if (index === 1) {
      setValue1(character);
      input2.current?.focus();
      setActiveInput([false, false, true, false]);
      return;
    } else if (index === 2) {
      setValue2(character);
      input3.current?.focus();
      setActiveInput([false, false, false, true]);
      return;
    } else if (index === 3) {
      setValue3(character);
      input3.current?.blur();
      setActiveInput([false, false, false, false]);
      return;
    }
  };

  useEffect(() => {
    if ((value0 + value1 + value2 + value3).length === 4) {
      setCode(value0 + value1 + value2 + value3);
    } else {
      setCode('');
    }
  }, [value0, value1, value2, value3]);

  return (
    <div className={styles.container}>
      <input
        ref={input3}
        onKeyUp={(e) => characterHandler(e, 3)}
        value={value3}
        type='number'
        name='code'
        className={classNames(
          styles.codeInput,
          activeInput[3] ? styles.activeInput : null
        )}
        onFocus={() => setActiveInput([false, false, false, true])}
        autoComplete='false'
      />
      <input
        ref={input2}
        onKeyUp={(e) => characterHandler(e, 2)}
        type='number'
        value={value2}
        name='code'
        className={classNames(
          styles.codeInput,
          activeInput[2] ? styles.activeInput : null
        )}
        onFocus={() => setActiveInput([false, false, true, false])}
        autoComplete='false'
      />
      <input
        ref={input1}
        value={value1}
        onKeyUp={(e) => characterHandler(e, 1)}
        type='number'
        name='code'
        className={classNames(
          styles.codeInput,
          activeInput[1] ? styles.activeInput : null
        )}
        onFocus={() => setActiveInput([false, true, false, false])}
        autoComplete='false'
      />
      <input
        ref={input0}
        value={value0}
        onKeyUp={(e) => characterHandler(e, 0)}
        type='number'
        name='code'
        className={classNames(
          styles.codeInput,
          activeInput[0] ? styles.activeInput : null
        )}
        onFocus={() => setActiveInput([true, false, false, false])}
        autoComplete='false'
        autoFocus
      />
    </div>
  );
};

export default CodeInput;
