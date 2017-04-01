const gulp = require('gulp');

gulp.task('watch', ['build'], () => {
    gulp.watch('app/**/*.js', ['compile:js']);
    gulp.watch('app/**/*.xml', ['compile:xml']);
    gulp.watch('app/**/*.less', ['compile:less']);
    gulp.watch('app/**/*.json', ['compile:json']);
    gulp.watch('app/**/*.{jpe?g,png,gif}', ['compile:img'])
});