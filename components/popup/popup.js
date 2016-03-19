'use strict';

const lodash = require('lodash');
const omit = lodash.omit;

const read = require('../../utils').read;
const getMods = require('../../utils/bem').getMods;

module.exports = function (params, data, interpolate) {
    const type = params.type;
    const mods = omit(params, ['type', 'channel']);

    const css = getMods('b-popup', mods);

    const contentHtml = read(`components/popup/popup_${type}.html`);

    return {
        content: () => interpolate(contentHtml, data),
        mods: css
    };
};
