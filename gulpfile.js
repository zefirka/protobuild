'use strict';

const gulp        = require('gulp');
const browserify  = require('gulp-browserify');
const less        = require('gulp-less');
const join        = require('path').join;

// Basic usage
gulp.task('scripts', function () {
    // Single entry point to browserify
    gulp.src('./static/js/app.js')
        .pipe(browserify({
            insertGlobals: true,
            debug: true
        }))
        .pipe(gulp.dest('./bundles/js'));
});

gulp.task('styles', function () {
    return gulp.src('./static/less/index.less')
        .pipe(less({
            paths: [
              join(__dirname, 'static/less/modules'),
              join(__dirname, 'static/less/blocks')
            ]
        }))
        .pipe(gulp.dest('./bundles/css'));
});

gulp.task('default', ['scripts', 'styles']);
