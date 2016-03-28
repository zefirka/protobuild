'use strict';

const page = require('../utils/page').page;

module.exports =  page('about', 'About', {
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
