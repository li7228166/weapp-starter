const gulp = require('gulp');
const gulpLoadPlugins = require('gulp-load-plugins');
const runSequence = require('run-sequence');

gulp.task('build', next => runSequence(['compile', 'copy'], next));