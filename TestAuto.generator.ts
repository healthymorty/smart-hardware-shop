import * as fs from 'fs';

import { TestAutoFileManager }	from './TestAutoFileManager.class';

export class TestAutoGenerator extends TestAutoFileManager {

	public newTestGenerated		= 0;

	public totalCompMethodCount	= 0;

	public totalSpecMethodCount	= 0;

	constructor(public errorsEnabled = false) {

		super();

	}

	public addCompMethodsToSpec(compMethodNames: string[], specTestMethodMaps: { [key: string]: string }): { [key: string]: string } {

		if (compMethodNames.length > 0) {

			const methodsMap	= {};

			for (let compMethodName of compMethodNames)

				methodsMap[compMethodName]	= (specTestMethodMaps[compMethodName]) ?

					specTestMethodMaps[compMethodName] : this.getNewTestMethod(compMethodName);

			return methodsMap;

		}

		return specTestMethodMaps;

	}

	public diffMethods(compMethodNames: string[], specTestMethodNames: string[]): string[] {

		return (compMethodNames && specTestMethodNames) ?

			compMethodNames.filter(name => !specTestMethodNames.includes(name)) : null;

	}

	public async generateTest(compPath: string): Promise<void> {

		const componentFileContent	= await this.getFileContent(compPath);

		const compMethodNames		= this.getComponentFileMethodNames(componentFileContent);

		const specFileContent		= await this.getFileContent(compPath.replace('.ts', '.spec.ts'));

		const specTestMethodNames	= this.getSpecTestMethodNames(specFileContent);

		const specTestMethodMaps	= this.getSpecFileMethodMap(specTestMethodNames, specFileContent);

		const reducedSpecTestMethodMaps	= this.removeSpecFuncViaComp(specTestMethodNames, specTestMethodMaps, compMethodNames);

		const updatedSpecTestMethodMaps	= this.addCompMethodsToSpec(compMethodNames, reducedSpecTestMethodMaps);

		this.updateSpecFile(compPath.replace('.ts', '.spec.ts'), specFileContent, updatedSpecTestMethodMaps);

		this.updateMethodCounts(compMethodNames, updatedSpecTestMethodMaps);

	}

	public async generateTests(): Promise<void> {

		this.setCompSpecPathList('src/');

		for (let compPath of this.compPaths)

			if (this.specFileExists(compPath))

				await this.generateTest(compPath);

		console.log(this.newTestGenerated + ' tests have been generated!');

		console.log('There are ' + this.totalCompMethodCount + ' component methods');

		console.log('There are ' + this.totalSpecMethodCount + ' spec methods');

	}

	public getNewTestMethod(compMethodName: string): string {

		this.newTestGenerated++;

		return `describe('` + compMethodName + `', () => {

		it('should ', () => {


		});

	});

	`;

	}

	public handleError(fileContent: string, message: string): void {

		if (this.errorsEnabled) {

			console.log(fileContent);

			console.log(message);

		}

	}

	public removeSpecFuncViaComp(specTestMethodNames: string[], specTestMethodMaps: { [key: string]: string}, compMethodNames: string[]): { [key: string]: string} {

		if (specTestMethodNames.length > 0) {

			const newSpecTestMethodMaps	= {};

			for (let specTestMethodName of specTestMethodNames)

				if (compMethodNames.indexOf(specTestMethodName) !== -1)

					newSpecTestMethodMaps[specTestMethodName]	= specTestMethodMaps[specTestMethodName];

			return newSpecTestMethodMaps;

		}

		return specTestMethodMaps;

	}

	public specFileExists(componentFile: string): boolean {

		if (!componentFile) return false;

		const specFileName	= componentFile.replace('.ts', '.spec.ts');

		return (this.specPaths.indexOf(specFileName) !== -1);

	}

	public updateMethodCounts(compMethodNames: string[], specTestMethodMaps: { [ key: string ]: string}): void {

		this.totalCompMethodCount	+=  compMethodNames.length;

		this.totalSpecMethodCount	+=  Object.keys(specTestMethodMaps).length;

	}

	public updateSpecFile(specPath: string, specFileContent: string, specTestMethodMaps: { [key: string]: string}): void {

		let fileContent	= '';

		if (specFileContent.match(/describe\('/g).length === 1) {

			const regex	= new RegExp("(describe\\(')((.|\r\n|\r|\n)*)(?=}\\);)");

			fileContent	+= specFileContent.split("describe('")[0] + specFileContent.match(regex)[0].trim() + '\n\n	';

		} else {

			const describes	= specFileContent.split("describe('");

			fileContent		+= describes[0] + "describe('" + describes[1].trim() + '\n\n	';

		}

		for (let key in specTestMethodMaps)

			fileContent	+= specTestMethodMaps[key];

		fileContent	+= '});';

		fileContent	= fileContent.replace(/	}\);$/, '});');

		fs.writeFile(specPath, fileContent, (err) => {

			const pathName	= specPath.split('/');

			if (err) {

				console.log("There is an error with " + specPath);

				console.log(fileContent);

				console.log(err);

			}

			console.log(pathName[pathName.length - 1] + " has been saved!");

		});

	}

}

new TestAutoGenerator().generateTests();
