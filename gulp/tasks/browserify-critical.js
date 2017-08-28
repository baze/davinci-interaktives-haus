'use strict';

var browserify = require('browserify');
var watchify = require('watchify');
var bundleLogger = require('../util/bundleLogger');
var gulp = require('gulp');
var handleErrors = require('../util/handleErrors');
var source = require('vinyl-source-stream');
var gulpif = require('gulp-if');
var streamify = require('gulp-streamify');
//var ngAnnotate = require('gulp-ng-annotate');
var ngMin = require('gulp-ngmin');
var uglify = require('gulp-uglify');
var notify = require('gulp-notify');

var env = process.env.NODE_ENV || 'development';
var inputDir = './src';
var outputDir = './dest';

gulp.task('browserify-critical', ['ng-autobootstrap'], function () {

    var bundleMethod = global.isWatching ? watchify : browserify;

    var bundler = bundleMethod({
        // Specify the entry point of your app
        entries: [inputDir + '/js/main-critical.js'],
        // Add file extentions to make optional in your requires
        extensions: ['.js'],
        // Enable source maps!
        debug: env === 'development'
    });

    var bundle = function () {
        bundleLogger.start();

        return bundler
            .bundle()
            .on('error', handleErrors)
            .pipe(source(outputDir + '/js/bundle-critical.js'))
            //.pipe(gulpif(env === 'production', streamify(ngAnnotate())))
            .pipe(gulpif(env === 'production', streamify(ngMin())))
            .pipe(gulpif(env === 'production', streamify(uglify({mangle: false}))))
            .pipe(gulp.dest('./'))
            .on('end', bundleLogger.end)
            .pipe(notify('JS bundled.'));
    };

    if (global.isWatching) {
        bundler.on('update', bundle);
    }

    return bundle();
});