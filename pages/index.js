'use strict';

const page = require('../utils/page');

module.exports =  page('index', 'Index', {
    form: {
        caption: 'General form',
        mainFields: [
            {
                label: 'The First',
                input: {
                    type: 'text',
                    value: 'Test'
                }
            },
            {
                label: 'The Second',
                input: {
                    type: 'checkbox',
                    value: 10
                }
            },
            {
                label: 'The select',
                select: {
                    options: [
                        {
                            text: 'the first',
                            value: 1
                        },
                        {
                            text: 'the second',
                            value: 2
                        }
                    ]
                }
            }
        ]
    },
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
