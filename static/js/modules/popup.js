'use strict';

var channel = require('../channel');
var stream = channel.popup;

var popup = null;
var timeout = 100;

module.exports = function (params) {
    popup = this;
    timeout = params.timeout;

    stream
        .reveals
        .get(params.channel)
        .listen(show);

    channel
        .document
        .key(27)
        .listen(hide);
};

function show() {
    popup.removeClass('b-popup_closed');

    setTimeout(function () {
        popup.removeClass('b-popup_hidden');
        popup.addClass('b-popup_shown');
    }, timeout);
}

function hide() {
    popup.removeClass('b-popup_shown');
    popup.addClass('b-popup_hidden');

    setTimeout(function () {
        popup.addClass('b-popup_closed');
    }, timeout);
}
