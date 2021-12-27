import { dateObject } from './commonTypes'

type initialCalender = dateObject | null



export interface ICalender {
    from: {
        fa: { dump: initialCalender, name: string }
        en: { dump: initialCalender, name: string }
    }
    to: {
        fa: { dump: initialCalender, name: string }
        en: { dump: initialCalender, name: string }
    }
}
export interface ILocation { id: number, fa: string, en: string }

export interface IAppStore { activeLanguage: string, date: ICalender, location: ILocation }
