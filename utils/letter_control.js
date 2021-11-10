export const letter_control = (word) => {
  const firstLetterOfWord = word.slice(0, 1).toUpperCase();
  if (/^[A-Z]*$/.test(firstLetterOfWord)) {
    return {
      language: 'en',
      src: findSvgForEnChar(firstLetterOfWord),
    };
  } else if (/^[\u0600-\u06FF\s]+$/.test(firstLetterOfWord)) {
    return {
      language: 'fa',
      src: findSvgForFaChar(firstLetterOfWord),
    };
  }
};

const findSvgForEnChar = (letter) => {
  let svgAddress = null;
  switch (letter) {
    case 'Q':
      svgAddress = 'q';
      break;
    case 'W':
      svgAddress = 'w';
      break;
    case 'E':
      svgAddress = 'e';
      break;
    case 'R':
      svgAddress = 'r';
      break;
    case 'T':
      svgAddress = 't';
      break;
    case 'Y':
      svgAddress = 'y';
      break;
    case 'U':
      svgAddress = 'u';
      break;
    case 'I':
      svgAddress = 'i';
      break;
    case 'O':
      svgAddress = 'o';
      break;
    case 'P':
      svgAddress = 'p';
      break;
    case 'A':
      svgAddress = 'a';
      break;
    case 'S':
      svgAddress = 's';
      break;
    case 'D':
      svgAddress = 'd';
      break;
    case 'F':
      svgAddress = 'f';
      break;
    case 'G':
      svgAddress = 'g';
      break;
    case 'H':
      svgAddress = 'h';
      break;
    case 'J':
      svgAddress = 'j';
      break;
    case 'K':
      svgAddress = 'k';
      break;
    case 'L':
      svgAddress = 'l';
      break;
    case 'Z':
      svgAddress = 'z';
      break;
    case 'X':
      svgAddress = 'x';
      break;
    case 'C':
      svgAddress = 'c';
      break;
    case 'V':
      svgAddress = 'v';
      break;
    case 'B':
      svgAddress = 'b';
      break;
    case 'N':
      svgAddress = 'n';
      break;
    case 'M':
      svgAddress = 'm';
      break;
    default:
      svgAddress = 'a';
      break;
  }
  return `english/${svgAddress}`;
};

const findSvgForFaChar = (letter) => {
  let svgAddress = null;
  switch (letter) {
    case 'ا':
      svgAddress = 'aaa';
      break;
    case 'آ':
      svgAddress = 'aleph';
      break;
    case 'ب':
      svgAddress = 'b';
      break;
    case 'د':
      svgAddress = 'd';
      break;
    case 'ذ':
      svgAddress = 'dz';
      break;
    case 'ع':
      svgAddress = 'eyn';
      break;
    case 'گ':
      svgAddress = 'gaaf';
      break;
    case 'ق':
      svgAddress = 'gh';
      break;
    case 'غ':
      svgAddress = 'gheyn';
      break;
    case 'چ':
      svgAddress = 'ch';
      break;
    case 'ه':
      svgAddress = 'hgerd';
      break;
    case 'ح':
      svgAddress = 'hh';
      break;
    case 'ج':
      svgAddress = 'j';
      break;
    case 'ک':
      svgAddress = 'kaaf';
      break;
    case 'خ':
      svgAddress = 'kh';
      break;
    case 'ل':
      svgAddress = 'laam';
      break;
    case 'م':
      svgAddress = 'mim';
      break;
    case 'ن':
      svgAddress = 'non';
      break;
    case 'پ':
      svgAddress = 'p';
      break;
    case 'ر':
      svgAddress = 'r';
      break;
    case 'ز':
      svgAddress = 'rz';
      break;
    case 'ش':
      svgAddress = 'shin';
      break;
    case 'ت':
      svgAddress = 't';
      break;
    case 'ط':
      svgAddress = 'tdasteh';
      break;
    case 'ظ':
      svgAddress = 'tz';
      break;
    case 'و':
      svgAddress = 'v';
      break;
    case 'ی':
      svgAddress = 'yee';
      break;
    case 'ض':
      svgAddress = 'zaad';
      break;
    case 'ژ':
      svgAddress = 'zh';
      break;
    case 'ف':
      svgAddress = 'f';
      break;
    case 'ص':
      svgAddress = 'saad';
      break;
    case 'ث':
      svgAddress = 'se';
      break;
    case 'س':
      svgAddress = 'seen';
      break;
    default:
      svgAddress = 'aaa';
      break;
  }
  return `persian/${svgAddress}`;
};
