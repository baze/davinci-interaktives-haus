'use strict';

var gulp = require('gulp');
var insert = require('gulp-insert');
var fs = require('fs');
var notify = require('gulp-notify');
var rename = require('gulp-rename');
var handleErrors = require('../util/handleErrors');

gulp.task('inlineJs', ['browserify', 'browserify-critical'], function() {

    var scripts = fs.readFileSync('dest/js/bundle-critical.js', 'utf8');

    return gulp.src('./views/blank.twig')
        .pipe(insert.append('<script>\n' + scripts + '\n</script>'))
        .on('error', handleErrors)
        .pipe(rename('critical-assets-js.twig'))
        .pipe(gulp.dest('./views/_generated'))
        .pipe(notify('JS inlined.'));
});
