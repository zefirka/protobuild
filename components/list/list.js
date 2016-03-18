'use strict';

const read = require('../../utils').read;

module.exports = function (params, data, interpolate) {
    const template = params.template;
    const items = data[params.items] || [];

    const templateHtml = read(`components/list/${template}.template.html`);
    const content = items.map(function (item) {
        return interpolate(templateHtml, Object.assign({}, data, item)) ;
    }).join('\n');

    return {
        content: content
    };
};
