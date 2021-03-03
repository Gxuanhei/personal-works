const glob = require('glob'); // 获取文件目录
const path = require('path');
const MiniCssExtractPlugin = require('mini-css-extract-plugin'); // css编译工具
const HtmlWebpackPlugin = require('html-webpack-plugin'); // html关联代码压缩插件
const {CleanWebpackPlugin} = require('clean-webpack-plugin'); //自动清理构建目录
const FriendlyErrorsWebpackPlugin = require('friendly-errors-webpack-plugin');

const projectRoot = process.cwd();
console.log(projectRoot);
const setMPA = () => {
    const entry = {};
    const htmlWebpackArrays = [];

    const entryFiles = glob.sync(path.join(projectRoot, './src/*/index.js'));
    Object.keys(entryFiles)
        .map(index => {
            const entryFile = entryFiles[index];
            const match = entryFile.match(/src\/(.*)\/index\.js/);
            const pageName = match && match[1];

            entry[pageName] = entryFile;
            htmlWebpackArrays.push(
                new HtmlWebpackPlugin({
                    template: path.join(projectRoot, `src/${pageName}/index.html`),
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
    // console.log(entryFiles);

    return {
        entry,
        htmlWebpackArrays
    };
};

const {entry, htmlWebpackArrays} = setMPA();

module.exports = {
    entry: entry,
    output: {
        path: path.resolve(projectRoot, 'dist'),
        filename: '[name]_[chunkhash:8].js'
    },
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
        new FriendlyErrorsWebpackPlugin(),
        function () {
            this.hooks.done.tap('done', (stats) => {
                if (stats.compilation.errors && stats.compilation.errors.length && process.argv.indexOf('--watch') === -1) {
                    console.log('Build error');
                    process.exit(1);
                }
            });
        },
        new CleanWebpackPlugin()
    ].concat(htmlWebpackArrays),
    stats: 'errors-only'
};
