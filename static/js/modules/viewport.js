'use strict';

var utils = require('../../../utils/static');
var debounce = utils.debounce;
var reverseObject = utils.reverseObject;

var $ = require('jQuery');

module.exports = function (params) {
    var $window = $(window);
    var width = $window.width();
    var body = this;

    var ranges = getRanges(params);
    var sizes = reverseObject(params);
    var classNames = Object.keys(params);
    var className = getClassName(width, sizes, ranges);

    updateClass(body, className, classNames);

    $window.resize(debounce(function () {
        width = $(this).width();
        className = getClassName(width, sizes, ranges);
        updateClass(body, className, classNames);
    }, 100));
};

function updateClass($elem, addClassName, removeClassNames) {
    removeClassNames.forEach(function (className) {
        $elem.removeClass(className);
    });

    $elem.addClass(addClassName);
}

/**
 * @private
 * @param {number} width
 * @param {object} sizes
 * @param {array} ranges
 * @return {string}
 */
function getClassName(width, sizes, ranges) {
    return sizes[ranges.reduce(function (max, cur) {
        return width >= max ? max : cur;
    })] || '';
}

/**
 * @private
 * @param {object} params
 * @return {array}
 */
function getRanges(params) {
    return Object.keys(params).map(function (key) {
        return params[key];
    }).sort(function (a, b) {
        return b - a;
    });
}
