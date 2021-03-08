import { TestAutoFileManager }	from './TestAutoFileManager.class';

import { TestAutoMethod }		from './TestAutoMethod.class';

const COMP_PATH = process.argv[2];

const FOLDER	= (process.argv[3]) ? process.argv[3] : 'src/';

export default class TestAutoWriting extends TestAutoFileManager {

	get compPath(): string {

		return this.getComponentFilePath(COMP_PATH);

	}

	constructor() {

		super();

	}

	public lineEvaluator(methodLines: string[]): void {

		//const lines	= [];

		for (let methodLine of methodLines) {

			methodLine	= methodLine.trim();

			if (methodLine !== '') {

				//lines.push(methodLine);

				this.evaluationIdentifier(methodLine);

			}

		}

		//console.log(methodLines);

	}

	public ifConditionProcessor(line: string): void {

		const test	= [];

		const logicalOperatorRegex	= /(\s&&\s)|(\s\|\|\s)/;

		const logicalOperatorsMatch	= line.match(logicalOperatorRegex);

		if (logicalOperatorsMatch && logicalOperatorsMatch.length > 0) {

			const conditions	= line.split(logicalOperatorRegex);
			console.log(conditions);
			for (let condition of conditions) {

				//Remove beginning part of if condition
				const beginningIfConditionRegex	= /(if \()(?=[^A-Za-z0-9])/;

				if (condition && condition.match(condition).length > 0)

					test.push(condition.replace(beginningIfConditionRegex, ''));

			}

		}

		console.log(test);

	}

	public evaluationIdentifier(line: string): void {
		console.log(line);
		console.log('**********');
		if (line.substring(0, 4) === 'if (')

			this.ifConditionProcessor(line);

	}

	public async init(): Promise<void> {

		this.setCompSpecPathList(FOLDER);

		const componentFileContent	= await this.getFileContent(this.compPath);

		const compMethodNames		= this.getComponentFileMethodNames(componentFileContent);

		const compMethodsMap		= this.getComponentFileMethodMap(compMethodNames, componentFileContent);

		for (let name in compMethodsMap) {

			if (compMethodsMap[name]) {

				const method	= new TestAutoMethod(compMethodsMap[name])

				this.lineEvaluator(compMethodsMap[name].split(/(\r\n|\r|\n)/));

			}

		}

	}

}

new TestAutoWriting().init();
