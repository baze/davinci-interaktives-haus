'use strict';

var Masonry = require('masonry-layout');

module.exports = function () {

    var elem = document.querySelector('.grid');
    var msnry = new Masonry( elem, {
        // options
        itemSelector: '.grid-item',
        columnWidth: 200
    });

};