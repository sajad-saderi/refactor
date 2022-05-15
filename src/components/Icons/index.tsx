import { Download } from "./svg/download";
import { Checklist } from "./svg/checklist";
import { Contract } from "./svg/contract";
import { Shield } from "./svg/shield";
import { ChevronUp } from "./svg/chevronUp";
import { Earth } from "./svg/earth";
import { Close } from "./svg/close";
import { WhatsApp } from "./svg/whatsApp";
import { Twitter } from "./svg/twitter";
import { Instagram } from "./svg/instagram";
import { SearchIcon } from "./svg/search";
import { Options } from "./svg/options";
import { Location } from "./svg/location";
import { Pictures } from "./svg/pictures";
import { Affordable } from "./svg/affordable";
import { Check } from "./svg/check";
import { SUV } from "./svg/SUV";
import { ChatBalloon } from "./svg/chatBalloon";
import { Calender } from "./svg/calendar";
import { Gear } from "./svg/gear";
import { Star } from "./svg/star";
import { DocumentIcon } from "./svg/documentIcon";
import { TwoWayArrows } from "./svg/twoWayArrows";
import { Arrow } from "./svg/arrow";
import { Car } from "./svg/car";
import { Avatar } from "./svg/avatar";
import { Logout } from "./svg/logout";
import { Pencil } from "./svg/pencil";
import { Trash } from "./svg/trash";
import { AlarmClock } from "./svg/alarmClock";
import { ActiveShield } from "./svg/activeShield";
import { InactivatedShield } from "./svg/InactivatedShield";
import { CreditCard } from "./svg/creditCard";
import { Phone } from "./svg/phone";
import { FlashBack } from "./svg/flashBack";
import { Clock } from "./svg/clock";
import { Reject } from "./svg/reject";
import { OutOfDate } from "./svg/outOfDate";
import { StopSign } from "./svg/stopSign";
import { Key } from "./svg/key";
import { Minus } from "./svg/minus"; 
import { Plus } from "./svg/plus";
import { Dash } from "./svg/dash";
import { Refresh } from "./svg/refresh";
import { Warning } from "./svg/warning";
import { Fullscreen } from "./svg/fullscreen";
import { IIcon } from "../../../types";

const Icon = ({ name, width, height, color, rotate }: IIcon) => {
  switch (name) {
    case "whatsApp":
      return <WhatsApp color={color} height={height} width={width} />;
    case "twitter":
      return <Twitter color={color} height={height} width={width} />;
    case "instagram":
      return <Instagram color={color} height={height} width={width} />;
    case "search":
      return <SearchIcon color={color} height={height} width={width} />;
    case "earth":
      return <Earth color={color} height={height} width={width} />;
    case "chevronUp":
      return <ChevronUp color={color} height={height} width={width} rotate={rotate} />;
    case "close":
      return <Close color={color} height={height} width={width} />;
    case "options":
      return <Options color={color} height={height} width={width} />;
    case "pictures":
      return <Pictures color={color} height={height} width={width} />;
    case "location":
      return <Location color={color} height={height} width={width} />;
    case "affordable":
      return <Affordable color={color} height={height} width={width} />;
    case "SUV":
      return <SUV color={color} height={height} width={width} />;
    case "check":
      return <Check color={color} height={height} width={width} />;
    case "chatBalloon":
      return <ChatBalloon color={color} height={height} width={width} />;
    case "calender":
      return <Calender color={color} height={height} width={width} />;
    case "gear":
      return <Gear color={color} height={height} width={width} />;
    case "star":
      return <Star color={color} height={height} width={width} />;
    case "twoWayArrows":
      return <TwoWayArrows color={color} height={height} width={width} />;
    case "arrow":
      return <Arrow color={color} height={height} width={width} />;
    case "document":
      return <DocumentIcon color={color} height={height} width={width} />;
    case "car":
      return <Car color={color} height={height} width={width} />;
    case "avatar":
      return <Avatar color={color} height={height} width={width} />;
    case "pencil":
      return <Pencil color={color} height={height} width={width} />;
    case "logout":
      return <Logout color={color} height={height} width={width} />;
    case "trash":
      return <Trash color={color} height={height} width={width} />;
    case "alarmClock":
      return <AlarmClock color={color} height={height} width={width} />;
    case "clock":
      return <Clock color={color} height={height} width={width} />;
    case "activeShield":
      return <ActiveShield color={color} height={height} width={width} />;
    case "inactivatedShield":
      return <InactivatedShield color={color} height={height} width={width} />;
    case "creditCard":
      return <CreditCard color={color} height={height} width={width} />;
    case "phone":
      return <Phone color={color} height={height} width={width} />;
    case "flashBack":
      return <FlashBack color={color} height={height} width={width} />;
    case "reject":
      return <Reject color={color} height={height} width={width} />;
    case "outOfDate":
      return <OutOfDate color={color} height={height} width={width} />;
    case "stopSign":
      return <StopSign color={color} height={height} width={width} />;
    case "key":
      return <Key color={color} height={height} width={width} />;
    case "minus":
      return <Minus color={color} height={height} width={width} />;
    case "plus":
      return <Plus color={color} height={height} width={width} />;
    case "download":
      return <Download color={color} height={height} width={width} />;
    case "checklist":
      return <Checklist color={color} height={height} width={width} />;
    case "contract":
      return <Contract color={color} height={height} width={width} />;
    case "shield":
      return <Shield color={color} height={height} width={width} />;
    case "dash":
      return <Dash color={color} height={height} width={width} />;
    case "refresh":
      return <Refresh color={color} height={height} width={width} />;
    case "warning":
      return <Warning color={color} height={height} width={width} />;
    case "fullscreen":
      return <Fullscreen color={color} height={height} width={width} />;
    default:
      console.warn("Incorrect icon name specified");
      return null;
  }
};

export default Icon;
