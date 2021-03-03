// 通用库

import fs from 'fs'
import path from 'path'
import superagent from 'superagent'
import Analyze from './lee/dell-analyzer'


export interface Analyzer {
    analyze: (html: string, filePath: string) => string
}

class Common {
    private filePath = path.resolve(__dirname, '../data/course.json')

    constructor(private url: string, private analyzer: Analyzer) {
        this.initSpiderProcess()
    }

    // 这里爬取到html
    async getRawHtml() {
        const res = await superagent.get(this.url)
        return res.text
    }

    // 写入文件操作
    writeFile(content: string) {
        fs.writeFileSync(this.filePath, content)
    }


    // 初始化
    async initSpiderProcess() {
        // const filePath = path.resolve(__dirname, '../data/course.json')
        const html = await this.getRawHtml()
        const fileContent = this.analyzer.analyze(html, this.filePath)
        // 将json内容写进文件
        this.writeFile(fileContent)
        // fs.writeFileSync(this.filePath, JSON.stringify(fileContent))
    }

    // 查看数据获取
    // console.log(courseItems)
    // console.log(courseItems.length)

}

const url = `http://www.dell-lee.com/`

const analyze = new Analyze()
new Common(url, analyze)
