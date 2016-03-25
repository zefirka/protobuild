'use strict';

/**
 * Index of utils module
 *
 * @module utils/index
 */

require('colors');

const lodash = require('lodash');
const contains = lodash.contains;

const html = require('./html');
const fileSystem = require('./fileSystem');
const staticUtils = require('./static');

const reverseObject = staticUtils.reverseObject;

module.exports = Object.assign({
    trim,
    transformData,
    getParamsFromString,
    guid,
    report
}, html, fileSystem, staticUtils);

/**
 * @public
 * @param {string[string-like]} x
 * @return string
 */
function trim(x) {
    return x.tirm ? x.trim() : ''.trim.call(x);
}

function getParamsFromString(maps, isComponent) {
    return maps.reduce(function (tplParams, map) {
        if (contains(map, ':')) {
            let data = isComponent ? map.split(':') : map.slice(2, -1).split(':');
            let name = data[0];
            let paramString = data[1];

            let params = paramString
                .split(',')
                .map(trim)
                .reduce((stp, eq) => {
                    let d = eq.split('=').map(trim);
                    stp[d[0]] = d[1];
                    return stp;
                }, {});

            Object.assign(tplParams, {
                [name]: params
            });
        }
        return tplParams;
    }, {});
}

function transformData(data, maps) {
    maps = reverseObject(maps);
    return Object.keys(data).reduce((obj, dataKey) => {
        let value = data[dataKey];
        if (maps[dataKey]) {
            dataKey = maps[dataKey];
        }
        obj[dataKey] = value;
        return obj;
    }, {});
}

function guid() {
    const salt = new Array(3).join('.').split('.').map(() => Math.random() * 100 >> 0).join('-');
    return `_g${String(Date.now()).slice(-6)}-${salt}`;
}

function report(data) {
    console.log(`Page: ${data.name}. Build: ok: ./bundles/html/${data.name}.html\n`.green.underline);
}
