/**
 * Created by sergey on 07.03.15.
 */

var gulp       = require('gulp'),
    open       = require('gulp-open'),
    concat     = require('gulp-concat'),
    connect    = require('gulp-connect'),
    rename     = require('gulp-rename'),
    browserify = require('gulp-browserify'),
    port       = 8000;

gulp.task('browserify', function () {
    gulp.src('./app/js/main.jsx')
        .pipe(browserify({ transform: 'reactify' }))
        .pipe(rename('main.js'))
        .pipe(gulp.dest('./build/js/'));
});

gulp.task('open', function () {
    var options = {
        url: 'http://localhost:' + port
    };

    gulp.src('build/index.html')
        .pipe(open('', options));
});

gulp.task('connect', function () {
    connect.server({
        root       : 'build',
        port       : port,
        livereload : true
    });
});

gulp.task('js', function () {
    gulp.src('./build/js/*.js')
        .pipe(connect.reload());
});

gulp.task('html', function () {
    gulp.src('./app/*.html')
        .pipe(gulp.dest('./build'))
        .pipe(connect.reload());
});

gulp.task('css', function () {
    gulp.src('./app/css/*.css')
        .pipe(gulp.dest('./build/css'))
        .pipe(connect.reload());
});


gulp.task('watch', function () {
    gulp.watch('./app/js/*.js',   ['js']);
    gulp.watch('./app/*.html',    ['html']);
    gulp.watch('./app/css/*.css',    ['css']);
    gulp.watch('./app/js/*.jsx', ['browserify', 'js']);
});


gulp.task('build', ['browserify']);
gulp.task('develop', ['build', 'connect', 'open', 'watch']);
gulp.task('default', ['build']);
