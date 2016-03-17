'use strict';

module.exports = function (params) {
    this.find('li').eq(Number(params.li) || 0).css('color', 'red');
    return true;
};
