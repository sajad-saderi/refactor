export const numberChanger = (string:string, locale) => {
	let temp = '';  
	if(string){ 
	for (let i = 0; i < string.length; i++) {
		let b: string | number = '';
		b = string[i];
		if (locale === 'fa')
			switch (b) {
				case '0':
					b = '۰';
					break;
				case '1':
					b = '۱';
					break;
				case '2':
					b = '۲';
					break;
				case '3':
					b = '۳';
					break;
				case '4':
					b = '۴';
					break;
				case '5':
					b = '۵';
					break;
				case '6':
					b = '۶';
					break;
				case '7':
					b = '۷';
					break;
				case '8':
					b = '۸';
					break;
				case '9':
					b = '۹';
					break;
				default:
					b = string[i];
					break;
			}
		else
			switch (b) {
				case '۰':
					b = '0';
					break;
				case '۱':
					b = '1';
					break;
				case '۲':
					b = '2';
					break;
				case '۳':
					b = '3';
					break;
				case '۴':
					b = '4';
					break;
				case '۵':
					b = '5';
					break;
				case '۶':
					b = '6';
					break;
				case '۷':
					b = '7';
					break;
				case '۸':
					b = '8';
					break;
				case '۹':
					b = '9';
					break;
				default:
					b = string[i];
					break;
			}
		temp += b;
	}
	return temp;
}return string 
};
