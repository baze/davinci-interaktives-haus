'use strict';

var $ = require('jquery');
var MediaElementPlayer = require('mediaelement');

module.exports = function () {

    $('audio,video').mediaelementplayer({
        pluginPath: '../bower_components/mediaelement/build/',
        audioWidth: '100%',
        videoWidth: '100%',
        enableAutosize: true,
        features: [],
        alwaysShowControls: false,
        success: function (mediaElement, originalNode) {
            // do things
        }
    });

};