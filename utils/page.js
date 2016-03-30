'use strict';

const META = {
    js: [
        '../../bundles/js/app.js'
    ],
    css: [
        '../../node_modules/bootstrap/dist/css/bootstrap.min.css',
        '../../bundles/css/index.css'
    ]
};

const NAV_PAGES = [
	['О компании', 'about'],
	['Услуги', 'services'],
	['Цены', 'prices'],
	['Галерея работ', 'gallery'],
	['Контакты', 'contacts']
];

module.exports.page = function (name, title, data) {
    data = Object.assign({
        title: title
    }, data);

    return Object.assign({
        name: name,
        entry: data.entry || 'index',
        data
    }, META);
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

module.exports.nav = function (active, listClassName, itemClassName) {
    return {
        className: listClassName || 'b-nav__list',
        itemClassName: itemClassName || 'b-nav__item',
        items: NAV_PAGES.map(page => {
            return {
                text: page[0],
                src: `${page[1]}.html`,
                active: active === page[1]
            };
        })
    };
};

module.exports.col = function (xs, sm, md, lg) {
    if (arguments.length === 0) {
        xs = 12;
        sm = 12;
        md = 12;
        lg = 12;
    } else
    if (arguments.length === 1) {
        md = arguments[0];
        xs = 12;
        sm = 12;
        lg = 12;
    } else
    if (arguments.length === 2) {
        xs = arguments[0];
        sm = arguments[0];
        md = arguments[1];
        lg = arguments[1];
    }else {
        xs = xs || 12;
        sm = sm || 12;
        md = md || 12;
        lg = lg || 12;
    }

    return {
        data: data => {
            return {
                queries: {
                    xs,
                    sm,
                    md,
                    lg
                },
                data: data
            };
        }
    };
};
