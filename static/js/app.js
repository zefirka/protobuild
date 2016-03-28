'use strict';

var $ = require('jQuery');
require('./bemify');

var modules = require('./modules');

$(function () {
    modules.init();
});

window.$ = $;
window.channel = require('./channel');
