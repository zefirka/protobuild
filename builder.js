'use strict';

module.exports = {
    compileComponent,
    importer
};

const fs = require('./utils/fileSystem');
const read = fs.read;
const getStat = fs.getStat;
const readDir = fs.readDir;

const join = require('path').join;

const lodash = require('lodash');
const contains = lodash.contains;

const utils = require('./utils/');
const comment = utils.comment;

function compileComponent(name, data, componentParams, interpolate) {
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
                return interpolate(markup, summaryData, undefined, src);
            }
        }
    } catch (error) {
        let src;
        try {
            src = `./components/${name}.html`;
            markup = read(src);
        } catch (e) {
            src = `./components/${name}.js`;
            markup = require(src);
            markup = markup(componentParams, summaryData, interpolate);
        }

        return interpolate(markup, Object.assign(summaryData, componentParams, src));
    }
}

function importer(str, path) {
    const includeRegEx = /#include\s*['"]([-_\.\w\/\d]+)['"];\n/g;
    const importRegEx = /#import\s*([\w\d\-_\s,]+)\s*from\s*['"]([\.\w\/\d]+)['"];/g;
    return str.replace(includeRegEx, (template, url) => {
        const tpl = join(path.split('/').slice(0, -1).join('/'), url);
        let body;
        try {
            body = read(tpl);
        } catch (e) {
            console.log(e);
            return e;
        }
        return body;
    }).replace(importRegEx, (template, name, url) => {
        let names = [];

        if (contains(name, ',')) {
            names = name.split(',').map(s => s.trim());
        } else {
            names = [name.trim()];
        }

        const tpl = join(path.split('/').slice(0, -1).join('/'), url);
        let body;

        try {
            body = read(tpl);
        } catch (e) {
            console.log(e);
            return e;
        }

        return names.map(tplName => {
            return getTemplatesFromBody(body)[tplName] || warning(`Template: "${tplName}" not found in ${tpl}`);
        }).join('\n');
    });
}

function getTemplatesFromBody(body) {
    const templateRegEx = /#{template:[\s\w\-_]+}([\s\w.<>\${}\/"\'\!\@\^\*\;.~:=\-…\,а-яА-Я–]+)#{\/template}/g;

    let tpls = {};
    let matches = body.match(templateRegEx);
    if (matches) {
        tpls = matches.reduce((sum, match) => {
            let name = match
                .match(/#{template:([\w\d\-_]+)}/g)
                .pop()
                .slice(2, -1)
                .split(':')
                .pop();

            sum[name] = match;
            return sum;
        }, {});
    }
    return tpls;
}

function warning(msg) {
    return `
    <div class="b-warning">
        ${msg}
    </div>`;
}
