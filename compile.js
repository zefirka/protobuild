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
const comment = utils.comment;
const transformData = utils.transformData;
const getParamsFromString = utils.getParamsFromString;
const guid = utils.guid;
const report = utils.report;
const stripComments = utils.stripComments;
const restripComments = utils.restripComments;

const protobuilder = require('./builder');
const compileComponent = protobuilder.compileComponent;
const importer = protobuilder.importer;

readDir('../pages', true).then(pages => {
    pages.forEach(pageName => {
        let page = null;
        let pageData = require(`./pages/${pageName}`);
        const src = `./declarations/${pageData.entry}.html`;
        let entry = read(src);

        let js = getScript(pageData.js);
        let css = getLink(pageData.css);

        let data = Object.assign({
            js: js,
            css: css,
        }, pageData.data);

        try {
            page = interpolate(entry, data, undefined, src);
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
            report(pageData);
        });
    });
}).catch(error => {
    console.error(error);
});

function interpolate(str, data, outherComponentParams, path) {
    /* Regular Expression */
    const templateRegEx = /#{template:[\s\w\-]+}([\s\w.<>\${}\/"\'\!\@\^\*\;.~:=\-…\,а-яА-Я–]+)#{\/template}/g;
    const searchRegEx = /\$\{[\w\:,\=\#\[\]\-\s\.\/\"\']+\}/g;
    const parseRegEx = /\$\{(.+?)(\:.+\}|\})/g;

    str = importer(str, path);

    let stringTemplates = {};

    str = str.replace(templateRegEx, (template, body) => {
        let desription = template.match(/#{template:\s?([\w\-]+)}/g);
        let title = null;

        if (desription) {
            title = desription.pop().slice(2, -1).split(':').pop();
        } else {
            throw new Error(`Wrong template: ${template}`);
        }

        stringTemplates[title] = body;
        return '';
    });

    /* Comments */
    const stripData = stripComments(str);
    const comments = stripData.comments;

    str = stripData.str;

    data = Object.assign({}, data || {}, stringTemplates);

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
        let componentParams = outherComponentParams || {};
        let decl;
        let comp;
        let src;
        let componentName = component.slice(2, -1);

        component = aliases[componentName];

        if (contains(component, ':')) {
            componentParams = getComponentParams(component);
            component = component.split(':')[0].trim();
        }

        /**
         * In case of component's param default equals to 'false' should return empty string to not interpolate
         */
        if (componentParams.default === 'false' && !transformedData[component]) {
            map[componentName] = '';
            return map;
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
                decl = interpolate(decl, newData, undefined, src);
            } catch (e) {}

            try {
                comp = compileComponent(component,
                    Object.assign({}, data, additionalData),
                    Object.assign({}, templateParams[component], componentParams),
                    interpolate);
            } catch (e) {}

            map[componentName] = decl || comp || '';
        }

        if (dataComponent === false) {
            map[componentName] = '';
        }

        return map;
    }, {}));

    let compiledString = inject(parsed, {
        regex: parseRegEx,
        keys: interpolationData
    });

    return restripComments(compiledString, comments || []);
}

function getComponentParams(component) {
    const reg = /[\w\:,\=\-\#\[\]\s\.\"\']+/g;
    const maps = uniq(component.match(reg) || []);
    const t = getParamsFromString(maps, true);
    return t[Object.keys(t).pop()];
}

function getParams(str) {
    const reg = /\$\{[\w\:,\=\-\#\[\]\s\.\"\']+\}/g;
    const maps = uniq(str.match(reg) || []);

    return getParamsFromString(maps);
}
