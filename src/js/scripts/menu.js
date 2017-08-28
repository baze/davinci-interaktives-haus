'use strict';

var $ = require('jquery');
// var cbpHorizontalMenu = require('HorizontalDropDownMenu');

module.exports = function () {

    $(function() {
        var cbpHorizontalMenu = (function () {

            var $listItems = $('.menu-horizontal > li'),
                $menuItems = $listItems.children('a'),
                $body = $('body'),
                current = -1;

            function init() {
                $menuItems.on('click', open);
                $listItems.on('click', function (event) {
                    event.stopPropagation();
                });
            }

            function open(event) {

                if (current !== -1) {
                    $listItems.eq(current).removeClass('cbp-hropen');
                }

                var $item = $(event.currentTarget).parent('li'),
                    idx = $item.index();

                console.log(current);
                console.log(idx);

                if (current === idx) {
                    $item.removeClass('cbp-hropen');
                    current = -1;
                }
                else {
                    $item.addClass('cbp-hropen');
                    current = idx;
                    $body.off('click').on('click', close);
                }

                return false;

            }

            function close(event) {
                $listItems.eq(current).removeClass('cbp-hropen');
                current = -1;
            }

            return {init: init};

        })();

        cbpHorizontalMenu.init();
    });

};


