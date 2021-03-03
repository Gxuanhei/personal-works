if(process.env.NODE_ENV === 'production') {
    module.exports = require('./dist/larger-number.min')
}else {
    module.exports = require('./dist/larger-number')
}
