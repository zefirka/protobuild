#!/usr/bin/env node

'use strict';

const fs = require('fs');
const inject = require('mexna');
const beautify = require('js-beautify').html;

const lodash = require('lodash');
const isUndefined = lodash.isUndefined;
const isObject = lodash.isObject;
const uniq = lodash.uniq;
const contains = lodash.contains;

const utils = require('./utils/');
const getScript = utils.getScript;
const getLink = utils.getLink;
const read = utils.read;
const trim = utils.trim;
const readDir = utils.readDir;
const getStat = utils.getStat;

readDir('../pages', true).then(function (pages) {
    pages.forEach(function (pageName) {
        var pageJson = require(`./pages/${pageName}`);
        let entry = read(`./declarations/${pageJson.entry}.html`);

        let js = getScript(pageJson.js || []);
        let css = getLink(pageJson.css || []);

        let data = Object.assign({
            js: js,
            css: css,
        }, pageJson.data);

        let page = interpolate(entry, data);

        page = beautify(page, {
            indent_size: 2
        });

        fs.writeFile(`./bundles/html/${pageJson.name}.html`, page, function (err) {
            if (err) {
                throw new Error(err);
            }
        });
    });
});

function guid() {
    const salt = new Array(3).join('.').split('.').map(() => Math.random() * 100 >> 0).join('-');
    return `_g${String(Date.now()).slice(-6)}-${salt}`;
}

function interpolate(str, data) {
    data = data || {};

    const searchRegEx = /\$\{[\w\:,\=\-\s]+\}/g;
    const parseRegEx = /\$\{(.+?)(\:.+\}|\})/g;

    let parsed = str;
    let maps = uniq(str.match(searchRegEx) || []);
    let templateParams = getParams(str);

    let aliases = maps.reduce(function (sum, map) {
        const interpolant = map.slice(2, -1);
        const name = interpolant.split(':')[0];
        let nova = name + guid();
        try {
            parsed = parsed.replace(map, '${' + nova + '}');
        } catch (err) {
            console.log('---------->\n\n');
            console.log(err);
            throw err;
        }
        sum[nova] = interpolant;
        return sum;
    }, {});

    let newMaps = parsed.match(searchRegEx) || [];
    let transformedData = getTransformedData(data, aliases);

    let interpolationData = Object.assign({}, transformedData, newMaps.reduce(function (map, component) {
        let componentName = component.slice(2, -1);
        component = aliases[componentName];
        let componentParams = {};

        if (contains(component, ':')) {
            componentParams = getComponentParams(component);
            component = component.split(':')[0].trim();
        }

        let dataComponent = data[component];
        let decl;
        let comp;
        let src;

        if (isUndefined(dataComponent) || dataComponent === true || typeof dataComponent === 'object') {
            let additionalData = {};

            if (isObject(dataComponent)) {
                Object.assign(additionalData, dataComponent);
            }

            try {
                src = `./declarations/${component}.html`;
                decl = read(src);
                let newData = Object.assign({}, data, additionalData);
                decl = comment(component, 'declaration', src) + decl;
                decl = interpolate(decl, newData);
            } catch (e) {}

            try {
                comp = compileComponent(component,
                    Object.assign({}, data, additionalData),
                    Object.assign({}, templateParams[component], componentParams));
            } catch (e) {}

            map[componentName] = decl || comp || '';
        }

        if (dataComponent === false) {
            map[componentName] = '';
        }

        return map;
    }, {}));

    return inject(parsed, {regex: parseRegEx, keys: interpolationData});
}

function getTransformedData(data, maps) {
    maps = revert(maps);
    return Object.keys(data).reduce((obj, dataKey) => {
        let value = data[dataKey];
        if (maps[dataKey]) {
            dataKey = maps[dataKey];
        }
        obj[dataKey] = value;
        return obj;
    }, {});
}

function compileComponent(name, data, componentParams) {
    let markup = '';
    let stat = null;
    let summaryData = Object.assign({}, data);

    try {
        stat = getStat(`../components/${name}`);

        if (stat.isDirectory()) {
            let files = readDir(`../components/${name}`);
            let index = contains(files, `${name}.html`);
            let hasJs = contains(files, `${name}.js`);
            let compiler;
            let src;

            if (!index) {
                console.error('no index');
                return null;
            }

            if (hasJs) {
                compiler = require(`./components/${name}/${name}.js`);
                src = `./components/${name}/${name}.html`;
                markup = read(src);
                markup = comment(name, 'component', src, 'start') + markup + comment(name, 'component', src, 'end');
                Object.assign(summaryData, componentParams, compiler(componentParams, summaryData, interpolate));
                return interpolate(markup, summaryData);
            }
        }
    } catch (error) {
        markup = read(`./components/${name}.html`);
        return interpolate(markup, Object.assign(summaryData, componentParams));
    }
}

function getComponentParams(component) {
    const reg = /[\w\:,\=\-\s]+/g;
    const maps = uniq(component.match(reg) || []);
    const t = paramify(maps, true);
    return t[Object.keys(t).pop()];
}

function getParams(str) {
    const reg = /\$\{[\w\:,\=\-\s]+\}/g;
    const maps = uniq(str.match(reg) || []);

    return paramify(maps);
}

function paramify(maps, component) {
    return maps.reduce(function (tplParams, map) {
        if (contains(map, ':')) {
            let data;
            if (component) {
                data = map.split(':');
            } else {
                data = map.slice(2, -1).split(':');
            }

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

function comment(name, type, src, desc) {
    return `<!-- ${type}: ${name} ## ${src} ${desc || ''} -->
`;
}

function revert(params) {
    return Object.keys(params).reduce(function (sum, name) {
        sum[params[name]] = name;
        return sum;
    }, {});
}
