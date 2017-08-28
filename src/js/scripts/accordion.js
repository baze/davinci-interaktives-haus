'use strict';

var $ = require('jquery');

module.exports = function () {

    // if ($(window).width() < 768) {
    var toggle = $('<div class="accordion-toggle"></div>');

    $('.accordion-headline').append(toggle);

    $('.accordion-inner').hide();

    $('.accordion-headline').click(function (event) {
        var target = $(this).next('.accordion-inner');

        $('.accordion-headline').not($(this)).removeClass('active');
        $('.accordion-inner').not(target).slideUp(400);

        $(this).toggleClass('active');
        target.slideToggle(400);
    });

    // open first accordion section
    // $('.accordion-headline').first().trigger('click');

    // }

};