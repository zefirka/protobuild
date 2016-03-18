'use strict';

const page = require('../utils/page');

module.exports =  page('index', 'Index', {
    layout: {
        header: {
            logo: false
        }
    },
    footer: {
        footerItems: [
            {text: 'Allah'},
            {text: 'Akbar'}
        ]
    },
});
