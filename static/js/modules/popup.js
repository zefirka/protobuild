'use strict';

var channel = require('../channel');
var stream = channel.popup;

var popup = null;
var timeout = 100;

module.exports = function (params) {
    popup = this.bem('b-popup');
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
    popup.delMod('closed');

    setTimeout(function () {
        popup.delMod('hidden');
        popup.setMod('shown');
    }, timeout);
}

function hide() {
    popup.delMod('shown');
    popup.setMod('hidden');

    setTimeout(function () {
        popup.setMod('closed');
    }, timeout);
}
