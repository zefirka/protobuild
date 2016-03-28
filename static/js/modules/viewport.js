'use strict';

var $ = require('jQuery');

module.exports = function (params) {
    var $window = $(window);
    var width = $window.width();
    var body = this;

    var ranges = getRanges(params);
    var sizes = revert(params);
    var classNames = Object.keys(params);
    var className = getClassName(width, sizes, ranges);

    updateClass(body, className, classNames);

    $window.resize(function () {
        width = $(this).width();
        className = getClassName(width, sizes, ranges);
        updateClass(body, className, classNames);
    });

};

function updateClass($elem, addClassName, removeClassNames) {
    removeClassNames.forEach(function (className) {
        $elem.removeClass(className);
    });

    $elem.addClass(addClassName);
}

function getClassName(width, sizes, ranges) {
    return sizes[ranges.reduce(function (max, cur) {
        return width >= max ? max : cur;
    })] || '';
}

function getRanges(params) {
    return Object.keys(params).map(function (key) {
        return params[key];
    }).sort(function (a, b) {
        return b - a;
    });
}

function revert(params) {
    return Object.keys(params).reduce(function (sum, name) {
        sum[params[name]] = name;
        return sum;
    }, {});
}
