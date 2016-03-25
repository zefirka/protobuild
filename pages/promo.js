'use strict';

const page = require('../utils/page');

module.exports =  page('promo', 'Promo Page', {
    form: false,
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
