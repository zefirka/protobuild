'use strict';

const fs = require('fs');
const join = require('path').join;
const toArray = require('lodash').toArray;

module.exports = {
    read,
    readDir,
    getStat
};

function promisify(async) {
    const args = toArray(arguments).slice(1);
    return new Promise(function (resolve, reject) {
        async.apply(null, args.concat(function (err, data) {
            if (err) {
                reject(err);
            }

            resolve(data);
        }));
    });
}

function read(url, async) {
    const adr = join(__dirname, '../', url);
    return async ?
        promisify(fs.readFile, adr, 'utf-8') :
        fs.readFileSync(adr, 'utf-8');
}

function readDir(dir, async) {
    const adr = join(__dirname, dir);
    return async ?
        promisify(fs.readdir, adr) :
        fs.readdirSync(adr);
}

function getStat(dir, async) {
    const adr = join(__dirname, dir);
    return async ?
        promisify(fs.stat, dir) :
        fs.statSync(adr);
}
