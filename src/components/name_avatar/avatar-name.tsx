import { useState, useContext, useEffect } from 'react';
import { letter_control } from '../../../utils/letter_control';
import { invert_hex } from '../../../utils/invert_hex';
import { random_hex_color } from '../../../utils/random_hex_color';

import User_info from '../../context/User_info';
const colorArray = [
  '#EC7F00',
  '#14808E',
  '#7A3B69',
  '#2A562A',
  '#116B98',
  '#116B98',
];
const NameAvatar = ({
  name,
  css_display = 'block',
  css_with,
  css_background_color,
  random_background,
  css_radius,
  css_text_color,
  clickOnElement,
  arrayIndex,
}: INameAvatar) => {
  const [letter, setLetter] = useState('');
  const [textColor, setTextColor] = useState(
    css_text_color
      ? css_text_color
      : css_background_color || random_background
      ? `#${invert_hex(
          css_background_color ? css_background_color : random_hex_color(),
        )}`
      : 'initial',
  );
  const fontSize = `${css_with / 2.5}px`;

  const userContext = useContext(User_info);

  const backGroundColor = css_background_color
    ? css_background_color
    : random_background
    ? `#${random_hex_color()}`
    : arrayIndex
    ? colorArray[Math.abs(arrayIndex - 5)]
    : userContext.avatartBackgroundColor;
  if (!isNaN(name)) {
    name = false;
  }

  useEffect(() => {
    if (name) {
      console.log(`svgAlphabet/${letter_control(name).src}.svg`);
      setLetter(letter_control(name).src);
    }
  }, [name]);

  return (
    <div
      className="name_avatar__container"
      style={{
        display: css_display,
        width: `${css_with}px`,
        height: `${css_with}px`,
        backgroundColor: backGroundColor,
        fontSize: fontSize,
        borderRadius: `${css_radius}%`,
      }}
      onClick={clickOnElement}
    >
      <span
        style={{
          color: textColor,
        }}
      >
        {name ? (
          <img
            src={
              letter
                ? `/fonts/svgAlphabet/${letter}.svg`
                : null
            }
            alt="حرف اول نام کاربری"
          />
        ) : null}
      </span>
    </div>
  );
};

interface INameAvatar {
  name: any;
  css_display?: 'block' | 'inline-block' | 'flex' | 'grid';
  css_with?: number;
  css_background_color?: string;
  background_color_array?: Array<string>;
  random_background?: boolean;
  css_radius?: number;
  css_text_color?: string;
  clickOnElement?: any;
  arrayIndex?: number;
}

export default NameAvatar;
