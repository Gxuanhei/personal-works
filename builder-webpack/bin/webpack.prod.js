const { merge } = require('webpack-merge');
const OptimizeCssAssetsWebpackPlugin = require('optimize-css-assets-webpack-plugin'); // css代码压缩工具
const HtmlWebpackExternalsPlugin = require('html-webpack-externals-plugin');
const baseConfig = require('./webpack.base');

const ProdConfig = {
    mode: 'production',
    plugins: [
        new OptimizeCssAssetsWebpackPlugin({
            assetNameRegExg: /\.css$/g,
            cssProcessor: require('cssnano') //css代码压缩
        }),
        // new HtmlWebpackExternalsPlugin({
        //     externals: [
        //         {
        //             module: 'react',
        //             entry: 'https://cdn.bootcdn.net/ajax/libs/react/0.0.0-0c756fb-f7f79fd/umd/react.production.min.js',
        //             global: 'React'
        //         },
        //         {
        //             module: 'react-dom',
        //             entry: 'https://cdn.bootcdn.net/ajax/libs/react-dom/0.0.0-0c756fb-f7f79fd/cjs/react-dom-server.browser.production.min.js',
        //             global: 'ReactDOM'
        //         }
        //     ]
        // }),
    ],
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

module.exports = merge(baseConfig, ProdConfig);
