'use strict';

const fs = require('fs');
const join = require('path').join;
const html = require('./html');

module.exports = Object.assign({
    read,
    trim
}, html);

function read(url) {
    return fs.readFileSync(join(__dirname, '../', url), 'utf-8');
}

function trim(x) {
    return x.tirm ? x.trim() : ''.trim.call(x);
}
