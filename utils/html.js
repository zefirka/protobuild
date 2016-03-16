'use strict';

const join = require('path').join;

module.exports.getScript = getScript;
module.exports.getLink = getLink;

function getScript(js) {
    return js.map(function (adr) {
        return `<script type="text/javascript" src="${join(__dirname, '../', adr)}"></script>`;
    }).join('\n');
}

function getLink(css) {
    return css.map(function (adr) {
        return `<link rel="stylesheet" href="${join(__dirname, '../', adr)}"></link>`;
    }).join('\n');
}
