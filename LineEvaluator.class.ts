import { LineToken }	from './LineToken.class';

export class LineEvaluator {

	public anythingRegex			= "((.|\r\n|\r|\n)*)";

	public anythingExpLnBr			= "(.*?)";

	public ifConditionStartRegex	= "(^if \\()";

	public ifConditionRegex			= new RegExp(this.ifConditionStartRegex + this.anythingExpLnBr + "(?=\\)\s{)");

	public signatureStartRegex		= '(^(public async|private async|public|private|get|set))';

	public signatureRegex			= new RegExp(this.signatureStartRegex + this.anythingRegex + "(?={)");

	public terinaryOperatorStart	= "(^\\()";

	public terinaryOperatorREgex	= new RegExp(this.terinaryOperatorStart + this.anythingExpLnBr + "(?=\\)\s?\s)");

	constructor() {}

	/*public getLineTokens(line: string): LineTokens[] {

		line	= line.trim();

		if (line !== '') {

			const tokens:	LineTokens = [];

			const lineType	= this.getLineType(line);

		}

	}*/

	public getLineType(line: string): string {

		if (this.signature(line)) return 'signature';

		if (this.ifCondition(line)) return 'ifCondition';

		if (this.terinaryOperator(line)) return 'terinaryCondition';

	}

	public ifCondition(line: string): boolean {

		return (line.match(new RegExp(this.ifConditionRegex)).length > 0);

	}

	public signature(line: string): boolean {

		return (line.match(this.signatureRegex).length > 0);

	}

	public terinaryOperator(line: string): boolean {

		return (line.match(this.terinaryOperatorREgex).length > 0);

	}

}
