const gulp = require('gulp');

gulp.task('watch', ['build'], () => {
    gulp.watch('app/**/*.js', ['compile:js']);
    gulp.watch('app/**/*.html', ['compile:html']);
    gulp.watch('app/**/*.less', ['compile:less']);
    gulp.watch('app/**/*.json', ['compile:json']);
    gulp.watch('app/**/*.{jpe?g,png,gif}', ['compile:img'])
});