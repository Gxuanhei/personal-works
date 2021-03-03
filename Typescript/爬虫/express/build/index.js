"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
// console.log(123);
var express_1 = __importDefault(require("express"));
var body_parser_1 = __importDefault(require("body-parser"));
var cookie_session_1 = __importDefault(require("cookie-session"));
require("./controller/loginController");
require("./controller/CrowllerController");
// import router from "./router";
var decorator_1 = require("./controller/decorator");
var app = express_1.default();
app.use(body_parser_1.default.urlencoded({ extended: false }));
app.use(cookie_session_1.default({
    name: 'session',
    keys: ['teacher dell'],
    maxAge: 24 * 60 * 60 * 1000
}));
app.use(decorator_1.router);
// app.get('/', (req:Request, res:Response) => {
//     res.send('hello word')
// })
app.listen(7001, function () {
    console.log('sever is listening on 7001');
});
