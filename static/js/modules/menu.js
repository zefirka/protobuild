'use strict';

var bem = require('../bemify');

var DOWN = 'b-nav__dropdown_down';
var UP = 'b-nav__dropdown_up';

var sticky = require('./sticky');

module.exports = function () {
    var nav = bem(this).block('b-nav');
    nav.state = false;
    var dropdownBtn = nav.find('.b-nav__dropdown');
    var menu = nav.find('.b-nav__list');

    dropdownBtn.click(function () {
        menu.slideToggle();
        redraw(dropdownBtn, nav.state);
        nav.state = !nav.state;
    });

    sticky(nav);
};

/**
 * @private
 * @param {jQuery} btn
 * @param {boolean} state
 */
function redraw(btn, state) {
    btn.removeClass(DOWN).removeClass(UP);
    btn.addClass(state ? DOWN : UP);
}
