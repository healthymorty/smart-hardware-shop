"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.TestAutoGenerator = void 0;
var fs = require("fs");
var TestAutoFileManager_class_1 = require("./TestAutoFileManager.class");
var TestAutoGenerator = /** @class */ (function (_super) {
    __extends(TestAutoGenerator, _super);
    function TestAutoGenerator(errorsEnabled) {
        if (errorsEnabled === void 0) { errorsEnabled = false; }
        var _this = _super.call(this) || this;
        _this.errorsEnabled = errorsEnabled;
        _this.newTestGenerated = 0;
        _this.totalCompMethodCount = 0;
        _this.totalSpecMethodCount = 0;
        return _this;
    }
    TestAutoGenerator.prototype.addCompMethodsToSpec = function (compMethodNames, specTestMethodMaps) {
        if (compMethodNames.length > 0) {
            var methodsMap = {};
            for (var _i = 0, compMethodNames_1 = compMethodNames; _i < compMethodNames_1.length; _i++) {
                var compMethodName = compMethodNames_1[_i];
                methodsMap[compMethodName] = (specTestMethodMaps[compMethodName]) ?
                    specTestMethodMaps[compMethodName] : this.getNewTestMethod(compMethodName);
            }
            return methodsMap;
        }
        return specTestMethodMaps;
    };
    TestAutoGenerator.prototype.diffMethods = function (compMethodNames, specTestMethodNames) {
        return (compMethodNames && specTestMethodNames) ?
            compMethodNames.filter(function (name) { return !specTestMethodNames.includes(name); }) : null;
    };
    TestAutoGenerator.prototype.generateTest = function (compPath) {
        return __awaiter(this, void 0, void 0, function () {
            var componentFileContent, compMethodNames, specFileContent, specTestMethodNames, specTestMethodMaps, reducedSpecTestMethodMaps, updatedSpecTestMethodMaps;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.getFileContent(compPath)];
                    case 1:
                        componentFileContent = _a.sent();
                        compMethodNames = this.getComponentFileMethodNames(componentFileContent);
                        return [4 /*yield*/, this.getFileContent(compPath.replace('.ts', '.spec.ts'))];
                    case 2:
                        specFileContent = _a.sent();
                        specTestMethodNames = this.getSpecTestMethodNames(specFileContent);
                        specTestMethodMaps = this.getSpecFileMethodMap(specTestMethodNames, specFileContent);
                        reducedSpecTestMethodMaps = this.removeSpecFuncViaComp(specTestMethodNames, specTestMethodMaps, compMethodNames);
                        updatedSpecTestMethodMaps = this.addCompMethodsToSpec(compMethodNames, reducedSpecTestMethodMaps);
                        this.updateSpecFile(compPath.replace('.ts', '.spec.ts'), specFileContent, updatedSpecTestMethodMaps);
                        this.updateMethodCounts(compMethodNames, updatedSpecTestMethodMaps);
                        return [2 /*return*/];
                }
            });
        });
    };
    TestAutoGenerator.prototype.generateTests = function () {
        return __awaiter(this, void 0, void 0, function () {
            var _i, _a, compPath;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        this.setCompSpecPathList('src/');
                        _i = 0, _a = this.compPaths;
                        _b.label = 1;
                    case 1:
                        if (!(_i < _a.length)) return [3 /*break*/, 4];
                        compPath = _a[_i];
                        if (!this.specFileExists(compPath)) return [3 /*break*/, 3];
                        return [4 /*yield*/, this.generateTest(compPath)];
                    case 2:
                        _b.sent();
                        _b.label = 3;
                    case 3:
                        _i++;
                        return [3 /*break*/, 1];
                    case 4:
                        console.log(this.newTestGenerated + ' tests have been generated!');
                        console.log('There are ' + this.totalCompMethodCount + ' component methods');
                        console.log('There are ' + this.totalSpecMethodCount + ' spec methods');
                        return [2 /*return*/];
                }
            });
        });
    };
    TestAutoGenerator.prototype.getNewTestMethod = function (compMethodName) {
        this.newTestGenerated++;
        return "describe('" + compMethodName + "', () => {\n\n\t\tit('should ', () => {\n\n\n\t\t});\n\n\t});\n\n\t";
    };
    TestAutoGenerator.prototype.handleError = function (fileContent, message) {
        if (this.errorsEnabled) {
            console.log(fileContent);
            console.log(message);
        }
    };
    TestAutoGenerator.prototype.removeSpecFuncViaComp = function (specTestMethodNames, specTestMethodMaps, compMethodNames) {
        if (specTestMethodNames.length > 0) {
            var newSpecTestMethodMaps = {};
            for (var _i = 0, specTestMethodNames_1 = specTestMethodNames; _i < specTestMethodNames_1.length; _i++) {
                var specTestMethodName = specTestMethodNames_1[_i];
                if (compMethodNames.indexOf(specTestMethodName) !== -1)
                    newSpecTestMethodMaps[specTestMethodName] = specTestMethodMaps[specTestMethodName];
            }
            return newSpecTestMethodMaps;
        }
        return specTestMethodMaps;
    };
    TestAutoGenerator.prototype.specFileExists = function (componentFile) {
        if (!componentFile)
            return false;
        var specFileName = componentFile.replace('.ts', '.spec.ts');
        return (this.specPaths.indexOf(specFileName) !== -1);
    };
    TestAutoGenerator.prototype.updateMethodCounts = function (compMethodNames, specTestMethodMaps) {
        this.totalCompMethodCount += compMethodNames.length;
        this.totalSpecMethodCount += Object.keys(specTestMethodMaps).length;
    };
    TestAutoGenerator.prototype.updateSpecFile = function (specPath, specFileContent, specTestMethodMaps) {
        var fileContent = '';
        if (specFileContent.match(/describe\('/g).length === 1) {
            var regex = new RegExp("(describe\\(')((.|\r\n|\r|\n)*)(?=}\\);)");
            fileContent += specFileContent.split("describe('")[0] + specFileContent.match(regex)[0].trim() + '\n\n	';
        }
        else {
            var describes = specFileContent.split("describe('");
            fileContent += describes[0] + "describe('" + describes[1].trim() + '\n\n	';
        }
        for (var key in specTestMethodMaps)
            fileContent += specTestMethodMaps[key];
        fileContent += '});';
        fileContent = fileContent.replace(/	}\);$/, '});');
        fs.writeFile(specPath, fileContent, function (err) {
            var pathName = specPath.split('/');
            if (err) {
                console.log("There is an error with " + specPath);
                console.log(fileContent);
                console.log(err);
            }
            console.log(pathName[pathName.length - 1] + " has been saved!");
        });
    };
    return TestAutoGenerator;
}(TestAutoFileManager_class_1.TestAutoFileManager));
exports.TestAutoGenerator = TestAutoGenerator;
new TestAutoGenerator().generateTests();
