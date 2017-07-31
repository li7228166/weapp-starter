const gulp = require('gulp');
const gulpLoadPlugins = require('gulp-load-plugins');
const runSequence = require('run-sequence');
const util = require('./util');

const plugins = gulpLoadPlugins();

//编译js文件
gulp.task('compile:js', () => {
    return gulp.src(['app/**/*.js'])
        .pipe(plugins.changed('dist'))
        .pipe(plugins.if(util.isDev, plugins.sourcemaps.init()))
        .pipe(plugins.babel())
        .on('error', function (err) {
            plugins.util.log(plugins.util.colors.red('Js Error!'), plugins.util.colors.bgRed(err.message));
            this.end();
        })
        .pipe(plugins.if(util.isPro, plugins.uglify()))
        .pipe(plugins.if(util.isDev, plugins.sourcemaps.write('.')))
        .pipe(gulp.dest('dist'))
});

//编译html文件
gulp.task('compile:html', () => {
    return gulp.src(['app/**/*.html'])
        .pipe(plugins.changed('dist'))
        .pipe(plugins.if(util.isDev, plugins.sourcemaps.init()))
        .pipe(plugins.if(util.isPro, plugins.htmlmin({
            collapseWhitespace: true,
            keepClosingSlash: true,
            removeComments: true,
            removeScriptTypeAttributes: true,
            removeStyleLinkTypeAttributes: true
        })))
        .pipe(plugins.replace(/^<template name="(.*?)">[\s\S]*/g, function (content, b, c) {
            return content.replace(/(bind|catch.*?)=.*?"(.*?)"/g, '$1="' + b + '_$2"');
        }))
        .pipe(plugins.rename({extname: '.wxml'}))
        .pipe(plugins.if(util.isDev, plugins.sourcemaps.write('.')))
        .pipe(gulp.dest('dist'))
});

//编译less文件
gulp.task('compile:less', () => {
    return gulp.src(['app/**/*.less'])
        .pipe(plugins.changed('dist'))
        .pipe(plugins.if(util.isDev, plugins.sourcemaps.init()))
        .pipe(plugins.less())
        .on('error', function (err) {
            plugins.util.log(plugins.util.colors.red('Less Error!'), plugins.util.colors.bgRed(err.message));
            this.end();
        })
        .pipe(plugins.replace('px', 'rpx'))
        .pipe(plugins.if(util.isPro, plugins.cssnano({compatibility: '*'})))
        .pipe(plugins.rename({extname: '.wxss'}))
        .pipe(plugins.if(util.isDev, plugins.sourcemaps.write('.')))
        .pipe(gulp.dest('dist'))
});

//编译json文件
gulp.task('compile:json', () => {
    return gulp.src(['app/**/*.json'])
        .pipe(plugins.changed('dist'))
        .pipe(plugins.if(util.isDev, plugins.sourcemaps.init()))
        .pipe(plugins.if(util.isPro, plugins.jsonminify()))
        .on('error', function (err) {
            plugins.util.log(plugins.util.colors.red('Json Error!'), plugins.util.colors.bgRed(err.message));
            this.end();
        })
        .pipe(plugins.if(util.isDev, plugins.sourcemaps.write('.')))
        .pipe(gulp.dest('dist'))
});

//编译压缩图片文件
gulp.task('compile:img', () => {
    return gulp.src(['app/**/*.{jpg,jpeg,png,gif}'])
        .pipe(plugins.changed('dist'))
        .pipe(plugins.imagemin())
        .pipe(gulp.dest('dist'))
});

//编译
gulp.task('compile', ['clean'], next => {
    runSequence([
        'compile:js',
        'compile:html',
        'compile:less',
        'compile:json',
        'compile:img'
    ], next)
});