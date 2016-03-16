'use strict';

const gulp = require('gulp');
const browserify = require('gulp-browserify');

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

gulp.task('default', ['scripts']);
