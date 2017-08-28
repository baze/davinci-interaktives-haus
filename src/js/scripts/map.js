'use strict';

var Vue = require('vue');
var axios = require('axios');
window.Event = require('./event.js');

var $ = require('jquery');
window.jQuery = $;
require('flexslider');

module.exports = function () {

    Vue.prototype.$http = axios;

    var filename = 'maps.json';

    Vue.component('image-slideshow', {

        data() {
            return {
                active: false,
                images: []
            }
        },

        template: `
            <div v-if="images.length > 0" class="image-slideshow" v-bind:class="{ 'is-active': active, 'is-current': active }">
            
            <div class="flexslider">
                <ul class="slides">
                    <li v-for="image in images">
                        <!--<img v-bind:src="'dest/img/' + image">-->
                        <img v-bind:src="image.url">
                    </li>
                </ul>
            </div>
            
            <button v-if="active" class="close" v-on:click="deselect">&times;</button>
            </div>
        `,

        methods: {
            deselect() {
                Event.fire('slideshowDestroyed', this);
                Event.fire('hotspotDeselected', this);
            }
        },

        created() {
            Event.fire('slideshowCreated', this);

            Event.listen('hotspotSelected', (data) => {
                var self = this;

                this.images = data.item.images;

                setTimeout(function () {
                    self.active = true;

                    $('.flexslider').flexslider({
                        animation: "fade",
                        slideshow: true,
                        controlNav: true,
                        directionNav: true,
                        slideshowSpeed: 6500,
                        animationSpeed: 750,
                        manualControls: ".slides-navigation li"
                    });
                }, 100);
            });

            Event.listen('hotspotDeselected', (data) => {
                var self = this;

                self.active = false;

                setTimeout(function () {
                    self.images = [];
                }, 100);
            });

            Event.listen('slideshowDestroyed', (data) => {
                var self = this;

                self.active = false;

                setTimeout(function () {
                    $('.flexslider').flexslider("destroy");
                    self.images = [];
                }, 100);
            });
        }
    });

    Vue.component('infobox', {

        data() {
            return {
                active: false,
                done: false,
                title: '',
                description: '',
                image: ''
            }
        },

        template: `
            <div class="info" v-if="active" v-bind:class="{ 'is-shown': active, 'is-done': done }">
                <div class="info-content">
                    <h3 v-if="title">{{ title }}</h3>
                    <img v-if="image" v-bind:src="image" alt="">
                    <p v-if="description">{{ description }}</p>
                </div>
                <button v-if="done" class="close" v-on:click="close">&times;</button>
            </div>
        `,

        created() {
            Event.listen('hotspotSelected', (data) => {
                var self = this;

                self.active = true;
                self.title = data.item.title;
                self.image = data.item.image;
                self.description = data.item.description;

                setTimeout(function () {
                    self.done = true;
                }, 1000);
            });

            Event.listen('mapDeselected', (data) => {
                this.active = false;
                this.done = false;
            });
        },

        methods: {
            close() {
                this.active = false;
                this.done = false;

                Event.fire('hotspotDeselected', this);
            }
        },
    });

    Vue.component('hotspot', {
        props: {
            item: {required: true}
        },

        data() {
            return {
                active: false
            }
        },

        template: `
            <g v-if="item.images.length > 0" v-bind:class="{ 'is-active': active, 'is-current': active }" 
               v-on:click="select">
               <polygon v-if="item.polygon" v-bind:points="item.polygon"></polygon>
               <path v-if="item.path" v-bind:d="item.path"></path>
            </g>
        `,

        methods: {
            select() {
                Event.fire('hotspotSelected', this);
            }
        },

        created() {
            Event.listen('hotspotSelected', (data) => {

                this.active = false;

                if (this == data) {
                    data.active = true;
                }
            });

            Event.listen('mapDeselected', (data) => {
                this.active = false;
            });

            Event.listen('hotspotDeselected', (data) => {
                this.active = false;
            });

            Event.fire('hotspotCreated', this);
        }
    });

    Vue.component('map-item', {
        props: {
            map: {required: true},
        },

        data() {
            return {
                active: false,
                hotspots: [],
                hotspotsSlideshow: []
            }
        },

        template: `
            <div class="flex-item map-container"
                 v-bind:class="{ 'is-active': active }"
                 v-bind:style="{ left: map.left, top: map.top }"
                 >
                <svg class="map" xmlns="http://www.w3.org/2000/svg"
                     xmlns:xlink="http://www.w3.org/1999/xlink"
                     v-on:click="select"
                     v-bind:style="{ backgroundImage: 'url(dest/img/' + map.image + ')' }"
                     viewBox="0 0 1200 850">
                    <hotspot v-for="item in map.items" v-bind:item="item"></hotspot>
                </svg>
                <button v-if="active" class="close" v-on:click="deselect">&times;</button>
                <infobox v-if="active"></infobox>
            </div>
        `,

        methods: {
            select() {
                if (!this.active) {
                    Event.fire('mapSelected', this);
                }
            },

            deselect() {
                this.active = false;
                Event.fire('mapDeselected', this);
            }
        },

        created() {
            Event.fire('mapItemCreated', this);

            Event.listen('mapSelected', (data) => {
                this.active = false;

                if (this === data) {
                    data.active = true;
                }
            });

            Event.listen('hotspotCreated', (data) => {
                if (data.$parent == this) {
                    this.hotspots.push(data);
                }
            });
        }
    });

    Vue.component('map-list', {
        data() {
            return {
                maps: [],
                mapItems: [],
                mapItemsSlideshow: [],
                slideshow: false,
                slideshowEnabled: false,
                slideshowActive: false,
                slideshowDelay: 0,
                slideshowSpeed: 5000,
                timeoutSlideshow: null,
                timeoutMap: null,
                timeoutHotspot: null
            };
        },

        template: `
            <div class="flex-container holds-map">
                <!--<map-item v-for="map in maps" v-bind:map="map"></map-item>-->
                
                <div v-if="slideshowEnabled" class="autoplay">
                    <input type="checkbox" id="slideshow" v-model="slideshow">
                    <!--<label for="slideshow">autoplay</label>-->
                </div>

                <svg class="map" xmlns="http://www.w3.org/2000/svg"
                     xmlns:xlink="http://www.w3.org/1999/xlink"
                     viewBox="0 0 1200 850">
                     <hotspot v-for="map in maps" v-bind:item="map"></hotspot>
                </svg>
                
                <image-slideshow></image-slideshow>
            </div>
        `,

        created() {
            var self = this;

            Event.listen('loadedData', (data) => {

                this.maps = data.maps;

                // app.backgroundImage = data.backgroundImage;

                this.slideshowEnabled = data.slideshowEnabled;
                this.slideshow = data.slideshow;

                if (data.slideshowDelay) {
                    this.slideshowDelay = data.slideshowDelay;
                }

                if (data.slideshowSpeed) {
                    this.slideshowSpeed = data.slideshowSpeed;
                }
            });

            Event.listen('mapItemCreated', (data) => {
                this.mapItems.push(data);
            });

            Event.listen('mapSelected', (data) => {
                if (this.slideshowActive) {
                    clearTimeout(this.timeoutMap);
                    clearTimeout(this.timeoutHotspot);

                    data.hotspotsSlideshow = data.hotspots.slice();

                    this.timeoutMap = setTimeout(function () {
                        data.hotspotsSlideshow[0].select();
                    }, this.slideshowDelay);
                }
            });

            Event.listen('hotspotSelected', (data) => {
                if (this.slideshowActive) {
                    clearTimeout(this.timeoutHotspot);

                    this.timeoutHotspot = setTimeout(function () {
                        data.$parent.hotspotsSlideshow.shift();

                        if (data.$parent.hotspotsSlideshow.length) {
                            data.$parent.hotspotsSlideshow[0].select();
                        } else {
                            data.$parent.deselect();
                        }
                    }, this.slideshowSpeed);
                }
            });

            Event.listen('mapDeselected', (data) => {
                if (this.slideshowActive) {

                    this.mapItemsSlideshow.shift();

                    if (this.mapItemsSlideshow.length) {
                        this.mapItemsSlideshow[0].select();
                    } else {
                        this.slideshowActive = false;
                        this.startSlideshow();
                    }
                }
            });
        },

        methods: {
            startSlideshow() {
                if (this.slideshow) {
                    var self = this;

                    if (!this.slideshowActive) {
                        this.slideshowActive = true;

                        clearTimeout(this.timeoutSlideshow);
                        clearTimeout(this.timeoutMap);
                        clearTimeout(this.timeoutHotspot);

                        this.timeoutSlideshow = setTimeout(function () {
                            // create a new copy of the original items
                            self.mapItemsSlideshow = self.mapItems.slice();

                            self.mapItemsSlideshow[0].select();
                        }, this.slideshowDelay);
                    }
                }
            },

            stopSlideshow() {
                this.slideshowActive = false;
                clearTimeout(this.timeoutSlideshow);
                clearTimeout(this.timeoutMap);
                clearTimeout(this.timeoutHotspot);
                // this.mapItemsSlideshow[0].deselect();
            }
        },

        watch: {
            slideshow (val) {
                if (val) {
                    this.startSlideshow();
                } else {
                    this.stopSlideshow();
                }
            }
        }

    });

    var app = new Vue({

        el: '#root',

        props: {
            backgroundImage: null,
        },

        data() {
            return {
                active: false
            }
        },

        mounted() {
            this.fetchData();

            Event.listen('hotspotSelected', (data) => {
                this.active = true;
            });

            Event.listen('hotspotDeselected', (data) => {
                this.active = false;
            });
        },

        methods: {
            fetchData: function (el) {

                if (window.config) {

                    if (window.config.backgroundImage) {
                        this.backgroundImage = window.config.backgroundImage;
                    }

                    Event.fire('loadedData', window.config);

                } else {
                    this.$http.get(filename)
                        .then(function (response) {
                            Event.fire('loadedData', response.data);
                            // console.log(response.data);
                        })
                        .catch(function (error) {
                            console.log(error);
                        });
                }

            }
        }

    });
};