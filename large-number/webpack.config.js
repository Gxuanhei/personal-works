const TerserPlugin = require('terser-webpack-plugin')

module.exports = {
    entry:{
        'larger-number': './src/index.js',
        'larger-number.min': './src/index.js'
    },
    output:{
        filename: '[name].js',
        library: 'largeNumber',
        libraryTarget: 'umd',
        libraryExport: 'default'
    },
    mode: 'none',
    optimization:{
        minimize: true,
        minimizer: [
            new TerserPlugin({
                include: /\.min\.js$/
            })
        ]
    }
}
// 通过 terser-webpack-plugin 来指定压缩文件 支持es6的压缩
