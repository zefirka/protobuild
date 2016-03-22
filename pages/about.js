'use strict';

const meta = require('../utils/meta');

module.exports =  Object.assign({
    name: 'about',
    entry: 'index',
    data: {
        title: 'About',
        layout: {
            header: {
                button: {
                    text: 'Test message',
                    type: 'btn-danger'
                }
            }
        },
        footer: true
    }
}, meta);