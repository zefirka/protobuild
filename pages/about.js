'use strict';

const meta = require('../utils/meta');

module.exports =  Object.assign({
    name: 'about',
    entry: 'index',
    data: {
        title: 'About',
        layout: {
            nav: true
        },
        footer: true
    }
}, meta);
