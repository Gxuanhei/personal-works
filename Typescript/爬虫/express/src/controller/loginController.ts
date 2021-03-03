import 'reflect-metadata'
import {Request, Response} from "express";
import {Controller, get, post} from "./decorator";
import {getResponseData} from "../util";

interface BodyRequestBody extends Request {
    body: {
        [key: string]: string | undefined
    }
}


@Controller
class LoginController {
    static isLogin (req: BodyRequestBody):boolean {
        return !!( req.session ? req.session.login : false)
    }

    @get('/api/isLogin')
    isLogin(req: BodyRequestBody, res: Response) {
        const isLogin = LoginController.isLogin(req)
        res.json(getResponseData(isLogin))
    }
    @post('/api/login')
    apiLogin(req: BodyRequestBody, res: Response) {
        const {password} = req.body
        const isLogin = LoginController.isLogin(req)

        if (isLogin) {
            res.json(getResponseData(false, '已经登录过'))

        } else {
            if (password === '123' && req.session) {
                if (req.session) {
                    req.session.login = true
                    res.json(getResponseData(true))
                }
                // new Crowller()
                // res.send('bye word')
            } else {
                res.json(getResponseData(false, '登录失败'))

            }
        }

    }

    @post('/login')
    login(req: BodyRequestBody, res: Response) {
        const {password} = req.body
        const isLogin = LoginController.isLogin(req)

        if (isLogin) {
            res.json(getResponseData(false, '已经登录过'))

        } else {
            if (password === '123' && req.session) {
                if (req.session) {
                    req.session.login = true
                    res.json(getResponseData(true))
                }
                // new Crowller()
                // res.send('bye word')
            } else {
                res.json(getResponseData(false, '登录失败'))

            }
        }

    }

    @get('/api/logout')
    logout(req: BodyRequestBody, res: Response) {
        if (req.session) {
            req.session.login = undefined
        }
        res.json(getResponseData(true))
        // res.redirect('/')
    }

    // @get('/login')
    // login(req: BodyRequestBody, res: Response) {
    //     console.log('w')
    //     res.send('running ')
    // }

    @get('/')
    home(req: BodyRequestBody, res: Response) {
        const isLogin = req.session ? req.session.login : false
        if (isLogin) {
            res.send(`
    <html>
        <body>
            <a href="/getData">爬取内容</a>
            <a href="/showData">展示内容</a>
            <a href="/logout">退出</a>
        </body>
    </html>
    `)
        } else {
            res.send(`
    <html>
        <body>
        <form action="/login" method="post">
            <input type="password" name="password">
            <button>登录</button>
        </form>
        </body>
    </html>
    `)
        }

    }
}
