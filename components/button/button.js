'use strict';

const lodash = require('lodash');
const omit = lodash.omit;

const getMods = require('../../utils/bem').getMods;

module.exports = function (params, data) {
    const mods = omit(params, ['typeAttr', 'type']);
    const css = getMods('b-popup-container', mods);

    return {
        text: params.text || data.text,
        mods: css
    };
};
