const gulp = require('gulp');

gulp.task('copy', [], () => {
    return gulp.src([
        'app/**/*.*',
        '!app/**/*.js',
        '!app/**/*.xml',
        '!app/**/*.less',
        '!app/**/*.json',
        '!app/**/*.{jpe?g,png,gif}'
    ]).pipe(gulp.dest('dist'))
});
