'use strict';

module.exports.compileComponent = compileComponent;

const fs = require('./utils/fileSystem');
const read = fs.read;
const getStat = fs.getStat;
const readDir = fs.readDir;

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
                return interpolate(markup, summaryData);
            }
        }
    } catch (error) {

        try {
            markup = read(`./components/${name}.html`);
        } catch (e) {
            markup = require(`./components/${name}.js`);
            markup = markup(componentParams, summaryData, interpolate);
        }

        return interpolate(markup, Object.assign(summaryData, componentParams));
    }
}
