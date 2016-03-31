'use strict';

const read = require('../utils/fileSystem').read;

module.exports = function (params, data, interpolate) {
    const page = data.value;
    console.log('page', page);
    if (page) {
        const src = `./declarations/${page}.html`;
        const html = read(src);
        return interpolate(html, data, undefined, src);
    }

    return '';
};
