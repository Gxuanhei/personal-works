// ts在直接引用js的库时会无法使用
// ts提供了一个方法 .d.ts 翻译文件
// ts-> .d.ts 翻译文件 -> js

import fs from 'fs'
import path from 'path'
import superagent from 'superagent'
import cheerio from 'cheerio'

interface Course {
    title: string
    fileName: string
}

interface CourseResult {
    time: number,
    data: Course[]
}

interface Content {
    [propName: number]: Course[]
}


class Crowller {
    private secret = '82960863'
    // private url = `https://blog.csdn.net/Ares_song/article/details/${this.secret}`
    private url = `http://www.dell-lee.com/`
    private filePath = path.resolve(__dirname, '../data/course.json')
    // private url = `http://106.15.249.138/home`
    constructor() {
        // console.log(this.url)
        this.initSpiderProcess()
    }

    // 这里爬取到html
    async getRawHtml() {
        const res = await superagent.get(this.url)
        // console.log(res.text)
        // let rawHtml: string = res.text
        // this.getJsonInfo(res.text)
        return res.text
    }

    //这里生成json数据文件
    // fs.existsSync(filePath) 用来判断这个文件路径是否存在
    generateJsonContent(courseInfo: CourseResult) {
        // const filePath = path.resolve(__dirname, '../data/course.json')
        let fileContent: Content = {}
        if (fs.existsSync(this.filePath)) {
            // fs.readFileSync 读取文件
            // fs.readFileSync(filePath,'utf-8') 这里是一个字符串
            console.log('执行了读取');
            fileContent = JSON.parse(fs.readFileSync(this.filePath, 'utf-8'))
        }
        fileContent[courseInfo.time] = courseInfo.data
        return fileContent
        // fs.writeFileSync(filePath, JSON.stringify(fileContent))
    }
    // 写入文件操作
    writeFile(content:string) {
        fs.writeFileSync(this.filePath, content)
    }


    // 初始化
    async initSpiderProcess() {
        // const filePath = path.resolve(__dirname, '../data/course.json')
        const html = await this.getRawHtml()
        const courseInfo = this.getJsonInfo(html)
        console.log(courseInfo)
        const fileContent = this.generateJsonContent(courseInfo)
        // 将json内容写进文件
        this.writeFile(JSON.stringify(fileContent))
        // fs.writeFileSync(this.filePath, JSON.stringify(fileContent))
    }

    // 查看数据获取
    // console.log(courseItems)
    // console.log(courseItems.length)

    // 这里获取到数据并存储
    getJsonInfo(html: string) {
        const $ = cheerio.load(html)
        const courseItems = $('.course-item')
        const courseInfos: Course[] = []
        courseItems.map((index, element) => {
            const descs = $(element).find('.course-desc')
            const title = descs.eq(0).text() // 第一个元素的内容
            // console.log(title)
            let img = $(element).find('.course-img')
            // console.log(img.attr('src'));
            let fileName = img.attr('src')?.split('/')[2]
            // console.log(fileName)
            // const count = parseInt(
            //     descs
            //         .eq(1)
            //         .text()
            //         .split(":")[1], 10
            // )
            courseInfos.push(<Course>{
                title,
                fileName
            })
        })
        return {
            time: (new Date().getTime()),
            data: courseInfos
        }
    }
}
// const crowller = new Crowller()

export default Crowller
