'use strict';

var $ = require('jquery');

module.exports = function () {

    var className = 'readability';

    $('.single-kapitel').addClass(className);

    $('.readability-button').on('click', function(event) {
        event.preventDefault();

        $('body').toggleClass(className);
    });

};