'use strict';

const fs = require('fs');
const join = require('path').join;
const html = require('./html');

module.exports = Object.assign({read}, html);

function read(url) {
    return fs.readFileSync(join(__dirname, '../', url), 'utf-8');
}
