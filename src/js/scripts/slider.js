'use strict';

var $ = require('jquery');
window.jQuery = $;
require('flexslider');

module.exports = function () {

    $('.flexslider.flexslider--slide').flexslider({
        animation: "slide",
        slideshow: true,
        controlNav: true,
        directionNav: true,
        slideshowSpeed: 6500,
        animationSpeed: 750
    });

    $('.flexslider').flexslider({
        animation: "fade",
        slideshow: true,
        controlNav: true,
        directionNav: true,
        slideshowSpeed: 6500,
        animationSpeed: 750,
        manualControls: ".slides-navigation li"
    });

};