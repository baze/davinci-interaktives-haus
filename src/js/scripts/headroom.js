'use strict';

var Headroom = require('headroom.js');

module.exports = function() {

    var myElement = document.querySelector('._global-header');
    var headroom = new Headroom(myElement, {
        "tolerance": 0,
        "offset": 100,
        "classes": {
            "initial": "headroom",
            "pinned": "headroom--pinned",
            "unpinned": "headroom--unpinned",
            "top": "headroom--top",
            "notTop": "headroom--not-top"
        }
    });
    headroom.init();

};