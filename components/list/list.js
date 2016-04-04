'use strict';

const lodash = require('lodash');
const get = lodash.get;

const fs = require('../../utils');
const read = fs.read;
const exists = fs.exists;

const Component = require('../Component');

module.exports = Component(function (params, data, interpolate) {
    const template = params.template || 'simple';
    const items = get(data, params.items) || [];
    const itemsClassName = params.itemClassName || data.itemClassName;
    const source = `./components/list/${template}.template.html`;
    const templateHtml = exists(source) ? read(source) : data[template];

    const content = items.map(item => {
        item.className = itemsClassName;

        if (item.active) {
            item.className += params.activeClassName || ' b-list__item_acitve';
        }

        return interpolate(templateHtml, item, undefined, './components/list') ;
    }).join('\n');

    return {
        listBody: content
    };
});
