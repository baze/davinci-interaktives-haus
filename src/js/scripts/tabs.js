'use strict';

var $ = require('jquery');

module.exports = function () {
    $(function () {

        $('.tabs-navigation').each(function() {

            var tabItems = $(this).find('li a');
            var activeItems = tabItems.find('.active');

            if (!activeItems.length) {
                var selectedItem = tabItems.first();
                selectTab(selectedItem);
            }
        }).find('li a').on('click touchstart MSPointerDown mouseenter', function (event) {
            var selectedItem = $(this);

            if (! selectedItem.hasClass('active')) {
                event.preventDefault();
                selectTab(selectedItem);
            }
        });

        function selectTab(selectedItem) {

            var tabNavigation = selectedItem.parents('.tabs-navigation');
            var tabContentWrapper = tabNavigation.siblings('.tabs-content');

            var tabItems = tabNavigation.find('li a');

            var selectedTab = selectedItem.data('content');
            var selectedContent = tabContentWrapper.find('li[data-content="' + selectedTab + '"]');

            tabItems.removeClass('active');
            selectedItem.addClass('active');
            selectedContent.addClass('active').siblings('li').removeClass('active');
        }

    });

};