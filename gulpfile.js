var path = require('path');
var gulp = require('gulp');
var gutil = require("gulp-util");
var downloadElectron = require('gulp-electron-downloader');
var shell = require('shelljs');
var webpack = require('webpack');
var webpackConfig = require('./webpack.config');

gulp.task("electron:build", function(callback) {
    // run webpack
    webpack(webpackConfig, function(err, stats) {
        if(err) {
          throw new gutil.PluginError("webpack", err);
        }
        gutil.log("[webpack]", stats.toString());
        callback();
    });
});

gulp.task('electron:download', function(callback) {
    downloadElectron({
      version: 'v1.3.14',
      outputDir: path.join('other_repos', 'binaries', 'electron'),
      cacheDir: path.join('other_repos', 'cache', 'electron')
    }, callback);
});

gulp.task('electron:run', function(callback) {
  const bootstrapPath = path.join(webpackConfig.output.path, 'bootstrap.js')
  const electronPath = path.join('other_repos', 'binaries', 'electron', 'electron.exe')
  shell.exec(electronPath + ' ' + bootstrapPath, callback);
});

