'use strict';

const join = require('path').join;

module.exports = {
    getScript,
    getLink,
    comment
};

/**
 * @public
 * @param {string} js
 * @return {string}
 */
function getScript(js) {
    js = js || [];
    return js.map(function (adr) {
        return `<script type="text/javascript" src="${join(__dirname, '../', adr)}"></script>`;
    }).join('\n');
}

/**
 * @public
 * @param {string} css
 * @return {string}
 */
function getLink(css) {
    css = css || [];
    return css.map(function (adr) {
        return `<link rel="stylesheet" href="${join(__dirname, '../', adr)}"></link>`;
    }).join('\n');
}

/**
 * @public
 * @param {string} name
 * @param {string} type
 * @param {string} src
 * @param {[string]} desc
 * @return {string}
 */
function comment(name, type, src, desc) {
    return `<!-- ${type}: ${name} ## ${src} ${desc || ''} -->\n`;
}
