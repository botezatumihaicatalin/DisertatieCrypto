require('babel-register')({
    ignore: false,
    retainLines: true,
    extensions: [ ".js6" ],
})
require('./gulpfile.js6')
