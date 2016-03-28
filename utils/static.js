'use strict';

module.exports = {
    reverseObject
};

/**
 * Reversing keys with values in given object
 *
 * @public
 * @param {object} params
 * @return {object}
 */
function reverseObject(params) {
    return Object.keys(params).reduce(function (sum, name) {
        sum[params[name]] = name;
        return sum;
    }, {});
}
