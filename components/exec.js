'use strict';

module.exports = function (params, data, interpolate) {
    let tpl = data[params.template];

    return interpolate(tpl, data);
};
