'use strict';

const read = require('../utils/fileSystem').read;

module.exports = function (params, data, interpolate) {
    const page = typeof data.page === 'string' ? data.page : (data.page.value || data.page);

    if (page) {
        const src = `./declarations/${page}.html`;
        let html;

        try {
            html = read(src);
        } catch (e) {
            html = `<div class="b-warning">Page ${page} not found</div>`;
        }
        return interpolate(html, data, undefined, src);
    }

    return '';
};
