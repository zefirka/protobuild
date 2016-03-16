'use strict';

const meta = require('../utils/meta');

module.exports =  Object.assign({
    name: 'index',
    entry: 'index',
    data: {
        title: 'Index',
        layout: {
            header: {
                logo: false
            }
        },
        footer: false
    }
}, meta);
