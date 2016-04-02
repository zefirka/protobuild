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

function col(xs, sm, md, lg) {
    let hidden = [
        xs === null ? 'xs' : null,
        sm === null ? 'sm' : null,
        md === null ? 'md' : null,
        lg === null ? 'lg' : null
    ].filter(Boolean);

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
    } else {
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
                    lg,
                    hidden
                },
                data: data
            };
        }
    };
}

function page(name, title, data) {
    data = Object.assign({
        title: title
    }, data);

    return Object.assign({
        name: name,
        entry: data.entry || 'index',
        data
    }, META);
}

function header() {
    return {
        contacts: {
            button: {
                text: 'Заказать обратный звонок'
            }
        },
        table: {
            rows: [
                [
                    col(null, 2, 4, 4).data('<h1>${title}</h1>'),
                    col(null, 4, 4, 4).data({decl: 'logo'}),
                    col(12, 6, 4, 4).data('${contacts}')
                ]
            ]
        }
    };
}

function nav(active, listClassName, itemClassName) {
    return {
        className: listClassName || 'b-nav__list',
        itemClassName: itemClassName || 'b-nav__item',
        template: 'links',
        items: NAV_PAGES.map(page => {
            return {
                text: page[0],
                src: `${page[1]}.html`,
                active: active === page[1]
            };
        })
    };
}

function form(caption) {
    let struct = {
        caption,
        fields: []
    };

    let api = {
        text: createInputType('text'),
        email: createInputType('email'),
        number: createInputType('number'),
        password: createInputType('password'),
        checkbox: createInputType('checkbox'),
        radio: createInputType('radio'),
        value: () => struct,
        valueOf: () => struct
    };

    function createInputType(type) {
        return (label, options) => {
            options.checked = options.checked === true ? 'checked' : '';
            struct.fields.push({
                label: label,
                input: Object.assign({
                    type
                }, options, {
                    css: options.css || 'form-control'
                })
            });
            return api;
        };
    }

    return api;
}

module.exports = {
    col,
    nav,
    header,
    page,
    form
};
