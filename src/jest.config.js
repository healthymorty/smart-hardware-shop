module.exports = {
	globals: {
		'ts-jest': {
			tsConfig: '<rootDir>/src/tsconfig.spec.json',
			stringifyContentPathRegex: '\\.html$',
			"astTransformers": ["jest-preset-angular/InlineHtmlStripStylesTransformer"]
		}
	},
	transform: {
		'^.+\\.(ts|js|html)$':	'ts-jest',
		'^.+\\.(js|jsx)$':		'babel-jest'
	},
	testEnvironment: 'jest-environment-jsdom-thirteen',
	moduleFileExtensions: ['ts', 'html', 'js', 'json'],
	moduleNameMapper: {
		"^@app/(.*)":					"<rootDir>/src/app/$1",
		"^@classes/(.*)":				"<rootDir>/src/app/classes/$1",
		"^@components/(.*)":			"<rootDir>/src/app/components/$1",
		"^@const/(.*)":					"<rootDir>/src/app/const/$1",
		"^@atoms/(.*)":					"<rootDir>/src/app/components/atoms/$1",
		"^@molecules/(.*)":				"<rootDir>/src/app/components/molecules/$1",
		"^@organisms/(.*)":				"<rootDir>/src/app/components/organisms/$1",
		"^@views/(.*)":					"<rootDir>/src/app/components/views/$1",
		"^@componentServices/(.*)":		"<rootDir>/src/app/components/services/$1",
		"^@directives/(.*)":			"<rootDir>/src/app/directives/$1",
		"^@interfaces/(.*)":			"<rootDir>/src/app/interfaces/$1",
		"^@mocks/(.*)":					"<rootDir>/src/app/mocks/$1",
		"^@models/(.*)":				"<rootDir>/src/app/models/$1",
		"^@overrideComponents/(.*)":	"<rootDir>/src/app/overrideComponents/$1",
		"^@pages/(.*)":					"<rootDir>/src/app/pages/$1",
		"^@dashboard/(.*)":				"<rootDir>/src/app/pages/dashboard/$1",
		"^@services/(.*)":				"<rootDir>/src/app/services/$1",
		"^@stubs/(.*)":       			"<rootDir>/src/app/stubs/$1",
		"^@styling/(.*)":				"<rootDir>/src/app/styling/$1"
	},
	"setupFilesAfterEnv": [
		"<rootDir>/setupJest.ts",
		"./node_modules/jest-canvas-mock/lib/index.js",
	],
	"transformIgnorePatterns": [
		"node_modules",
		"node_modules/(?!@ngrx|ngx-bootstrap|@progress)",
	],
	"preset": "jest-preset-angular",
	"roots": [
		"./src/app",
	],
	snapshotSerializers: [
		// 'jest-preset-angular/AngularNoNgAttributesSnapshotSerializer.js',
		'jest-preset-angular/AngularSnapshotSerializer.js',
		'jest-preset-angular/HTMLCommentSerializer.js',
	],
};