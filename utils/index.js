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
    report
}, html, fileSystem, staticUtils);

/**
 * @public
 * @param {string|array} x
 * @return string
 */
function trim(x) {
    return x.tirm ? x.trim() : ''.trim.call(x);
}

/**
 * @public
 * @param {array} maps
 * @param {boolean} isComponent
 * @return {object}
 */
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
                    let value;
                    try {
                        value = JSON.parse(d[1]);
                    } catch (e) {
                        value = d[1];
                    }
                    stp[d[0]] = value;
                    return stp;
                }, {});

            Object.assign(tplParams, {
                [name]: params
            });
        }
        return tplParams;
    }, {});
}

/**
 * @public
 * @param {object} data
 * @param {object} maps
 * @return {object}
 */
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

/**
 * Reporter
 *
 * @public
 * @param {object} data
 */
function report(data) {
    console.log(`Page: ${data.name}. Build: ok: ./bundles/html/${data.name}.html\n`.green.underline);
}
