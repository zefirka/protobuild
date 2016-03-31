'use strict';

const lodash = require('lodash');
const omit = lodash.omit;

module.exports = function (params, data, interpolate) {
    const body = data[params.name];
    const container = data[params.container];
    const innerParams = omit(params, ['name', 'container']);

    const result = interpolate(container, Object.assign({
        content: body
    }, innerParams), undefined, __dirname);

    return interpolate(result, data, undefined, __dirname);
};
