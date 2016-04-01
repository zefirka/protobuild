'use strict';

const Component = require('../Component');

module.exports = Component(function (params, data) {
    return {
        text: params.text || data.text,
    };
});
