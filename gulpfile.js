var babel  = require('gulp-babel'),
    del    = require('del'),
    gulp   = require('gulp'),
    server = require('gulp-webserver'),
    watch  = require('gulp-watch');

gulp.task('default', ['build-app']);

gulp.task('develop', ['server', 'watch']);

gulp.task('build-app', ['compile-html'], function () {
    return del(['build']);
});

gulp.task('compile-html', ['compile-js'], function () {
	return gulp.src('src/**/*.html')
               .pipe(gulp.dest('dist'));
});

gulp.task('compile-js', ['clean-all'], function () {
    gulp.src([
          'bower_components/id3js/id3.min.js',
          'bower_components/system.js/dist/system.js'
        ])
        .pipe(gulp.dest('dist/bower_components'));

    return gulp.src('src/**/*.js')
               .pipe(babel())
               .pipe(gulp.dest('dist'));
});

gulp.task('clean-all', function () {
    return del([
        'dist',
        'build'
    ]);
});

gulp.task('server', ['build-app'], function () {
    return gulp.src('dist')
               .pipe(server({
                    livereload : true,
                    open       : true
               }));
});

gulp.task('watch', function () {
    watch(['src/**/*.js', 'src/**/*.html'], function () {
        gulp.start('build-app');
    });
});
