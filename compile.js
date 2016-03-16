'use strict';

const fs = require('fs');
const join = require('path').join;
const inject = require('mexna');

const lodash = require('lodash');
const isUndefined = lodash.isUndefined;
const isObject = lodash.isObject;
const uniq    = lodash.uniq;

const utils = require('./utils/');
const getScript = utils.getScript;
const getLink = utils.getLink;
const read = utils.read;

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
    const reg = /\$\{\w+\}/g;
    let maps = uniq(str.match(reg) || []);

    data = data || {};
    data = Object.assign({}, data, maps.reduce(function (map, component) {
        component = component.slice(2, -1);
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
                let newData = Object.assign({}, data, additionalData);
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

    return inject(str, {keys: data});
}
