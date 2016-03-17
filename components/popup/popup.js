'use strict';

const lodash = require('lodash');
const omit = lodash.omit;

const read = require('../../utils').read;

module.exports = function (params, data, interpolate) {
    const type = params.type;
    const mods = omit(params, ['type', 'channel']);

    const css = Object.keys(mods).map(function (mod) {
        if (mods[mod] === 'true') {
            return `b-popup_${mod}`;
        }
        return null;
    }).filter(Boolean).join(' ');

    const contentHtml = read(`components/popup/popup_${type}.html`);

    return {
        content: () => interpolate(contentHtml, data),
        mods: css
    };
};
