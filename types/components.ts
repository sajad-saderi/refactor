import { supportedLanguages } from './../utils/types/commonTypes';
import { IItemScheme, ILocale } from './commonTypes';

export interface IInputValidationItems {
  require?: boolean;
  number?: boolean;
  min?: number;
  max?: number;
  messages?: {
    require?: string;
    number?: string;
    min?: string;
    max?: string;
  };
}

interface IInputError {
  status: boolean;
  message: string;
}

export interface IInput {
  name: string;
  labelCustomClass?: string;
  onClear: () => void;
  onChange: any;
  value: string | number;
  error: IInputError;
  disabled?: boolean;
  max?: number;
  min?: number;
  label?: string;
  placeholder?: string;
  labelColor?: string;
  number?: boolean;
  noClear?: boolean;
  withSeparator?: boolean;
  validationItems?: IInputValidationItems;
  onError?: (data: IInputError) => void;
  tailValue?: string;
  type?: string;
}

export interface ISelect {
  inputValue: string;
  onError?: { status: boolean; message?: string };
  disable?: boolean;
  placeholder?: string;
  data: IItemScheme[] | null;
  label?: string;
  customInputClass?: string;
  onClear: () => void;
  onSelect: (selectedItem: IItemScheme) => void;
  noSearch?: boolean;
  noArrow?: boolean;
  noClear?: boolean;
  colorPicker?: boolean;
  nativeSelect?: boolean;
  resetDropdown?: boolean;
  searchPlaceHolder?: string;
  language: ILocale;
  activeLanguage: supportedLanguages
}

export interface IAccordion {
  questions: {
    title: string;
    content: string;
  }[];
}

export interface IIcon {
  name:
  | "arrow"
  | "whatsApp"
  | "avatar"
  | "twitter"
  | "instagram"
  | "chevronUp"
  | "earth"
  | "close"
  | "options"
  | "location"
  | "pictures"
  | "affordable"
  | "SUV"
  | "check"
  | "chatBalloon"
  | "calender"
  | "gear"
  | "star"
  | "trash"
  | "car"
  | "twoWayArrows"
  | "boxes"
  | "document"
  | "logout"
  | "key"
  | "pencil"
  | "alarmClock"
  | "clock"
  | "activeShield"
  | "inactivatedShield"
  | "creditCard"
  | "phone"
  | "flashBack"
  | "reject"
  | "outOfDate"
  | "stopSign"
  | "minus"
  | "plus"
  | "search"
  | "download"
  | "checklist"
  | "contract"
  | "dash"
  | "refresh"
  | "warning"
  | "fullscreen"
  | "quotation"
  | "paste"
  | "carOptions"
  | "paper"
  | "shield";
  width: string;
  height: string;
  color: string;
  rotate?: number;
}
