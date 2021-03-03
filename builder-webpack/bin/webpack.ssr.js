
const merge = require('webpack-merge');
const baseConfig = require('./webpack.base');
const OptimizeCssAssetsWebpackPlugin = require('optimize-css-assets-webpack-plugin'); // css代码压缩工具


const SSRConfig = {
    mode: 'production', // 配置打包环境 生产production/开发development-
    module: {
        rules: [
            {
                test: /\.css$/,
                use: 'ignore-loader'
            },
            {
                test: /\.less$/,
                use: 'ignore-loader'
            }
        ]
    },
    plugins: [
        new OptimizeCssAssetsWebpackPlugin({
            assetNameRegExg: /\.css$/g,
            cssProcessor: require('cssnano') //css处理器
        }),

    ],
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



module.exports = merge(baseConfig, SSRConfig);
