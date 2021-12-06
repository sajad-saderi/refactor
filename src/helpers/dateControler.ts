import { dateObject } from '../../types';
import moment from 'moment-jalaali';

export const twoWayDateConvertor = (date: dateObject | string) => {
    let flattenDate = null
    if (typeof (date) === 'string') {
        let createDateObject = date.split("/");
        flattenDate = date;
        date = {
            year: +createDateObject[0],
            month: +createDateObject[1],
            day: +createDateObject[2],
        }
    } else {
        flattenDate = `${date.year}/${date.month}/${date.day}`
    }

    if (date.year > 1900) {
        let convertedToJalali = moment(flattenDate, 'YYYY/MM/DD').format('jYYYY/jMM/jDD')
        let convertedToJalaliToArray = convertedToJalali.split("/");
        return {
            fa: {
                name: convertedToJalali,
                dump: {
                    year: +convertedToJalaliToArray[0],
                    month: +convertedToJalaliToArray[1],
                    day: +convertedToJalaliToArray[2],

                }
            },
            en: {
                name: flattenDate,
                dump: {
                    year: date.year,
                    month: date.month,
                    day: date.day,

                }
            }
        }
    }
    if (date.year < 1900) {
        let convertedToGeorgian = moment(flattenDate, 'jYYYY/jMM/jDD').format('YYYY/MM/DD')
        let convertedToGeorgianToArray = convertedToGeorgian.split("/");
        return {
            fa: {
                name: flattenDate,
                dump: {
                    year: date.year,
                    month: date.month,
                    day: date.day,

                }
            },
            en: {
                name: convertedToGeorgian,
                dump: {
                    year: +convertedToGeorgianToArray[0],
                    month: +convertedToGeorgianToArray[1],
                    day: +convertedToGeorgianToArray[2],

                }
            }
        }
    }
}


