const fs = require('fs');
const path = require('path');
const gulp = require('gulp');
const gulpLoadPlugins = require('gulp-load-plugins');
const plugins = gulpLoadPlugins();

delete process.env["DEBUG_FD"];

fs.readdirSync('./script').filter(function (file) {
    return (/\.js$/i).test(file);
}).map(function (file) {
    require('./script/' + file);
});

gulp.task('default', ['clean'], function () {
    gulp.start('watch');
});