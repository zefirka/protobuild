'use strict';

var channel = require('../channel');

module.exports = function (params) {
    var elem = params.elem ? this.find(params.elem) : this;

    elem.click(function () {
        channel.emit(params.channel, {
            type: params.channel,
            value: params.value
        });
    });
};
