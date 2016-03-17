'use strict';

const fs = require('fs');
const join = require('path').join;
const inject = require('mexna');

const lodash = require('lodash');
const isUndefined = lodash.isUndefined;
const isObject = lodash.isObject;
const uniq    = lodash.uniq;
const contains = lodash.contains;

const utils = require('./utils/');
const getScript = utils.getScript;
const getLink = utils.getLink;
const read = utils.read;
const trim = utils.trim;

let pages = fs.readdirSync(join(__dirname, './pages'));

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

    fs.writeFile(`./bundles/html/${pageJson.name}.html`, page, function (err) {
        if (err) {
            throw new Error(err);
        }
    });
});

function interpolate(str, data) {
    const reg = /\$\{[\w\:,\=\-\s]+\}/g;

    let maps = uniq(str.match(reg) || []);

    let templateParams = getParams(str);

    data = data || {};
    data = Object.assign({}, data, maps.reduce(function (map, component) {
        component = component.slice(2, -1);
        if (contains(component, ':')) {
            component = component.split(':')[0];
        }

        let dataComponent = data[component];
        let decl;
        let comp;

        if (isUndefined(dataComponent) || dataComponent === true || isObject(dataComponent)) {
            let additionalData = {};
            if (isObject(dataComponent)) {
                Object.assign(additionalData, dataComponent);
            }

            try {
                decl = read(`./declarations/${component}.html`);
                let newData = Object.assign({}, data, additionalData);
                decl = interpolate(decl, newData);
            } catch (e) {

            }

            try {
                comp = read(`./components/${component}.html`);
                let newData = Object.assign({}, data, additionalData, templateParams[component]);
                comp = interpolate(comp, newData);
            } catch (e) {

            }

            map[component] = decl || comp || '';
        }

        if (dataComponent === false) {
            map[component] = '';
        }

        return map;
    }, {}));

    return inject(str, {regex: /\$\{(.+?)(\:.+\}|\})/g, keys: data});
}

function getParams(str) {
    const reg = /\$\{[\w\:,\=\-\s]+\}/g;
    let maps = uniq(str.match(reg) || []);

    return maps.reduce(function (tplParams, map) {
        if (contains(map, ':')) {
            let data = map.slice(2, -1).split(':');
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
