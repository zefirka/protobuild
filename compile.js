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
const readDir = utils.readDir;
const getStat = utils.getStat;
const comment = utils.comment;
const transformData = utils.transformData;
const getParamsFromString = utils.getParamsFromString;
const guid = utils.guid;

readDir('../pages', true).then(pages => {
    pages.forEach(pageName => {
        let page = null;
        let pageData = require(`./pages/${pageName}`);
        let entry = read(`./declarations/${pageData.entry}.html`);

        let js = getScript(pageData.js);
        let css = getLink(pageData.css);

        let data = Object.assign({
            js: js,
            css: css,
        }, pageData.data);

        try {
            page = interpolate(entry, data);
        } catch (error) {
            throw new Error(error);
        }

        page = beautify(page, {
            indent_size: 4
        });

        fs.writeFile(`./bundles/html/${pageData.name}.html`, page, err => {
            if (err) {
                throw new Error(err);
            }
            console.log(`Page ${pageData.name} successfully compiled!`);
        });
    });
}).catch(error => {
    console.error(error);
});

function interpolate(str, data) {
    data = data || {};

    const searchRegEx = /\$\{[\w\:,\=\-\s]+\}/g;
    const parseRegEx = /\$\{(.+?)(\:.+\}|\})/g;

    let parsed = str;
    let maps = uniq(str.match(searchRegEx) || []);
    let templateParams = getParams(str);

    let aliases = maps.reduce((sum, map) => {
        const interpolant = map.slice(2, -1);
        const name = interpolant.split(':')[0];
        let nova = name + guid();

        try {
            parsed = parsed.replace(map, '${' + nova + '}');
        } catch (err) {
            console.log(err);
            throw err;
        }

        sum[nova] = interpolant;
        return sum;
    }, {});

    let newMaps = parsed.match(searchRegEx) || [];
    let transformedData = transformData(data, aliases);

    let interpolationData = Object.assign({}, transformedData, newMaps.reduce(function (map, component) {
        let componentParams = {};
        let decl;
        let comp;
        let src;
        let componentName = component.slice(2, -1);

        component = aliases[componentName];

        if (contains(component, ':')) {
            componentParams = getComponentParams(component);
            component = component.split(':')[0].trim();
        }

        let dataComponent = data[component];

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
    const t = getParamsFromString(maps, true);
    return t[Object.keys(t).pop()];
}

function getParams(str) {
    const reg = /\$\{[\w\:,\=\-\s]+\}/g;
    const maps = uniq(str.match(reg) || []);

    return getParamsFromString(maps);
}

