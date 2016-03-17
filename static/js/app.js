'use strict';

require('./bemify');

var $ = require('jQuery');
var modules = require('./modules');

$(function () {
    modules.init();
});

window.$ = $;
window.channel = require('./channel');
