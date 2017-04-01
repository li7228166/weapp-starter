const gulp = require('gulp');
const gulpLoadPlugins = require('gulp-load-plugins');
const runSequence = require('run-sequence');
const util = require('./util');

const plugins = gulpLoadPlugins();

//编译js文件
gulp.task('compile:js', () => {
    return gulp.src(['app/**/*.js'])
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

//编译xml文件
gulp.task('compile:xml', () => {
    return gulp.src(['app/**/*.xml'])
        .pipe(plugins.if(util.isDev, plugins.sourcemaps.init()))
        .pipe(plugins.if(util.isPro, plugins.htmlmin({
            collapseWhitespace: true,
            keepClosingSlash: true,
            removeComments: true,
            removeScriptTypeAttributes: true,
            removeStyleLinkTypeAttributes: true
        })))
        .pipe(plugins.rename({extname: '.wxml'}))
        .pipe(plugins.if(util.isDev, plugins.sourcemaps.write('.')))
        .pipe(gulp.dest('dist'))
});

//编译less文件
gulp.task('compile:less', () => {
    return gulp.src(['app/**/*.less'])
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
        .pipe(plugins.imagemin())
        .pipe(gulp.dest('dist'))
});

//编译
gulp.task('compile', ['clean'], next => {
    runSequence([
        'compile:js',
        'compile:xml',
        'compile:less',
        'compile:json',
        'compile:img'
    ], next)
});