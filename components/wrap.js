'use strict';

module.exports = function (params, data, interpolate) {
    const body = data[params.name];
    const container = data[params.container];

    const result = interpolate(container, {
        content: body
    }, undefined, __dirname);

    return interpolate(result, data, undefined, __dirname);
};
