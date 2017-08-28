'use strict';

var gulp = require('gulp');

var inputDir = './src';

gulp.task('watch', ['browserSync'], function() {
	gulp.watch(inputDir + '/sass/**/*.scss', ['css']);
    gulp.watch(inputDir + '/js/**/*.js', ['js']);
	gulp.watch(inputDir + '/img/**', ['images']);
});
