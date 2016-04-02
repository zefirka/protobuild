'use strict';

const lodash = require('lodash');
const omit = lodash.omit;

const compileComponent = require('../builder').compileComponent;

module.exports = function (params, data, interpolate) {
    const body = data[params.name];
    let container = data[params.container];

    const innerParams = omit(params, ['name', 'container']);

    const wrappedParams = Object.keys(innerParams).reduce((sum, paramName) => {
        let innerParam = innerParams[paramName];
        if (data[innerParam]) {
            sum[paramName] = data[innerParam];
        }
        return sum;
    }, {});

    if (!container) {
        container = compileComponent(params.container, data, params, interpolate);
    }

    const result = interpolate(container, Object.assign({
        content: body
    }, innerParams, wrappedParams), undefined, './components');

    return interpolate(result, data, undefined, './components');
};
