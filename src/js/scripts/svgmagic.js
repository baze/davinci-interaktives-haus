'use strict';

var Modernizr = require('modernizr');
var $ = require('jquery');
require('svgmagic');

module.exports = function() {
    $('img').svgmagic();

    if (!Modernizr.svg) {
        $("img[src$='.svg']")
            .attr("src", fallback);
    }
};