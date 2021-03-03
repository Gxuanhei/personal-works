const path = require('path')
const webpack = require('webpack')
const rimraf = require('rimraf')
const Mocha = require('mocha')

const mocha = new Mocha({
    timeout: '10000ms'
})

process.chdir(__dirname)
rimraf('./dist',() =>{
    const proConfig = require('../builder-webpack/bin/webpack.prod')
    webpack(proConfig,(err, stats)=>{
        if(err){
            console.error(err);
            return
        }
        
        console.log(stats.toString({
            colors: true,
            modules: false,
            children: false,
            chunks: false,
            chunkModules: false
        }))
        
        console.log('\n' + 'Compiler success')
    })
})
