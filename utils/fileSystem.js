'use strict';

const fs = require('fs');
const join = require('path').join;

const lodash = require('lodash');
const toArray = lodash.toArray;
const memoize = lodash.memoize;

module.exports = {
    read: memoize(read),
    readDir: memoize(readDir),
    getStat: memoize(getStat),
    exists
};

/**
 * @private
 * @param {function} action
 * @param {*} params[1-n]
 * @return {Promise}
 */
function _promisify(action /* params */) {
    const args = toArray(arguments).slice(1);
    return new Promise((resolve, reject) => {
        action.apply(null, args.concat((err, data) => {
            if (err) {
                reject(err);
            }

            resolve(data);
        }));
    });
}

/**
 * @public
 * @param {string} dir
 * @param {boolean} async
 * @return {string|Promise}
 */
function read(url, async) {
    const adr = join(__dirname, '../', url);
    return async ?
        _promisify(fs.readFile, adr, 'utf-8') :
        fs.readFileSync(adr, 'utf-8');
}

/**
 * @public
 * @param {string} dir
 * @param {boolean} async
 * @return {string|Promise}
 */
function readDir(dir, async) {
    const adr = join(__dirname, dir);
    return async ?
        _promisify(fs.readdir, adr) :
        fs.readdirSync(adr);
}

/**
 * @public
 * @param {string} dir
 * @param {boolean} async
 * @return {string|Promise}
 */
function getStat(dir, async) {
    const adr = join(__dirname, dir);
    return async ?
        _promisify(fs.stat, dir) :
        fs.statSync(adr);
}

/**
 * @public
 * @param {string} path
 * @return {boolean}
 */
function exists(path) {
    try {
        fs.accessSync(join(__dirname, '../', path), fs.F_OK);
        return true;
    } catch (e) {
        return false;
    }
}
