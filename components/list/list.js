'use strict';

const lodash = require('lodash');
const omit = lodash.omit;

const read = require('../../utils').read;

module.exports = function (params, data, interpolate) {
    const template = params.template;
    const items = data[params.items] || [];
    const mods = omit(params, ['items', 'template']);

    const templateHtml = read(`components/list/${template}.template.html`);
    const content = items.map(item => {
        return interpolate(templateHtml, Object.assign({}, data, item)) ;
    }).join('\n');

    return {
        content: content,
        mods: mods
    };
};
