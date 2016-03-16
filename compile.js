'use strict';

const fs = require('fs');
const join = require('path').join;
const inject = require('mexna');

const lodash = require('lodash');
const contains = lodash.contains;
const isUndefined = lodash.isUndefined;
const isObject = lodash.isObject;

function interpolate(str, data) {
    const reg = /\$\{\w+\}/g;
    let maps = str.match(reg) || [];
    maps = maps.reduce(unique, []);

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

function unique(sum, c) {
    if (!contains(sum, c)) {
        sum.push(c);
    }

    return sum;
}

function read(url) {
    return fs.readFileSync(join(__dirname, url), 'utf-8');
}

let pages = fs.readdirSync(join(__dirname, './pages'));

pages.forEach(function (pageName) {
    var pageJson = JSON.parse(read(`./pages/${pageName}`));

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

function getScript(js) {
    return js.map(function (adr) {
        return `<script type="text/javascript" src="${join(__dirname, adr)}"></script>`;
    }).join('\n');
}

function getLink(css) {
    return css.map(function (adr) {
        return `<link rel="stylesheet" href="${join(__dirname, adr)}"></link>`;
    }).join('\n');
}
