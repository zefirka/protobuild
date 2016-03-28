'use strict';

const meta = {
    js: [
        '../../bundles/js/app.js'
    ],
    css: [
        '../../node_modules/bootstrap/dist/css/bootstrap.min.css',
        '../../bundles/css/index.css'
    ]
};

module.exports.page = function (name, title, data) {
    data = Object.assign({
        title: title
    }, data);

    return Object.assign({
        name: name,
        entry: data.entry || 'index',
        data
    }, meta);
};

module.exports.header = function () {
    return {
        contacts: {
            button: {
                text: 'Заказать обратный звонок'
            }
        },
        table: {
            rows: [
                [
                    {
                        queries: {
                            md: 4,
                            lg: 4,
                            sm: 2,
                            hidden: ['xs']
                        },
                        data: '<h1>${title}</h1>'
                    },
                    {
                        queries: {
                            md: 4,
                            lg: 4,
                            sm: 4,
                            hidden: ['xs']
                        },
                        data: '${logo}'
                    },
                    {
                        queries: {
                            md: 4,
                            lg: 4,
                            sm: 6,
                            xs: 12
                        },
                        data: '${contacts}'
                    }
                ]
            ]
        }
    };
};

module.exports.nav = function (listClassName, itemClassName) {
    return {
        className: listClassName || 'b-nav__list',
        itemClassName: itemClassName || 'b-nav__item',
        items: [
            {
                text: 'О компании',
                src: 'about.html'
            },
            {
                text: 'Услуги',
                src: 'services.html'
            },
            {
                text: 'Цены',
                src: 'prices.html'
            },
            {
                text: 'Галерея работ',
                src: 'gallery.html'
            },
            {
                text: 'Контакты',
                src: 'contacts.html'
            }
        ]
    };
};
