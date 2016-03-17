'use strict';

const meta = require('../utils/meta');

module.exports =  Object.assign({
    name: 'test',
    entry: 'index',
    data: {
        title: 'Test page',
        layout: false,
        footer: false
    }
}, meta);
