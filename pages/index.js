'use strict';

const  {page,
        header,
        nav,
        col,
        form,
        flip,
        footer} = require('../utils/page');

module.exports =  page('index', 'Index', {
    description: 'Главная страница',
    header: header(),
    nav: Object.assign(nav(), {
        breadcrumbs: 'Index'
    }),
    footer: footer(),
    'teh-list-items': [
        {text: 'A'},
        {text: 'B'},
        {text: 'C'}
    ],
    layout: {
        indexTable: {
            rows: [
                [
                    col(12, 6, 4, 4).data(flipr('Детские площадки', '../../static/images/main/1.jpg', '', 'left',  [
                        {text: 'Игровые комплексы', src: 'http://test.com'},
                        {text: 'Песочницы', src: 'http://test.com'},
                        {text: 'Качели', src: 'http://test.com'},
                        {text: 'Резиновое покрытие', src: 'http://test.com'}
                    ])),
                    col(12, 6, 4, 4).data(flipr('Навесы и козырьки', '../../static/images/main/2.jpg',  '', 'right')),
                    col(12, 6, 4, 4).data(flipr('Ворота и калитки', '../../static/images/main/3.jpg',  '', 'right', [
                        {text: 'Откантные ворота', src: 'http://test.com'},
                        {text: 'Распашные ворота', src: 'http://test.com'},
                        {text: 'Секционные ворота', src: 'http://test.com'},
                        {text: 'Рулонные ворота', src: 'http://test.com'},
                        {text: 'Калитки', src: 'http://test.com'},
                        {text: 'Автоматика для ворот', src: 'http://test.com'}
                    ]))
                ]
            ]
        },
        page: {
            value: 'pages/main'
        }
    },
    feedbackForm: form('Заказать звонок')
        .text('Имя', {
            // placeholder: 'Your name',
        })
        .text('Телефон', {
            // placeholder: 'Your pass'
        })
        .text('Удобное время', {
            // placeholder: 'Your pass'
        })
        .select('Время', [
            'В любое время',
            '09:00 - 12:00',
            '12:00 - 15:00',
            '15:00 - 18:00',
            '18:00 - 21:00',
        ], {
            className: 'form-select'
        })
        .submit('Отправить', {
            className: 'b-button_primary'
        })
        .submit('Отмена', {
            className: 'b-button_danger'
        })
        .value()
});

function flipr(bigTitle, src, title, position, elems) {
    return flip(bigTitle, title, src || 'http://placehold.it/800x200.png', position || 'left', elems);
}
