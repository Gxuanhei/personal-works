const glob = require('glob') // 获取文件目录
const path = require('path')
const MiniCssExtractPlugin = require('mini-css-extract-plugin') // css编译工具
const OptimizeCssAssetsWebpackPlugin = require('optimize-css-assets-webpack-plugin') // css代码压缩工具
const HtmlWebpackPlugin = require('html-webpack-plugin') // html关联代码压缩插件
const {CleanWebpackPlugin} = require('clean-webpack-plugin') //自动清理构建目录
// const HTMLInlineCSSWebpackPlugin = require("html-inline-css-webpack-plugin").default; css内联
const HtmlWebpackExternalsPlugin = require('html-webpack-externals-plugin')

const setMPA = () => {
    const entry = {}
    const htmlWebpackArrays = []
    
    const entryFiles = glob.sync(path.join(__dirname, './src/*/index-server.js'))
    Object.keys(entryFiles).map(index => {
        const entryFile = entryFiles[index]
        const match = entryFile.match(/src\/(.*)\/index-server\.js/)
        const pageName = match && match[1]
        if(pageName) {
            entry[pageName] = entryFile
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
            )
        }
    })
    // console.log(entryFiles)
    
    return {
        entry,
        htmlWebpackArrays
    }
}

const {entry, htmlWebpackArrays} = setMPA()

module.exports = {
    entry: entry,
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: '[name]-server.js',
        libraryTarget: 'umd'
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
                        loader: 'url-loader',
                        options: {
                            esModule: false, // 这里设置为false 不然图片会显示 [object Module]
                            name: '[name]_[hash:8].[ext]',
                            limit: 10240
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
    optimization: { // 分离公共基础包
        splitChunks: {
            minSize: 0,
            cacheGroups:{
                commons:{
                    name: 'commons',
                    chunks: 'all',
                    minChunks: 2 // 如果一个文件被引用了至少两次以上，就会被打包成为一个公共基础文件
                }
            }
        }
    },
    devtool: 'eval'
}
// 错误日志输出信息
/*
status

errors-only: 只在发生错误时输出
minimal： 只在发生错误或有新的编译时输出
none：没有输出
normal： 标准输出
verbose：全部输出

 */
// 优化构建命令行的显示日志
/*
friendly-errors-webpack-plugin
success: 构建成功日志提示
warning: 构建警告的日志提示
error： 构建报错的日志提提示
 
 */
