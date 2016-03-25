'use strict';

const page = require('../utils/page');

module.exports =  page('test', 'Test page', {
    form: false,
    title: 'Test page',
    layout: false,
    footer: false
});
