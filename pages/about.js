'use strict';

const page = require('../utils/page');

module.exports =  page('about', 'About', {
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
