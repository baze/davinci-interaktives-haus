'use strict';

var $ = require('jquery');

module.exports = function () {

    $('.overlay-open').on('click', function(event) {
        event.preventDefault();

        $('.overlay').addClass('overlay-open');
    });

    $('.overlay-close').on('click', function() {
        $('.overlay').removeClass('overlay-open');
    });
};