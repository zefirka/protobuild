'use strict';

require('jquery-sticky');

module.exports = function (elem, params) {
    elem.sticky({
        topSpacing: Number(params ? params.top : 0)
    });
};
