'use strict';

const read = require('../../utils/fileSystem').read;

module.exports = function (params, data, interpolate) {

    const options = data[params.options]
        .map(option => interpolate(read('./components/select/option.html'), option))
        .join('\n');

    return {
        options
    };
};
