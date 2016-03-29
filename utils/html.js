'use strict';

const guid = require('./static').guid;

module.exports = {
    getScript,
    getLink,
    comment,
    stripComments,
    restripComments
};

/**
 * @public
 * @param {string} js
 * @return {string}
 */
function getScript(js) {
    js = js || [];
    return js.map(function (adr) {
        return `<script type="text/javascript" src="${adr}"></script>`;
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
        return `<link rel="stylesheet" href="${adr}"></link>`;
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

/**
 * @public
 * @param {string} str
 * @return {object}
 */
function stripComments(str) {
    let comments = [];
    str = str.replace(/<!--.+-->/g, g => {
        let id = '@comment' + guid();
        comments.push({
            [id]: g
        });
        return id;
    });
    return {
        str,
        comments
    };
}

/**
 * @public
 * @param {string} str
 * @param {array} comments
 * @return {string}
 */
function restripComments(str, comments) {
    comments.forEach(comment => {
        let id = Object.keys(comment).pop();
        let val = comment[id];
        str = str.replace(id, val);
    });
    return str;
}
