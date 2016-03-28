'use strict';

const lodash = require('lodash');
const omit = lodash.omit;

const getMods = require('../../utils/bem').getMods;

module.exports = function (params, data) {
    const container = params.container;
    const mods = omit(params, ['container', 'typeAttr', 'type']);
    const css = getMods('b-popup-container', mods);

    return {
        'container-start': container ? `<${container} class="b-button-container ${css}">` : '',
        'container-end': container ? `</${container}>` : '',
        text: params.text || data.text
    };
};
