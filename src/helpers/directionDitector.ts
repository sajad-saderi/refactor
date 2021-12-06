import { supportedLanguages } from '../../utils/types/index';

type Direction = 'rtl' | 'ltr';

export function directionDetector(locale: supportedLanguages): Direction {
  let direction = null;
  switch (locale) {
    case 'ar':
      direction = 'rtl';
      break;
    case 'en':
      direction = 'ltr';
      break;
    case 'tr':
      direction = 'ltr';
      break;
    default:
      direction = 'rtl';
      break;
  }
  return direction;
}
