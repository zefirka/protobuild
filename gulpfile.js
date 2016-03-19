'use strict';

const gulp = require('gulp');
const browserify = require('gulp-browserify');
const less = require('gulp-less');
const join = require('path').join;
const shell = require('gulp-shell');
const task = require('./utils/gulp-task')(gulp);
const autoprefixer = require('gulp-autoprefixer');

task('styles', () => {
    return gulp.src('./static/less/index.less')
        .pipe(less({
            paths: [
                join(__dirname, 'static/less/modules'),
                join(__dirname, 'static/less/blocks')
            ]
        }))
        .pipe(autoprefixer({
            browsers: ['ie >= 8, last 15 versions, > 1%'],
            cascade: false
        }))
        .pipe(gulp.dest('./bundles/css'));
});

task('compile', () => {
    return gulp.src('compile.js', {read: false})
        .pipe(shell(['node compile.js']));
});

task('scripts', () => {
    return gulp.src('./static/js/app.js')
        .pipe(browserify({
            insertGlobals: true,
            debug: true
        }))
        .pipe(gulp.dest('./bundles/js'));
});

task('watch', () => {
    gulp.watch('./pages/*', ['compile']);
    gulp.watch('./components/**/*', ['compile']);
    gulp.watch('./declarations/*', ['compile']);
    gulp.watch('./compile.js', ['compile']);

    gulp.watch('./static/js/**/*.js', ['scripts']);
    gulp.watch('./static/less/**/*.less', ['styles']);
});

gulp.task('default', ['scripts', 'styles', 'compile', 'watch']);
