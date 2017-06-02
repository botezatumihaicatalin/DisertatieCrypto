var path = require('path')
var HtmlWebpackPlugin = require('html-webpack-plugin');
var ExtractTextPlugin = require("extract-text-webpack-plugin");

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
    extensions: [ '.js', '.js6' ]
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
        loader: ExtractTextPlugin.extract({ fallback: 'style-loader', use: 'css-loader' })
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
      },
      {
        test: /\.woff(2)?(\?v=[0-9]\.[0-9]\.[0-9])?$/,
        loader:"url-loader?limit=10000&mimetype=application/font-woff"
      },
      {
        test: /\.(ttf|eot|svg)(\?v=[0-9]\.[0-9]\.[0-9])?$/,
        loader: "file-loader"
      }
    ]
  },
  plugins: [
    new ExtractTextPlugin("[name].css"),
    new HtmlWebpackPlugin({
      template: 'index.ejs',
      inject: 'body',
      title: 'Share It',
      chunks: [ 'main' ]
    })
  ]
}
