'use strict';

module.exports.reverseObject = reverseObject;

function reverseObject(params) {
    return Object.keys(params).reduce(function (sum, name) {
        sum[params[name]] = name;
        return sum;
    }, {});
}
