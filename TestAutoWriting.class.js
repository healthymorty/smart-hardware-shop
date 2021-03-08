"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
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
var TestAutoFileManager_class_1 = require("./TestAutoFileManager.class");
var COMP_PATH = process.argv[2];
var FOLDER = (process.argv[3]) ? process.argv[3] : 'src/';
var TestAutoWriting = /** @class */ (function (_super) {
    __extends(TestAutoWriting, _super);
    function TestAutoWriting() {
        return _super.call(this) || this;
    }
    Object.defineProperty(TestAutoWriting.prototype, "compPath", {
        get: function () {
            return this.getComponentFilePath(COMP_PATH);
        },
        enumerable: true,
        configurable: true
    });
    TestAutoWriting.prototype.lineEvaluator = function (methodLines) {
        //const lines	= [];
        for (var _i = 0, methodLines_1 = methodLines; _i < methodLines_1.length; _i++) {
            var methodLine = methodLines_1[_i];
            methodLine = methodLine.trim();
            if (methodLine !== '') {
                //lines.push(methodLine);
                this.evaluationIdentifier(methodLine);
            }
        }
        //console.log(methodLines);
    };
    TestAutoWriting.prototype.ifConditionProcessor = function (line) {
        var test = [];
        var logicalOperatorRegex = /(\s&&\s)|(\s\|\|\s)/;
        var logicalOperatorsMatch = line.match(logicalOperatorRegex);
        if (logicalOperatorsMatch && logicalOperatorsMatch.length > 0) {
            var conditions = line.split(logicalOperatorRegex);
            console.log(conditions);
            for (var _i = 0, conditions_1 = conditions; _i < conditions_1.length; _i++) {
                var condition = conditions_1[_i];
                //Remove beginning part of if condition
                var beginningIfConditionRegex = /(if \()(?=[^A-Za-z0-9])/;
                if (condition)
                    test.push(condition.replace(beginningIfConditionRegex, ''));
            }
        }
        console.log(test);
    };
    TestAutoWriting.prototype.evaluationIdentifier = function (line) {
        console.log(line);
        console.log('**********');
        if (line.substring(0, 4) === 'if (')
            this.ifConditionProcessor(line);
    };
    TestAutoWriting.prototype.init = function () {
        return __awaiter(this, void 0, void 0, function () {
            var componentFileContent, compMethodNames, compMethodsMap, name_1;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        this.setCompSpecPathList(FOLDER);
                        return [4 /*yield*/, this.getFileContent(this.compPath)];
                    case 1:
                        componentFileContent = _a.sent();
                        compMethodNames = this.getComponentFileMethodNames(componentFileContent);
                        compMethodsMap = this.getComponentFileMethodMap(compMethodNames, componentFileContent);
                        for (name_1 in compMethodsMap) {
                            if (compMethodsMap[name_1]) {
                                this.lineEvaluator(compMethodsMap[name_1].split(/(\r\n|\r|\n)/));
                            }
                        }
                        return [2 /*return*/];
                }
            });
        });
    };
    return TestAutoWriting;
}(TestAutoFileManager_class_1.TestAutoFileManager));
exports.default = TestAutoWriting;
new TestAutoWriting().init();
