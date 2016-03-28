'use strict';

const page = require('../utils/page').page;

module.exports =  page('promo', 'Promo Page', {
    layout: {
        header: {
            button: {
                text: 'Test message',
                type: 'btn-danger'
            }
        }
    },
    footer: true
});
