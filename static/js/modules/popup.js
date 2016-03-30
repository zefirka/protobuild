'use strict';

var $ = require('jQuery');
var channel = require('../channel');
var stream = channel.popup;

module.exports = function (params) {
    var popup = null;
    var timeout = Number(params.timeout) || 100;

    var blocksToDistant = [
        $('.b-page'),
        $('.b-footer')
    ];

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
            blocksToDistant.forEach(function (block) {
                block.addClass('distant');
            });
            popup.delMod('hidden');
            popup.setMod('shown');
        }, timeout);
    }

    function hide() {
        popup.delMod('shown');
        popup.setMod('hidden');

        setTimeout(function () {
            blocksToDistant.forEach(function (block) {
                block.removeClass('distant');
            });
            popup.setMod('closed');
        }, 1.5 * timeout);
    }
};
