'use strict';

var $ = require('jquery');
var StickyState = require('sticky-state');

module.exports = function () {

    var stickyElements = $('.sticky').first();

    /*
    var content = $('._content-page').first();
    var sidebar = $('._module-sidebar').first();

    if (sidebar) {
        setTimeout(function () {
            var heightContent = content.height();
            var heightSidebar = sidebar.height();

            if (heightContent > heightSidebar) {
                sidebar.height(heightContent);
            }

            if (stickyElements.length) {
                StickyState.apply(document.querySelectorAll('.sticky'));
            }

        }, 400);
    }*/

    if (stickyElements.length) {
        StickyState.apply(document.querySelectorAll('.sticky'));
    }

};