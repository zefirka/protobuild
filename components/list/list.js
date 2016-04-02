'use strict';

const lodash = require('lodash');
const get = lodash.get;

const read = require('../../utils').read;

const Component = require('../Component');

module.exports = Component(function (params, data, interpolate) {
    const template = params.template || 'simple';
    const items = get(data, params.items) || [];
    const itemsClassName = params.itemClassName || data.itemClassName;

    const templateHtml = read(`components/list/${template}.template.html`);
    const content = items.map(item => {
        item.className = itemsClassName;

        if (item.active) {
            item.className += ' b-list__item_acitve';
        }

        return interpolate(templateHtml, item, undefined, './components/list') ;
    }).join('\n');

    return {
        listBody: content
    };
});
