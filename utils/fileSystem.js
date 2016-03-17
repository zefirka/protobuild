'use strict';

const fs = require('fs');
const join = require('path').join;

module.exports = {
    read,
    readDir,
    getStat
};

function read(url) {
    return fs.readFileSync(join(__dirname, '../', url), 'utf-8');
}

function readDir(dir) {
    return fs.readdirSync(join(__dirname, dir));
}

function getStat(dir) {
    return fs.statSync(join(__dirname, dir));
}
