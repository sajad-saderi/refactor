import Arrow_right from "../public/image/svg/arrow-right.svg";
import Star from "../public/image/svg/star.svg";
import Check from "../public/image/svg/check.svg";
import Calendar from "../public/image/svg/calendar.svg";
import Pin from "../public/image/svg/pin.svg";
import Opposite_arrows from "../public/image/svg/opposite_arrows.svg";
import Document from "../public/image/svg/document.svg";
import Car from "../public/image/svg/car.svg";
import Boxes from "../public/image/svg/boxes.svg";
import Gear from "../public/image/svg/gear.svg";
import Avatar from "../public/image/svg/avatar.svg";
import Fullscreen from "../public/image/svg/fullscreen.svg";
import Balloon from "../public/image/svg/balloon.svg";
import Active_shield from "../public/image/svg/active_shield.svg";
import Deactivate_shield from "../public/image/svg/deactivated_shield.svg";
import cancel from "../public/image/svg/cancel.svg";

const Icon = ({ name }: IIcon) => {
  let icon = null;
  switch (name) {
    case "arrow_right":
      icon = Arrow_right;
      break;
    case "star":
      icon = Star;
      break;
    case "check":
      icon = Check;
      break;
    case "calendar":
      icon = Calendar;
      break;
    case "pin":
      icon = Pin;
      break;
    case "opposite_arrows":
      icon = Opposite_arrows;
      break;
    case "document":
      icon = Document;
      break;
    case "car":
      icon = Car;
      break;
    case "boxes":
      icon = Boxes;
      break;
    case "gear":
      icon = Gear;
      break;
    case "avatar":
      icon = Avatar;
      break;
    case "fullscreen":
      icon = Fullscreen;
      break;
    case "balloon":
      icon = Balloon;
      break;
    case "active_shield":
      icon = Active_shield;
      break;
    case "deactivate_shield":
      icon = Deactivate_shield;
      break;
    case "cancel":
      icon = cancel;
      break;
    default:
      // eslint-disable-next-line no-console
      console.warn("Incorrect icon name specified");
      return null;
  }

  return <img src={icon} className="iconContainer" />;
};

interface IIcon {
  name:
    | "star"
    | "arrow_right"
    | "check"
    | "calendar"
    | "pin"
    | "document"
    | "car"
    | "boxes"
    | "gear"
    | "avatar"
    | "fullscreen"
    | "balloon"
    | "active_shield"
    | "deactivate_shield"
    | "opposite_arrows"
    | "cancel";
}

export default Icon;
