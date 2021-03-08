import { Line }	from './Line.class';

export class TestAutoMethod {

	constructor(

		public method:			string,

		public methodLines?:	Line[],

		public methodLinesMap?:	Array<{ [key: number]: { [key: string]: string }}>

	) {

		this.setMethodLines(method);

	}

	public setMethodLines(method: string): void {

		const lines			= method.split(/(\r\n|\r|\n)/);

		const methodLines	= [];

		for (let line of lines)

			methodLines.push(new Line(line));

		this.methodLines	= [...methodLines];

	}


}
