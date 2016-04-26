'use strict';

var isMobile = window.navigator.userAgent.match(/(iPad)|(iPhone)|(iPod)|(android)|(webOS)/i);

module.exports = function () {
    if (isMobile) {
        this.find('body').addClass('g-mobile');
    }
};
