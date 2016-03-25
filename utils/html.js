'use strict';

const join = require('path').join;

module.exports = {
    getScript,
    getLink,
    comment
};

function getScript(js) {
    js = js || [];
    return js.map(function (adr) {
        return `<script type="text/javascript" src="${join(__dirname, '../', adr)}"></script>`;
    }).join('\n');
}

function getLink(css) {
    css = css || [];
    return css.map(function (adr) {
        return `<link rel="stylesheet" href="${join(__dirname, '../', adr)}"></link>`;
    }).join('\n');
}

function comment(name, type, src, desc) {
    return `<!-- ${type}: ${name} ## ${src} ${desc || ''} -->\n`;
}
