import {NextFunction, Request, RequestHandler, Response, Router} from "express";

export const router = Router()

enum Methods {
    get = 'get',
    post = 'post',
    put = 'put',
    del = 'delete'
}

function getRequestDecorator(type: Methods) {
    return function (path: string) {
        return function (target: any, key: string) {
            Reflect.defineMetadata('path', path, target, key)
            Reflect.defineMetadata('method', type, target, key)
        }
    }
}

export function use(middleware: RequestHandler) {
    return function (target: any, key: string) {
        let originMiddlewares = Reflect.getMetadata('middlewares', target, key) || []
        originMiddlewares.push(middleware)
        // console.log(originMiddlewares)
        Reflect.defineMetadata('middlewares', originMiddlewares, target, key)
        // Reflect.defineMetadata('middlewares', middleware, target, key)
    }
}

/*
target 的类型

target: new (...args:any[]) => any
 */

export function Controller(target: any) {
    for (let key in target.prototype) {
        // console.log(Reflect.getMetadata('path', target.prototype, key));
        const path: string = Reflect.getMetadata('path', target.prototype, key)
        const method: Methods = Reflect.getMetadata('method', target.prototype, key)
        const middlewares = Reflect.getMetadata('middlewares', target.prototype, key)
        const handler = target.prototype[key]

        if (path && method && handler) {
            if (middlewares && middlewares.length) {
                // console.log(middlewares);
                router[method](path, ...middlewares, handler)
            } else {
                router[method](path,handler)
            }
            // router.get(path, handler)
        }
    }
}

export const get = getRequestDecorator(Methods.get)
export const post = getRequestDecorator(Methods.post)
export const put = getRequestDecorator(Methods.put)
export const del = getRequestDecorator(Methods.del)

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
