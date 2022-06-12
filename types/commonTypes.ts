export type supportedLanguages = "fa" | "en" | "ar" | "tr";
interface TLanguageFileStructure {
  [key: string]: any | string;
}
export type ILocale = TLanguageFileStructure;
declare global {
  interface Window {
    dataLayer: any;
    auth: boolean;
    registered: boolean;
  }
}
export interface ISvg {
  color: string;
  width: string;
  height: string;
  rotate?: number;
}
export type dateObject = {
  year: number;
  month: number;
  day: number;
};

export interface IItemScheme {
  value: number;
  name: { fa: string; en: string };
}

export interface ISelectedItem extends IItemScheme {
  code?: string;
}