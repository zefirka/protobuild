'use strict';

const read = require('../utils/fileSystem').read;

module.exports = function (params, data, interpolate) {
    const page = data.value;
    if (page) {
        const html = read(`./declarations/${page}.html`);
        return interpolate(html, data);
    }

    return '';
};
