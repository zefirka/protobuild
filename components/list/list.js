'use strict';

const lodash = require('lodash');
const get = lodash.get;

const read = require('../../utils').read;

const LINK_START = '<a href=${src} class="b-link">';
const LINK_END = '</a>';

module.exports = function (params, data, interpolate) {
    const template = params.template || 'simple';
    const items = get(data, params.items) || [];
    const itemsClassName = params.itemClassName || data.itemClassName;

    const templateHtml = read(`components/list/${template}.template.html`);
    const content = items.map(item => {
        let link = item.src;

        item.css = itemsClassName;

        if (link) {
            item['link-start'] = interpolate(LINK_START, item);
            item['link-end'] = LINK_END;
        }

        return interpolate(templateHtml, Object.assign({}, data, item)) ;
    }).join('\n');

    return {
        content: content,
        className: params.className || data.className
    };
};
