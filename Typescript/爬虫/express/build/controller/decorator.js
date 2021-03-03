"use strict";
var __spreadArrays = (this && this.__spreadArrays) || function () {
    for (var s = 0, i = 0, il = arguments.length; i < il; i++) s += arguments[i].length;
    for (var r = Array(s), k = 0, i = 0; i < il; i++)
        for (var a = arguments[i], j = 0, jl = a.length; j < jl; j++, k++)
            r[k] = a[j];
    return r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.del = exports.put = exports.post = exports.get = exports.Controller = exports.use = exports.router = void 0;
var express_1 = require("express");
exports.router = express_1.Router();
var Methods;
(function (Methods) {
    Methods["get"] = "get";
    Methods["post"] = "post";
    Methods["put"] = "put";
    Methods["del"] = "delete";
})(Methods || (Methods = {}));
function getRequestDecorator(type) {
    return function (path) {
        return function (target, key) {
            Reflect.defineMetadata('path', path, target, key);
            Reflect.defineMetadata('method', type, target, key);
        };
    };
}
function use(middleware) {
    return function (target, key) {
        var originMiddlewares = Reflect.getMetadata('middlewares', target, key) || [];
        originMiddlewares.push(middleware);
        // console.log(originMiddlewares)
        Reflect.defineMetadata('middlewares', originMiddlewares, target, key);
        // Reflect.defineMetadata('middlewares', middleware, target, key)
    };
}
exports.use = use;
/*
target 的类型

target: new (...args:any[]) => any
 */
function Controller(target) {
    for (var key in target.prototype) {
        // console.log(Reflect.getMetadata('path', target.prototype, key));
        var path = Reflect.getMetadata('path', target.prototype, key);
        var method = Reflect.getMetadata('method', target.prototype, key);
        var middlewares = Reflect.getMetadata('middlewares', target.prototype, key);
        var handler = target.prototype[key];
        if (path && method && handler) {
            if (middlewares && middlewares.length) {
                // console.log(middlewares);
                exports.router[method].apply(exports.router, __spreadArrays([path], middlewares, [handler]));
            }
            else {
                exports.router[method](path, handler);
            }
            // router.get(path, handler)
        }
    }
}
exports.Controller = Controller;
exports.get = getRequestDecorator(Methods.get);
exports.post = getRequestDecorator(Methods.post);
exports.put = getRequestDecorator(Methods.put);
exports.del = getRequestDecorator(Methods.del);
// export function get(path: string) {
//     return function (target: any, key: string) {
//         Reflect.defineMetadata('path', path, target, key)
//         Reflect.defineMetadata('method', 'get', target, key)
//
//     }
// }
//
// export function post(path: string) {
//     return function (target: any, key: string) {
//         Reflect.defineMetadata('path', path, target, key)
//         Reflect.defineMetadata('method', 'post', target, key)
//     }
// }
