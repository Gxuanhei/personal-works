// console.log(123);
import express, {Request, Response} from 'express'
import bodyParser from "body-parser";
import cookieSession from 'cookie-session'

import './controller/loginController'
import './controller/CrowllerController'
// import router from "./router";
import {router} from "./controller/decorator";


const app = express()
app.use(bodyParser.urlencoded({extended: false}))
app.use(
    cookieSession({
        name: 'session',
        keys: ['teacher dell'],
        maxAge: 24 * 60 * 60 * 1000
    })
)

app.use(router)

// app.get('/', (req:Request, res:Response) => {
//     res.send('hello word')
// })

app.listen(7001, () => {
    console.log('sever is listening on 7001')
})
