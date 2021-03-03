"use strict";
// ts在直接引用js的库时会无法使用
// ts提供了一个方法 .d.ts 翻译文件
// ts-> .d.ts 翻译文件 -> js
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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var fs_1 = __importDefault(require("fs"));
var path_1 = __importDefault(require("path"));
var superagent_1 = __importDefault(require("superagent"));
var cheerio_1 = __importDefault(require("cheerio"));
var Crowller = /** @class */ (function () {
    // private url = `http://106.15.249.138/home`
    function Crowller() {
        this.secret = '82960863';
        // private url = `https://blog.csdn.net/Ares_song/article/details/${this.secret}`
        this.url = "http://www.dell-lee.com/";
        this.filePath = path_1.default.resolve(__dirname, '../data/course.json');
        // console.log(this.url)
        this.initSpiderProcess();
    }
    // 这里爬取到html
    Crowller.prototype.getRawHtml = function () {
        return __awaiter(this, void 0, void 0, function () {
            var res;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, superagent_1.default.get(this.url)
                        // console.log(res.text)
                        // let rawHtml: string = res.text
                        // this.getJsonInfo(res.text)
                    ];
                    case 1:
                        res = _a.sent();
                        // console.log(res.text)
                        // let rawHtml: string = res.text
                        // this.getJsonInfo(res.text)
                        return [2 /*return*/, res.text];
                }
            });
        });
    };
    //这里生成json数据文件
    // fs.existsSync(filePath) 用来判断这个文件路径是否存在
    Crowller.prototype.generateJsonContent = function (courseInfo) {
        // const filePath = path.resolve(__dirname, '../data/course.json')
        var fileContent = {};
        if (fs_1.default.existsSync(this.filePath)) {
            // fs.readFileSync 读取文件
            // fs.readFileSync(filePath,'utf-8') 这里是一个字符串
            console.log('执行了读取');
            fileContent = JSON.parse(fs_1.default.readFileSync(this.filePath, 'utf-8'));
        }
        fileContent[courseInfo.time] = courseInfo.data;
        return fileContent;
        // fs.writeFileSync(filePath, JSON.stringify(fileContent))
    };
    // 写入文件操作
    Crowller.prototype.writeFile = function (content) {
        fs_1.default.writeFileSync(this.filePath, content);
    };
    // 初始化
    Crowller.prototype.initSpiderProcess = function () {
        return __awaiter(this, void 0, void 0, function () {
            var html, courseInfo, fileContent;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.getRawHtml()];
                    case 1:
                        html = _a.sent();
                        courseInfo = this.getJsonInfo(html);
                        console.log(courseInfo);
                        fileContent = this.generateJsonContent(courseInfo);
                        // 将json内容写进文件
                        this.writeFile(JSON.stringify(fileContent));
                        return [2 /*return*/];
                }
            });
        });
    };
    // 查看数据获取
    // console.log(courseItems)
    // console.log(courseItems.length)
    // 这里获取到数据并存储
    Crowller.prototype.getJsonInfo = function (html) {
        var $ = cheerio_1.default.load(html);
        var courseItems = $('.course-item');
        var courseInfos = [];
        courseItems.map(function (index, element) {
            var _a;
            var descs = $(element).find('.course-desc');
            var title = descs.eq(0).text(); // 第一个元素的内容
            // console.log(title)
            var img = $(element).find('.course-img');
            // console.log(img.attr('src'));
            var fileName = (_a = img.attr('src')) === null || _a === void 0 ? void 0 : _a.split('/')[2];
            // console.log(fileName)
            // const count = parseInt(
            //     descs
            //         .eq(1)
            //         .text()
            //         .split(":")[1], 10
            // )
            courseInfos.push({
                title: title,
                fileName: fileName
            });
        });
        return {
            time: (new Date().getTime()),
            data: courseInfos
        };
    };
    return Crowller;
}());
// const crowller = new Crowller()
exports.default = Crowller;
