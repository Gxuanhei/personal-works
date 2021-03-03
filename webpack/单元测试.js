// 编写 mocha 测试用例
const glob = require('glob-all')

describe('check generated file exists', function () {
    it('should generate html files', function (done) {
        const files = glob.sync(
            [
                './dist/index.html',
                './dist/search.html'
            ]
        )
        if(files.length> 0){
            done()
        }else {
            throw new Error('no html files found')
        }
    })
    it('should generate js && css files', function (done) {
        const files = glob.sync(
            [
                './dist/index_*.js',
                './dist/search_*.js',
                './dist/index_*.css',
                './dist/search_*.css',
            ]
        )
        if(files.length > 0) {
            done()
        }else {
            throw new Error('no  js && css files found')
        }
    })
} )
