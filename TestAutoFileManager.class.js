"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TestAutoFileManager = void 0;
var fs = require("fs");
var path = require("path");
var doAsync = require("doAsync");
var TestAutoFileManager = /** @class */ (function () {
    function TestAutoFileManager(specFileMatch, compFileMatch) {
        if (specFileMatch === void 0) { specFileMatch = 'spec.ts'; }
        if (compFileMatch === void 0) { compFileMatch = 'component.ts'; }
        this.specFileMatch = specFileMatch;
        this.compFileMatch = compFileMatch;
        this.specPaths = [];
        this.compPaths = [];
    }
    TestAutoFileManager.prototype.getComponentFilePath = function (path) {
        for (var _i = 0, _a = this.compPaths; _i < _a.length; _i++) {
            var compPath = _a[_i];
            if (compPath.indexOf(path) !== -1)
                return compPath;
        }
    };
    TestAutoFileManager.prototype.getComponentFileMethodNames = function (componentFileContent) {
        var component = componentFileContent.split('export class ')[1].split(' ')[0];
        var regex = /(\r\n|\r|\n)(.*?)(\((.*?)\): )/g;
        var matches = componentFileContent.match(regex);
        var methodNames = [];
        if (!matches) {
            this.handleError(componentFileContent, '***Error***: ' + component + ' error message: There appears to be no testable methods in this component. Did you type your methods?');
        }
        else {
            for (var _i = 0, matches_1 = matches; _i < matches_1.length; _i++) {
                var match = matches_1[_i];
                var regex_1 = (match.indexOf('async') !== -1) ? 'async ' : ' ';
                var methodName = match.split(regex_1)[1].split('(')[0];
                if (!methodName) {
                    this.handleError(componentFileContent, '***Error***: ' + component + ' error string: ' + match);
                }
                else {
                    methodNames.push(methodName);
                }
            }
        }
        return methodNames;
    };
    TestAutoFileManager.prototype.getComponentFileMethodMap = function (compMethodNames, componentFileContent) {
        var methodMap = {};
        if (compMethodNames.length > 0) {
            var decaratorMatch = "(public async|private async|public|private|get|set) ";
            var i = 0;
            for (var _i = 0, compMethodNames_1 = compMethodNames; _i < compMethodNames_1.length; _i++) {
                var compMethodName = compMethodNames_1[_i];
                i++;
                var nextTestMethod = (compMethodNames[i]) ? compMethodNames[i] : null;
                var regex = (nextTestMethod) ?
                    new RegExp("(" + decaratorMatch + compMethodName + ")((.|\r\n|\r|\n)*)(?=" + decaratorMatch + nextTestMethod + ")") :
                    new RegExp("(" + decaratorMatch + compMethodName + ")((.|\r\n|\r|\n)*)");
                var method = componentFileContent.match(regex)[0];
                if (!nextTestMethod)
                    method = method.replace(/(})$/, '');
                methodMap[compMethodName] = method;
            }
        }
        return methodMap;
    };
    TestAutoFileManager.prototype.getFileContent = function (file) {
        console.log(file);
        return doAsync(fs).readFile(file, 'utf-8');
    };
    TestAutoFileManager.prototype.getSpecFileMethodMap = function (specTestMethodNames, specFileContent) {
        var methodMap = {};
        if (specTestMethodNames.length > 0) {
            var i = 0;
            for (var _i = 0, specTestMethodNames_1 = specTestMethodNames; _i < specTestMethodNames_1.length; _i++) {
                var specTestMethodName = specTestMethodNames_1[_i];
                i++;
                var nextTestMethod = (specTestMethodNames[i]) ? specTestMethodNames[i] : null;
                var regex = (nextTestMethod) ?
                    new RegExp("(describe\\('" + specTestMethodName + "',)((.|\r\n|\r|\n)*)(?=describe\\('" + nextTestMethod + "',)") :
                    new RegExp("(describe\\('" + specTestMethodName + "',)((.|\r\n|\r|\n)*)(?=}\\);)");
                methodMap[specTestMethodName] = specFileContent.match(regex)[0] + ((!nextTestMethod) ? '	' : '');
            }
        }
        return methodMap;
    };
    TestAutoFileManager.prototype.getSpecTestMethodNames = function (specFileContent) {
        var specComponentName = specFileContent.match(/(describe\(')(.*?)(',)/)[0].replace("describe(\'", '').replace('\',', '');
        var regex = /(describe\(')(.*?)(',)/g;
        var matches = specFileContent.match(regex);
        var methodNames = [];
        if (!matches) {
            this.handleError(specFileContent, '***Error***: ' + specComponentName + ' error message: There appears to be no testable methods in this component. Did you type your methods?');
        }
        else {
            matches.shift();
            for (var _i = 0, matches_2 = matches; _i < matches_2.length; _i++) {
                var match = matches_2[_i];
                var methodName = match.replace("describe(\'", '').replace("\',", '');
                if (!methodName) {
                    this.handleError(specFileContent, '***Error***: ' + specComponentName + ' error string: ' + match);
                }
                else {
                    methodNames.push(methodName);
                }
            }
        }
        return methodNames;
    };
    TestAutoFileManager.prototype.handleError = function (fileContent, message) {
    };
    TestAutoFileManager.prototype.setCompSpecPathList = function (dir) {
        var _this = this;
        fs.readdirSync(dir).forEach(function (file) {
            var fullPath = path.join(dir, file);
            if (fs.lstatSync(fullPath).isDirectory()) {
                _this.setCompSpecPathList(fullPath);
            }
            else {
                if (fullPath.indexOf(_this.specFileMatch) !== -1)
                    _this.specPaths.push(fullPath);
                if (fullPath.indexOf(_this.compFileMatch) !== -1)
                    _this.compPaths.push(fullPath);
            }
        });
    };
    return TestAutoFileManager;
}());
exports.TestAutoFileManager = TestAutoFileManager;
