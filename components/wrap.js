'use strict';

const lodash = require('lodash');
const omit = lodash.omit;

const compileComponent = require('../builder').compileComponent;

module.exports = function (params, data, interpolate) {
    const body = data[params.name];
    let container = data[params.container];
    const innerParams = omit(params, ['name', 'container']);

    if (!container) {
        container = compileComponent(params.container, data, params, interpolate);
    }

    const result = interpolate(container, Object.assign({
        content: body
    }, innerParams), undefined, __dirname);

    return interpolate(result, data, undefined, __dirname);
};
