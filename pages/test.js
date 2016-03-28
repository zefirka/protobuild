'use strict';

const page = require('../utils/page').page

module.exports =  page('test', 'Test page', {
    layout: false,
    footer: false
});
