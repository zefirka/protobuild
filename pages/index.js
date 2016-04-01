'use strict';

const markup = require('../utils/page');
const page = markup.page;
const header = markup.header;
const nav = markup.nav;
const col = markup.col;
const form = markup.form;

module.exports =  page('index', 'Index', {
    description: 'Главная страница',
    header: header(),
    nav: Object.assign(nav(), {
        breadcrumbs: 'Index'
    }),
    footer: {
        itemClassName: 'b-footer__item',
        footerItems: [
            {text: 'One'},
            {text: 'Two'}
        ],
        footerTable: {
            rows: [
                [
                    col().data({
                        component: 'list',
                        params: {
                            items: 'footerItems',
                            template: 'simple',
                            className: 'b-footer__list'
                        }
                    })
                ]
            ]
        }
    },
    'teh-list-items': [
        {text: 'A'},
        {text: 'B'},
        {text: 'C'}
    ],
    layout: {
        indexTable: {
            rows: [
                [
                    col(12, 6, 3, 3).data({component: 'block', params: {bg: '#FF87A5', height: 100}}),
                    col(12, 6, 3, 3).data({component: 'block', params: {bg: '#8FFFF4', height: 100}}),
                    col(12, 6, 3, 3).data({component: 'block', params: {bg: '#6AFF92', height: 100}}),
                    col(12, 6, 3, 3).data({component: 'block', params: {bg: '#EECE2E', height: 100}}),
                ]
            ]
        },
        page: {
            value: 'pages/main',
        }
    },
    feedbackForm: form('Feedback')
        .text('Name', {
            placeholder: 'Your name'
        })
        .text('Email', {
            placeholder: 'Your email'
        })
        .value()
});
