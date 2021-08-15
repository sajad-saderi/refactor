import { useState, useContext } from "react";
import { letter_control } from "../../../utils/letter_control";
import { invert_hex } from "../../../utils/invert_hex";
import { random_hex_color } from "../../../utils/random_hex_color";

import User_info from "../../context/User_info";

const NameAvatar = ({
  name,
  css_display = "block",
  css_with,
  css_background_color,
  random_background,
  css_radius,
  css_text_color,
  clickOnElement,
}: INameAvatar) => {
  const [textColor, setTextColor] = useState(
    css_text_color
      ? css_text_color
      : css_background_color || random_background
      ? `#${invert_hex(
          css_background_color ? css_background_color : random_hex_color()
        )}`
      : "initial"
  );
  const fontSize = `${css_with / 2.5}px`;

  const userContext = useContext(User_info);

  const backGroundColor = css_background_color
    ? css_background_color
    : random_background
    ? `#${random_hex_color()}`
    : userContext.avatartBackgroundColor;
  if (!isNaN(name)) {
    name = "??";
  }

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
        <img src={letter_control(name).src} alt="حرف اول نام کاربری" />
      </span>
    </div>
  );
};

interface INameAvatar {
  name: any;
  css_display?: "block" | "inline-block" | "flex" | "grid";
  css_with?: number;
  css_background_color?: string;
  background_color_array?: Array<string>;
  random_background?: boolean;
  css_radius?: number;
  css_text_color?: string;
  clickOnElement?: any;
}

export default NameAvatar;
