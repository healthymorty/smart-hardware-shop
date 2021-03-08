import * as fs from 'fs';

import * as path from 'path';

import * as doAsync from 'doAsync';

export class TestAutoFileManager {

	public specPaths	= [];

	public compPaths	= [];

	constructor(

		public specFileMatch	= 'spec.ts',

		public compFileMatch	= 'component.ts'

	) {}

	public getComponentFilePath(path: string): string {

		for (let compPath of this.compPaths)

			if (compPath.indexOf(path) !== -1)

				return compPath;

	}

	public getComponentFileMethodNames(componentFileContent: string): string[] {

		const component	= componentFileContent.split('export class ')[1].split(' ')[0];

		const regex		= /(\r\n|\r|\n)(.*?)(\((.*?)\): )/g;

		const matches	= componentFileContent.match(regex);

		const methodNames	= [];

		if (!matches) {

			this.handleError(componentFileContent, '***Error***: ' + component + ' error message: There appears to be no testable methods in this component. Did you type your methods?');

		} else {

			for (let match of matches) {

				const regex			= (match.indexOf('async') !== -1) ? 'async ' : ' ';

				const methodName	= match.split(regex)[1].split('(')[0];

				if (!methodName) {

					this.handleError(componentFileContent, '***Error***: ' + component + ' error string: ' + match);

				} else {

					methodNames.push(methodName);

				}

			}

		}

		return methodNames;

	}

	public getComponentFileMethodMap(compMethodNames: string[], componentFileContent: string): {[ key: string ]: string } {

		const methodMap	= {};

		if (compMethodNames.length > 0) {

			const decaratorMatch	= "(public async|private async|public|private|get|set) ";

			let i = 0;

			for (let compMethodName of compMethodNames) {

				i++;

				const nextTestMethod	= (compMethodNames[i]) ? compMethodNames[i] : null;

				const regex	= (nextTestMethod) ?

					new RegExp("(" + decaratorMatch + compMethodName + ")((.|\r\n|\r|\n)*)(?=" + decaratorMatch + nextTestMethod + ")") :

					new RegExp("(" + decaratorMatch + compMethodName + ")((.|\r\n|\r|\n)*)");

				let method	= componentFileContent.match(regex)[0];

				if (!nextTestMethod)

					method	= method.replace(/(})$/, '');

				methodMap[compMethodName]	= method;

			}

		}

		return methodMap;

	}

	public getFileContent(file): Promise<string> {
		console.log(file);
		return doAsync(fs).readFile(file, 'utf-8');

	}

    public getSpecFileMethodMap(specTestMethodNames: string[], specFileContent: string): {[ key: string ]: string } {

		const methodMap	= {};

		if (specTestMethodNames.length > 0) {

			let i = 0;

			for (let specTestMethodName of specTestMethodNames) {

				i++;

				const nextTestMethod	= (specTestMethodNames[i]) ? specTestMethodNames[i] : null;

				const regex	= (nextTestMethod) ?

					new RegExp("(describe\\('" + specTestMethodName + "',)((.|\r\n|\r|\n)*)(?=describe\\('" + nextTestMethod + "',)") :

					new RegExp("(describe\\('" + specTestMethodName + "',)((.|\r\n|\r|\n)*)(?=}\\);)");

				methodMap[specTestMethodName]	= specFileContent.match(regex)[0] + ((!nextTestMethod) ? '	' : '');

			}

		}

		return methodMap;

	}

	public getSpecTestMethodNames(specFileContent: string): string[] {

		const specComponentName	= specFileContent.match(/(describe\(')(.*?)(',)/)[0].replace("describe(\'", '').replace('\',', '');

		const regex			= /(describe\(')(.*?)(',)/g;

		const matches		= specFileContent.match(regex);

		const methodNames	= [];

		if (!matches) {

			this.handleError(specFileContent, '***Error***: ' + specComponentName + ' error message: There appears to be no testable methods in this component. Did you type your methods?');

		} else {

			matches.shift();

			for (let match of matches) {

				const methodName	= match.replace("describe(\'", '').replace("\',", '');

				if (!methodName) {

					this.handleError(specFileContent, '***Error***: ' + specComponentName + ' error string: ' + match);

				} else {

					methodNames.push(methodName);

				}

			}

		}

		return methodNames;

	}

	public handleError(fileContent: string, message: string): void {



	}

	public setCompSpecPathList(dir: string): void {

		fs.readdirSync(dir).forEach(file => {

			const fullPath = path.join(dir, file);

			if (fs.lstatSync(fullPath).isDirectory()) {

				this.setCompSpecPathList(fullPath);

			} else {

				if (fullPath.indexOf(this.specFileMatch) !== -1)

					this.specPaths.push(fullPath);

				if (fullPath.indexOf(this.compFileMatch) !== -1)

					this.compPaths.push(fullPath);

			}

		});

	}

}
