'use strict';

const meta = require('../utils/meta');

module.exports =  Object.assign({
    name: 'promo',
    entry: 'index',
    data: {
        title: 'Promo Page',
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
