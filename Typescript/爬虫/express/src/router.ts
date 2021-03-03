import fs from 'fs'
import path from 'path'
import {NextFunction, Request, Response, Router} from "express";
import Crowller from './crowller'

import {getResponseData} from "./util";

interface RequestWithBody extends Request {
    body: {
        [key: string]: string | undefined
    }
}

const checkLogin = (req: Request, res: Response, next: NextFunction) => {
    const isLogin = !!(req.session ? req.session.login : false)
    if (isLogin) {
        next()
    } else {
        res.json(getResponseData(null,'请先登录'))
    }
}

const router = Router()

router.get('/', (req: Request, res: Response) => {
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

})


router.get('/bye', (req: Request, res: Response) => {
    res.send('bye word')
})


// router.post('/login', (req: RequestWithBody, res: Response) => {
//     const {password} = req.body
//     const isLogin = req.session ? req.session.login : false
//
//     if (isLogin) {
//         res.json(getResponseData(false,'已经登录过'))
//
//     } else {
//         if (password === '123' && req.session) {
//             if (req.session) {
//                 req.session.login = true
//                 res.json(getResponseData(true))
//             }
//             // new Crowller()
//             // res.send('bye word')
//         } else {
//             res.json(getResponseData(false,'登录失败'))
//
//         }
//     }
// })
router.get('/getData', checkLogin, (req: Request, res: Response) => {
    // const isLogin = req.session ? req.session.login : false

    // if (isLogin) {
    new Crowller()
    res.send('爬取成功')
    // } else {
    //     res.send('请先登录')
    // }
})

router.get('/showData', checkLogin, (req: Request, res: Response) => {
    // const isLogin = req.session ? req.session.login : false
    //
    // if (isLogin) {
    try {
        const position = path.resolve(__dirname, '../data/course.json')
        const result = fs.readFileSync(position, 'utf-8')
        res.json(getResponseData(JSON.parse(result)))
        // res.json(JSON.parse(result))
    } catch (e) {
        res.json(getResponseData(false,'数据不存在'))

        // res.send('尚未爬取到内容')
    }
    // } else {
    //     res.send('请先登录')
    // }

})


router.get('/logout', (req: Request, res: Response) => {
    if (req.session) {
        req.session.login = undefined
    }
    res.json(getResponseData(true))
    // res.redirect('/')
})
export default router
