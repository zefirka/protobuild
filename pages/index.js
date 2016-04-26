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
                    col(12, 6, 4, 4).data(flipr('', 'Заборы')),
                    col(12, 6, 4, 4).data(flipr('', 'Allah', 'right')),
                    col(12, 12, 4, 4).data(flipr('', 'Testuinno', 'right')),
                ]
            ]
        },
        page: {
            value: 'pages/main'
        }
    },
    feedbackForm: form('Feedback')
        .text('Name', {
            placeholder: 'Your name',
            value: 'ALLAH !!!'
        })
        .text('Email', {
            placeholder: 'Your email'
        })
        .password('Password', {
            placeholder: 'Your pass'
        })
        .select('Test', 'тебе хабиб прислал бакшиш'.split(' '), {
            className: 'form-select'
        })
        .submit('Test', {
            className: 'btn-success'
        })
        .submit('allah', {
            className: 'btn-success'
        })
        .value()
});

function flipr(name, title, position) {
    return flip(name, title, 'http://placehold.it/800x200', position || 'left', [
        {text: 'allah', src: 'http://yandex.ru'},
        {text: 'babah', src: 'http://yandex.ru'}
    ]);
}
