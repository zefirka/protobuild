'use strict';

const page = require('../utils/page');

module.exports =  page('test', 'Test page', {
    layout: false,
    footer: false
});
