'use strict';

/**
 * Index of utils module
 *
 * @module utils/index
 */

const html = require('./html');
const fileSystem = require('./fileSystem');

module.exports = Object.assign({
    trim
}, html, fileSystem);

/**
 * @public
 * @param {string[string-like]} x
 * @return string
 */
function trim(x) {
    return x.tirm ? x.trim() : ''.trim.call(x);
}
