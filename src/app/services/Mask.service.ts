import { Injectable }   from '@angular/core';

@Injectable()

export class MaskService {

	constructor() {}

	public convertForApi(

		text:			string | number,

		textType:		string,

		convertFrom?:	string

	): string | number {

		switch (textType) {

			case 'currency':
				
				return this.textAsNumber(text);

			case 'number':

				return this.textAsNumber(text);

			case 'percent':

				return (convertFrom === 'percent') ? this.percentAsDecimal(text) : this.textAsNumber(text);

			default:

				return this.textAsNumber(text);
				
		}

	}

	public convertForView(

		text:			string | number,

		textType:		string,

		convertFrom?:	string

	): string | number {

		switch (textType) {

			case 'currency':
				
				return this.textAsCurrency(text);

			case 'number':

				return this.textAsThousands(text);

			case 'percent':

				return (convertFrom === 'decimal') ? this.decimalToPercent(text) : this.textAsNumber(text);
		
			default:

				return (typeof text === 'number') ? '' + text + '' : text;

		}

	}

	public decimalToPercent(text: string | number): string {

		const number	= (typeof text === 'number') ? text: this.textAsNumber(text);

		return number.toLocaleString(undefined, { style: 'percent', minimumFractionDigits: 2 });

	}

	public percentAsDecimal(text: string | number): number {

		const number	= (typeof text === 'number') ? text: this.textAsNumber(text);

		return number * 1.0 / 100;

	}

	public textAsCurrency(text: string | number): string {

		const number	= (typeof text === 'number') ? text: this.textAsNumber(text);
		
		return number.toLocaleString('en', { style: 'currency', currency: 'USD', minimumFractionDigits: 0 });

	}

	public textAsNumber(text: string | number): number {

		const number	= (typeof text === 'number') ? text : text.replace(/[^0-9\.]+/g, '');

		return Number(number);
		
	}

	public textAsThousands(text: string | number): string {

		const number	= (typeof text === 'number') ? text : this.textAsNumber(text);

		return number.toLocaleString();

	}

	public textAsTime(text: string | number): string {

		return (+text < 10) ? '0' + text : text.toString();

	}

}