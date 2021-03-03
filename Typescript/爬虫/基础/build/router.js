"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var fs_1 = __importDefault(require("fs"));
var path_1 = __importDefault(require("path"));
var express_1 = require("express");
var crowller_1 = __importDefault(require("./crowller"));
var util_1 = require("./util");
var checkLogin = function (req, res, next) {
    var isLogin = req.session ? req.session.login : false;
    if (isLogin) {
        next();
    }
    else {
        res.json(util_1.getResponseData(null, '请先登录'));
    }
};
var router = express_1.Router();
router.get('/', function (req, res) {
    var isLogin = req.session ? req.session.login : false;
    if (isLogin) {
        res.send("\n    <html>\n        <body>\n            <a href=\"/getData\">\u722C\u53D6\u5185\u5BB9</a>\n            <a href=\"/showData\">\u5C55\u793A\u5185\u5BB9</a>\n            <a href=\"/logout\">\u9000\u51FA</a>\n        </body>\n    </html>\n    ");
    }
    else {
        res.send("\n    <html>\n        <body>\n        <form action=\"/login\" method=\"post\">\n            <input type=\"password\" name=\"password\">\n            <button>\u767B\u5F55</button>\n        </form>\n        </body>\n    </html>\n    ");
    }
});
router.get('/bye', function (req, res) {
    res.send('bye word');
});
router.post('/login', function (req, res) {
    var password = req.body.password;
    var isLogin = req.session ? req.session.login : false;
    if (isLogin) {
        res.json(util_1.getResponseData(false, '已经登录过'));
    }
    else {
    }
    if (password === '123' && req.session) {
        if (req.session) {
            req.session.login = true;
            res.json(util_1.getResponseData(true));
        }
        // new Crowller()
        // res.send('bye word')
    }
    else {
        res.json(util_1.getResponseData(false, '登录失败'));
    }
});
router.get('/getData', checkLogin, function (req, res) {
    // const isLogin = req.session ? req.session.login : false
    // if (isLogin) {
    new crowller_1.default();
    res.send('爬取成功');
    // } else {
    //     res.send('请先登录')
    // }
});
router.get('/showData', checkLogin, function (req, res) {
    // const isLogin = req.session ? req.session.login : false
    //
    // if (isLogin) {
    try {
        var position = path_1.default.resolve(__dirname, '../data/course.json');
        var result = fs_1.default.readFileSync(position, 'utf-8');
        res.json(util_1.getResponseData(JSON.parse(result)));
        // res.json(JSON.parse(result))
    }
    catch (e) {
        res.json(util_1.getResponseData(false, '数据不存在'));
        // res.send('尚未爬取到内容')
    }
    // } else {
    //     res.send('请先登录')
    // }
});
router.get('/logout', function (req, res) {
    if (req.session) {
        req.session.login = undefined;
    }
    res.json(util_1.getResponseData(true));
    // res.redirect('/')
});
exports.default = router;
