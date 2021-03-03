const glob = require('glob'); // 获取文件目录
const path = require('path');
const MiniCssExtractPlugin = require('mini-css-extract-plugin'); // css编译工具
const OptimizeCssAssetsWebpackPlugin = require('optimize-css-assets-webpack-plugin'); // css代码压缩工具
const HtmlWebpackPlugin = require('html-webpack-plugin'); // html关联代码压缩插件
const { CleanWebpackPlugin } = require('clean-webpack-plugin'); //自动清理构建目录
// const HTMLInlineCSSWebpackPlugin = require("html-inline-css-webpack-plugin").default; css内联
const HtmlWebpackExternalsPlugin = require('html-webpack-externals-plugin'); // 抽离公共基础包 cdn加速
const FriendlyErrorsWebpackPlugin = require('friendly-errors-webpack-plugin');

const setMPA = () => {
    const entry = {};
    const htmlWebpackArrays = [];
    
    const entryFiles = glob.sync(path.join(__dirname, './src/*/index.js'));
    Object.keys(entryFiles)
        .map(index => {
            const entryFile = entryFiles[index];
            const match = entryFile.match(/src\/(.*)\/index\.js/);
            const pageName = match && match[1];
            
            entry[pageName] = entryFile;
            htmlWebpackArrays.push(
                new HtmlWebpackPlugin({
                    template: path.join(__dirname, `src/${pageName}/index.html`),
                    filename: `${pageName}.html`,
                    chunks: ['vendors', pageName], //
                    inject: true,
                    minify: {
                        html: true,
                        collapseWhitespace: true,
                        preserveLineBreaks: false,
                        minifyCSS: true,
                        minifyJS: true,
                        removeComments: false
                    }
                }),
            );
            
        });
    console.log(entryFiles);
    
    return {
        entry,
        htmlWebpackArrays
    };
};

const { entry, htmlWebpackArrays } = setMPA();

module.exports = {
    entry: entry,
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: '[name]_[chunkhash:8].js'
    },
    mode: 'production', // 配置打包环境 生产production/开发development-
    module: {
        rules: [
            {
                test: /\.js$/,
                use: [
                    'babel-loader',
                    // 'eslint-loader' // 代码检查
                ],
                
            },
            {
                test: /.css$/,
                use: [
                    MiniCssExtractPlugin.loader,
                    'css-loader'
                ]
            },
            {
                test: /.less$/,
                use: [
                    MiniCssExtractPlugin.loader,
                    'css-loader',
                    'less-loader',
                    // 'postcss-loader'
                    {
                        loader: 'postcss-loader',
                        options: {
                            postcssOptions: {
                                plugins: [
                                    'postcss-preset-env'
                                ]
                            }
                        }
                    },
                    {
                        loader: 'px2rem-loader',
                        options: {
                            remUnit: 75,//1rem=75px
                            remPrecision: 8 //小数点后位数
                        }
                    }
                
                ]
            },
            {
                test: /.(png|jpg|gif|jpeg)$/,
                use: [
                    {
                        loader: 'file-loader',
                        options: {
                            name: '[name]_[hash:8].[ext]'
                        }
                    }
                    // {
                    //     loader: 'url-loader',
                    //     options: {
                    //         limit: 10240
                    //     }
                    // }
                ]
            },
            {
                test: /.(woff|woff2|eot|ttf|otf)$/,
                use: [
                    {
                        loader: 'file-loader',
                        options: {
                            name: '[name]_[hash:8].[ext]'
                        }
                    }
                ]
            }
        ]
    },
    plugins: [
        new MiniCssExtractPlugin({
            filename: '[name]_[contenthash:8].css'
        }),
        new OptimizeCssAssetsWebpackPlugin({
            assetNameRegExg: /\.css$/g,
            cssProcessor: require('cssnano') //css处理器
        }),
        new FriendlyErrorsWebpackPlugin(),
        function () {
            this.hooks.done.tap('done', (stats) => {
                if (stats.compilation.errors && stats.compilation.errors.length && process.argv.indexOf('--watch') === -1) {
                    console.log('Build error');
                    process.exit(1);
                }
            });
        },
        // new HtmlWebpackExternalsPlugin({
        //    externals:[
        //        {
        //            module: 'react',
        //            entry: 'https://cdn.bootcdn.net/ajax/libs/react/0.0.0-0c756fb-f7f79fd/umd/react.production.min.js',
        //            global: 'React'
        //        },
        //        {
        //            module: 'react-dom',
        //            entry: 'https://cdn.bootcdn.net/ajax/libs/react-dom/0.0.0-0c756fb-f7f79fd/cjs/react-dom-server.browser.production.min.js',
        //            global: 'ReactDOM'
        //        }
        //    ]
        // }),
        // new HTMLInlineCSSWebpackPlugin(),
        new CleanWebpackPlugin()
    ].concat(htmlWebpackArrays),
    // optimization: { // 分离包作为公共文件
    //     splitChunks: {
    //         cacheGroups: {
    //             commons: {
    //                 test: /(react|react-dom)/,
    //                 name: 'vendors',
    //                 chunks: 'all'
    //             }
    //         }
    //     }
    // },
    stats: 'errors-only',
    optimization: { // 分离公共基础包
        splitChunks: {
            minSize: 0,
            cacheGroups: {
                commons: {
                    name: 'commons',
                    chunks: 'all',
                    minChunks: 2 // 如果一个文件被引用了至少两次以上，就会被打包成为一个公共基础文件
                }
            }
        }
    },
    devtool: 'eval'
};

// 文件指纹
/*
    Hash: 项目构建的hash
    ChunkHash：和webpack打包的chunk有关，不同的entry会生成不同的chunkHash
    ContentHash：根据文件内容来定义hash，文件内容不变，则contentHash不变


 */

// 解析react语法 下载 react-dom @babel/preset-react -d
// 文件监听 某个文件发生了变化，不会立刻告诉监听者，而是缓存起来，等aggregateTimeout
/*
module.export = {
    watch: true,// 默认false 不开启
    watchOptions:{
        ignored: /node_modules/,
        aggregateTimeout: 300 监听到变化后等300ms去执行，默认300ms
        poll: 1000 判断文件是否变化 默认每秒1000次
    }
}

 */
// 样式前缀自动补全
/*
npm i postcss-loader
autoprefixer 此插件不建议使用，出现兼容性报错

postcss-preset-env 内嵌样式自动补全工具

px2rem-loader px转rem工具

lib-flexible 动态计算根元素rem的单位
 */

/*
glob 库 获取文件目录信息


source map 来排除错误及文件
eval: 使用eval来包裹模块代码
source map: 产生.map文件
cheap: 不包含列信息
inline：将.map作为DataURL嵌入 ，不单独生成.map文件
module:包含loader的source
 */

/*

SplitChunksPlugin 进行公共脚本分离 对引入的例如react 的库进行分离

 */

/*
    Tree-shaking 代码擦除 原理分析

1.利用es6模块特点
2.只能作为模块顶层语句的出现 不可以动态引用
3.import binding 是immutable的

代码擦除 静态分析 uglify阶段删除无用的代码

    ScopeHosting原理
(构建后的代码存在大量闭包

被webpack转化后的模块会带上一层包裹
import 会被转换成_webpack_require

打包出来时一个匿名闭包
modules是一个数组 每一项都是一个模块初始化函数
_webpack_require 用来加载模块 返回 module.exports
通过webpack_require_method 启动程序)

    scope hosting
    原理：将所有模块的代码按照引用顺序放在一个函数作用域里，适当的重命名防止变量名冲突
    对比： 通过scope hosting 可以减少函数声明代码和内存开销

 */
/*
1.代码分割的意义
对于大的web应用来讲，将所有的代码都放在一个文件中显然是不够有效的，特别是当你的某些代码块是某些特殊的时候才会被引用到，webpack将代码库分割成chunk（语块）当代码运行到需要他们的时候在进行加载

2.适用场景

抽离相同代码到一个共享块
脚本懒加载，使初始下载代码量更小
懒加载方式：
CommonJS中通过require.ensure
在es6中动态import （目前不能原生支持，需要babel转换）

 @babel/plugin-syntax-dynamic-import 插件进行代码分割

 */
/*
方案一： 本地开发阶段增加 precommit钩子 在 build之前  commit之后  对代码进行eslint检查
方案二： 在js插件中增加 eslint-loader 在构建时检查js规范
具体模块  airbnb eslint检查命令 具体模块参考如下
https://github.com/airbnb/javascript/tree/d529ccaea3b3da1c1cfce686b119d662e8e05c69/packages/eslint-config-airbnb

eslint-loader babel-eslint

eslint-config-airbnb

 */

/*
webpack 之 库的打包
将库暴露出去
library：指定库的全局变量
libraryTarget支持库的引入的方式

 */
