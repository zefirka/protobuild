'use strict';

const markup = require('../utils/page');
const page = markup.page;
const header = markup.header;
const nav = markup.nav;
const col = markup.col;
const form = markup.form;
const flip = markup.flip;

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
                    col(12, 6, 3, 3).data(flip('Test', 'http://placehold.it/800x100', [
                        {text: 'allah', src: 'http://yandex.ru'},
                        {text: 'babah', src: 'http://yandex.ru'}
                    ])),
                    col(12, 6, 3, 3).data({component: 'block', params: {bg: '#8FFFF4', height: 100}}),
                    col(12, 6, 3, 3).data({component: 'block', params: {bg: '#6AFF92', height: 100}}),
                    col(12, 6, 3, 3).data({component: 'block', params: {bg: '#EECE2E', height: 100}}),
                ],
                [
                    col(3, 12, 3, 4).data({component: 'block', params: {bg: '#FF000B', height: 120}}),
                    col(3, 12, 3, 4).data({component: 'block', params: {bg: '#000FFF', height: 120}}),
                    col(3, 6, 3, 4).data({component: 'block', params: {bg: '#05C900', height: 120}}),
                    col(3, 6, 3, 12).data({component: 'block', params: {bg: '#EEF208', height: 120}}),
                ]
            ]
        },
        page: {
            value: 'pages/main'
        }
    },
    feedbackForm: form('Feedback')
        .text('Name', {
            placeholder: 'Your name'
        })
        .text('Email', {
            placeholder: 'Your email'
        })
        .password('Password', {
            placeholder: 'Your pass'
        })
        .select('Test', ['тебе', 'хабиб', 'прислал', 'бакшиш'], {
            className: 'form-select'
        })
        .submit('Test', {
            className: 'btn-success'
        })
        .value()
});
