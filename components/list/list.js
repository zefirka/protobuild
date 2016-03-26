'use strict';

const lodash = require('lodash');
const get = lodash.get;

const read = require('../../utils').read;

module.exports = function (params, data, interpolate) {
    const template = params.template || 'simple';
    const items = get(data, params.items) || [];
    const itemsClassName = params.itemClassName || data.itemClassName;

    const templateHtml = read(`components/list/${template}.template.html`);
    const content = items.map(item => {
        item.css = itemsClassName;
        return interpolate(templateHtml, Object.assign({}, data, item)) ;
    }).join('\n');

    return {
        content: content,
        className: params.className
    };
};
