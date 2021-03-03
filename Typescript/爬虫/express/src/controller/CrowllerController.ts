import path from "path";
import fs from "fs";
import {NextFunction, Request, Response} from "express";
import {Controller, get, post, use} from "./decorator";
import {getResponseData} from "../util";
import Crowller from "../crowller";

interface BodyRequestBody extends Request {
    body: {
        [key: string]: string | undefined
    }
}

const checkLogin = (req: Request, res: Response, next: NextFunction) => {
    const isLogin = req.session ? req.session.login : false
    console.log('check middleware');
    if (isLogin) {
        next()
    } else {
        res.json(getResponseData(null, '请先登录'))
    }
}

const test = (req: Request, res: Response, next: NextFunction) => {
    console.log('test middleware');
    next()
}

@Controller
class CrowllerController {

    @get('/getData')
    @use(checkLogin)
    @use(test)
    getData(req: BodyRequestBody, res: Response) {

        new Crowller()
        res.json(getResponseData(true))

    }

    @get('/api/getData')
    @use(checkLogin)
    APIgetData(req: BodyRequestBody, res: Response) {

        new Crowller()
        res.json(getResponseData(true))

    }

    @get('/api/showData')
    @use(checkLogin)
    APIshowData(req: Request, res: Response) {
        try {
            const position = path.resolve(__dirname, '../../data/course.json')
            const result = fs.readFileSync(position, 'utf-8')
            res.json(getResponseData(JSON.parse(result)))
        } catch (e) {
            res.json(getResponseData(false, '数据不存在'))

        }

    }
    @get('/showData')
    @use(checkLogin)
    @use(test)
    showData(req: Request, res: Response) {
        try {
            const position = path.resolve(__dirname, '../../data/course.json')
            const result = fs.readFileSync(position, 'utf-8')
            res.json(getResponseData(JSON.parse(result)))
        } catch (e) {
            res.json(getResponseData(false, '数据不存在'))

        }

    }
}
