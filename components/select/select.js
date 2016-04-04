'use strict';

const read = require('../../utils/fileSystem').read;

const get = require('lodash').get;

module.exports = function (params, data, interpolate) {

    const options = (get(data, params.options) || (Array.isArray(params.options) ? params.options : []))
        .map(option => interpolate(read('./components/select/option.html'), option))
        .join('\n');

    return {
        options
    };
};
