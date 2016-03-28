'use strict';

var channel = require('../channel');
var stream = channel.popup;

module.exports = function (params) {
    var popup = null;
    var timeout = 100;

    popup = this.block('b-popup');

    timeout = params.timeout || timeout;

    stream
        .reveals
        .get(params.channel)
        .listen(show);

    channel
        .document
        .key(27)
        .listen(hide);

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
        }, 1.5 * timeout);
    }
};
