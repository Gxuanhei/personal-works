import cheerio from "cheerio";
import fs from "fs";
import {Analyzer} from '../common'

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

export default class DellAnalyzer implements Analyzer{
    // 获取html内容生成json数据
    private getJsonInfo(html: string) {
        const $ = cheerio.load(html)
        const courseItems = $('.course-item')
        const courseInfos: Course[] = []
        courseItems.map((index, element) => {
            const descs = $(element).find('.course-desc')
            const title = descs.eq(0).text() // 第一个元素的内容
            let img = $(element).find('.course-img')
            let fileName = img.attr('src')?.split('/')[2]

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

    // 文件分析
    public analyze(html: string, filePath: string) {
        const courseInfo = this.getJsonInfo(html)
        const fileContent = this.generateJsonContent(courseInfo, filePath)
        return JSON.stringify(fileContent)
    }

    // 通用生成内容
    private generateJsonContent(courseInfo: CourseResult, filePath: string) {
        let fileContent: Content = {}
        if (fs.existsSync(filePath)) {
            console.log('执行了读取');
            fileContent = JSON.parse(fs.readFileSync(filePath, 'utf-8'))
        }
        fileContent[courseInfo.time] = courseInfo.data
        return fileContent
        // fs.writeFileSync(filePath, JSON.stringify(fileContent))
    }
}
