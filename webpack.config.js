var path = require('path')
var HtmlWebpackPlugin = require('html-webpack-plugin');

var buildFolder   = path.join(__dirname, 'build')

var entryFilepath = path.join(__dirname, 'src', 'Main.js6')
var bootstrapFilePath = path.join(__dirname, 'bootstrap', 'Bootstrap.js6')

module.exports = {
  entry:  {
    main: entryFilepath,
    bootstrap: bootstrapFilePath
  },
  output: {
    path:     buildFolder,
    filename: '[name].js'
  },
  resolve: {
    extensions: [ '', '.js', '.js6' ]
  },
  resolveLoader: {
    alias: {
      'node-loader': path.join(__dirname, 'node_modules', 'node-loader')
    }
  },
  target: 'electron',
  node: {
    __dirname: false,
    __filename: false
  },
  module: {
    loaders: [
      {
        test:   /\.css$/,
        loader: 'style!css'
      },
      {
        test:    /\.js6$/,
        exclude: /node_modules/,
        loader:  'babel-loader'
      },
      {
        test:   /\.json$/,
        loader: 'json-loader'
      },
      {
        test: /\.node$/,
        loader: 'node-loader'
      }
    ]
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: 'index.ejs',
      inject: 'body',
      title: 'Webpage'
    })
  ]
}
