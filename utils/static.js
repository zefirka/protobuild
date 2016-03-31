'use strict';

module.exports = {
    reverseObject,
    guid,
    debounce
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

/**
 * @public
 * @param {number} l
 * @return {string}
 */
function guid(l) {
    const salt = new Array(l || 3)
        .join('.')
        .split('.')
        .map(function () {
            return Math.random() * 100 >> 0;
        })
        .join('-');

    return '_g' + String(Date.now()).slice(-6) + '-' + salt;
}

/**
 * @public
 * @param {function} fn
 * @param {number} timeout
 * @return {function}
 */
function debounce(fn, timeout) {
    var t;
    return function () {
        if (t) {
            clearTimeout(t);
        }
        t = setTimeout(fn, timeout);
    };
}
