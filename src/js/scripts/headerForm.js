'use strict';

var $ = require('jquery');

module.exports = function () {

    var form = $('._module-header-form');
    var wrapper = form.find('.wrapper');

    form.find('.contactform-headline').on('click', function(event) {
        event.preventDefault();

        form.toggleClass('open');
        //wrapper.find('.wpcf7').slideToggle();
    });

};