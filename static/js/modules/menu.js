'use strict';

var bem = require('../bemify');

module.exports = function () {
    var nav = bem(this).block('b-nav');
    var dropdownBtn = nav.find('.js-down');
    var menu = nav.find('.b-nav__list');

    dropdownBtn.click(function () {
        menu.slideToggle();
    });
};
