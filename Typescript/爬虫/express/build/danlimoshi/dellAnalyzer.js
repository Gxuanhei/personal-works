"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var cheerio_1 = __importDefault(require("cheerio"));
var fs_1 = __importDefault(require("fs"));
var DellAnalyzer = /** @class */ (function () {
    function DellAnalyzer() {
    }
    // 获取html内容生成json数据
    DellAnalyzer.prototype.getJsonInfo = function (html) {
        var $ = cheerio_1.default.load(html);
        var courseItems = $('.course-item');
        var courseInfos = [];
        courseItems.map(function (index, element) {
            var _a;
            var descs = $(element).find('.course-desc');
            var title = descs.eq(0).text(); // 第一个元素的内容
            var img = $(element).find('.course-img');
            var fileName = (_a = img.attr('src')) === null || _a === void 0 ? void 0 : _a.split('/')[2];
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
    // 文件分析
    DellAnalyzer.prototype.analyze = function (html, filePath) {
        var courseInfo = this.getJsonInfo(html);
        var fileContent = this.generateJsonContent(courseInfo, filePath);
        return JSON.stringify(fileContent);
    };
    // 通用生成内容
    DellAnalyzer.prototype.generateJsonContent = function (courseInfo, filePath) {
        var fileContent = {};
        if (fs_1.default.existsSync(filePath)) {
            console.log('执行了读取');
            fileContent = JSON.parse(fs_1.default.readFileSync(filePath, 'utf-8'));
        }
        fileContent[courseInfo.time] = courseInfo.data;
        return fileContent;
        // fs.writeFileSync(filePath, JSON.stringify(fileContent))
    };
    return DellAnalyzer;
}());
exports.default = DellAnalyzer;
