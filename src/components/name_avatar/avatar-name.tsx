import { letter_control } from "../../../utils/letter_control";
import { invert_hex } from "../../../utils/invert_hex";
import { random_hex_color } from "../../../utils/random_hex_color";
import "./avatar-name.scss";

const NameAvatar = ({
  name,
  css_display = "block",
  css_with,
  css_background_color,
  random_background,
  css_radius,
  css_text_color,
}: INameAvatar) => {
  if (!isNaN(name)) {
    name = "??";
  }

  let background_color = css_background_color
    ? css_background_color
    : random_background
    ? `#${random_hex_color()}`
    : "initial";

  let text_color = css_text_color
    ? css_text_color
    : css_background_color || random_background
    ? `#${invert_hex(
        css_background_color ? css_background_color : random_hex_color()
      )}`
    : "initial";

  let font_size = `${css_with / 2.5}px`;

  return (
    <div
      className='name_avatar__container'
      style={{
        display: css_display,
        width: `${css_with}px`,
        height: `${css_with}px`,
        backgroundColor: background_color,
        fontSize: font_size,
        borderRadius: `${css_radius}%`,
      }}
    >
      <span
        style={{
          color: text_color,
        }}
      >
        {letter_control(name)}
      </span>
    </div>
  );
};

interface INameAvatar {
  name: any;
  css_display: string;
  css_with?: number;
  css_background_color?: string;
  random_background?: boolean;
  css_radius?: number;
  css_text_color?: string;
}

export default NameAvatar;
