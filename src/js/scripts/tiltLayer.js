'use strict';

var $ = require('jquery');

module.exports = function () {

    var options = {
        // how much each slider/scene will rotate when the user moves the mouse
        movement: {
            rotateX: -10, // a relative rotation of -5deg to 5deg on the x-axis
            rotateY: 10 // a relative rotation of -10deg to 10deg on the y-axis
        }
    };

    var slide = $('.tilt').first(),
        slideWidth = slide.width(),
        slideHeight = slide.height(),
        screenWidth = $(window).width(),
        screenHeight = $(window).height();

    // from http://www.quirksmode.org/js/events_properties.html#position
    function getMousePos(e) {
        var posx = 0;
        var posy = 0;
        if (!e) var e = window.event;
        if (e.pageX || e.pageY) {
            posx = e.pageX;
            posy = e.pageY;
        }
        else if (e.clientX || e.clientY) {
            posx = e.clientX + document.body.scrollLeft
                + document.documentElement.scrollLeft;
            posy = e.clientY + document.body.scrollTop
                + document.documentElement.scrollTop;
        }
        return {
            x: posx,
            y: posy
        }
    }

    function tiltSlide(mousepos) {

        // transform values
        var rotX = options.movement.rotateX ? 2 * options.movement.rotateX * ((mousepos.y - screenHeight / 2) / screenHeight) : 0,
            rotY = options.movement.rotateY ? 2 * options.movement.rotateY * ((mousepos.x - screenWidth / 2) / screenWidth) : 0;

        slide.css({
            '-webkit-transform': 'rotate3d(1,0,0,' + rotX + 'deg) rotate3d(0,1,0,' + rotY + 'deg)',
            '-moz-transform': 'rotate3d(1,0,0,' + rotX + 'deg) rotate3d(0,1,0,' + rotY + 'deg)',
            '-ms-transform': 'rotate3d(1,0,0,' + rotX + 'deg) rotate3d(0,1,0,' + rotY + 'deg)',
            'transform' : 'rotate3d(1,0,0,' + rotX + 'deg) rotate3d(0,1,0,' + rotY + 'deg)'
        });
    }

    // mousemove event / tilt functionality
    document.addEventListener('mousemove', function (ev) {
        requestAnimationFrame(function () {
            // mouse position relative to the document.
            var mousepos = getMousePos(ev);
            // apply the rotation to the slide. This will depend on the mouse position
            tiltSlide(mousepos);
        });
    });

    window.ondevicemotion = function (event) {

        requestAnimationFrame(function () {

            var accX = Math.round(event.accelerationIncludingGravity.x * 10) / 10;
            var accY = Math.round(event.accelerationIncludingGravity.y * 10) / 10;

            var movement = 20;

            var rotX = -(accX / 10) * movement;
            var rotY = -(accY / 10) * movement;

            slide.css({
                'transform': 'rotate3d(1,0,0,' + rotX + 'deg) rotate3d(0,1,0,' + rotY + 'deg)'
            });
        });

    };



};