import { LineEvaluator }	from './LineEvaluator.class';

import { LineToken }		from './LineToken.class';

export class Line extends LineEvaluator {

	constructor(

		public line:		string,

		public type?:		string,

		public lineTokens?:	LineToken[]

	) {

		super();

		this.setType();

		this.setMethodLineTokens();

	}

	public setMethodLineTokens(): void {

		//const tokens			= this.getLineTokens(this.line);

		const methodLineTokens	= [];

		for (let methodLineToken of methodLineTokens) {

		}

		this.lineTokens	= [...methodLineTokens];

	}

	public setType(): void {

		this.type	= this.getLineType(this.line);

	}

}
