'use strict';

var $ = require('jquery');
require('malihu-custom-scrollbar-plugin')($);

module.exports = function () {

    $(".container").mCustomScrollbar({
        setTop: 0,
        axis: "y",
        alwaysShowScrollbar: 0,
        mouseWheel: {
            scrollAmount: 1000
        },
        advanced: {
            updateOnContentResize: true,
            updateOnImageLoad: true
        },
        theme: "light"
    });

    /*$(window).load(function () {

        $('.scroll-pane').each(
            function () {
                $(this).jScrollPane({
                    showArrows: $(this).is('.arrow'),
                    animateScroll: true,
                    mouseWheelSpeed: 75,
                });
                var api = $(this).data('jsp');
                var throttleTimeout;
                $(window).bind(
                    'resize',

                    function () {
                        if (!throttleTimeout) {
                            throttleTimeout = setTimeout(
                                function () {
                                    api.reinitialise();
                                    throttleTimeout = null;
                                },
                                50);
                        }
                    });
            })

    });*/

};