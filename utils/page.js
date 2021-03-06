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

module.exports = {
    col,
    nav,
    header,
    page,
    form,
    flip,
    footer
};

/**
 * @public
 * @param {number|null} [xs]
 * @param {number|null} [sm]
 * @param {number|null} [md]
 * @param {number|null} [lg]
 * @return {object}
 */
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

/**
 * @public
 * @param {string} name
 * @param {string} title
 * @param {object} data
 * @return {object}
 */
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

/**
 * @public
 * @return {object}
 */
function header() {
    return {
        contacts: {
            button: {
                text: 'Заказать обратный звонок'
            }
        },
        btntext: 'Закажи лох пидр',
        table: {
            rows: [
                [
                    col(null, null, 4, 4).data({decl: 'siteheade'}),
                    col(4, 6, 4, 4).data({decl: 'logo'}),
                    col(8, 3, 2, 2).data({decl: 'contacts'}),
                    col(null, 3, 2, 2).data({decl: 'call'}),
                ]
            ]
        }
    };
}

/**
 * @public
 * @param {string} active
 * @param {string} listClassName
 * @param {string} itemClassName
 * @return {object}
 */
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

function footer() {
    return {
        footerTable: {
            rows: [
                [
                    col(null, 3, 3, 3).data({
                        component: 'exec',
                        params: {
                            template: 'footer-col-1'
                        }
                    }),
                    col(null, 3, 3, 3).data({
                        component: 'exec',
                        params: {
                            template: 'footer-col-2'
                        }
                    }),
                    col(6, 3, 3, 3).data({
                        component: 'exec',
                        params: {
                            template: 'footer-col-3'
                        }
                    }),
                    col(6, 3, 3, 3).data({
                        component: 'exec',
                        params: {
                            template: 'footer-col-4'
                        }
                    })
                ]
            ]
        }
    };
}

/**
 * @public
 * @param {string} caption
 * @return {object}
 */
function form(caption) {
    let struct = {
        caption,
        fields: []
    };

    const api = {
        text: createInputType('text'),
        email: createInputType('email'),
        number: createInputType('number'),
        password: createInputType('password'),
        checkbox: (label, checked, options) => {
            struct.fields.push({
                label,
                input: Object.assign({
                    type: 'checkbox',
                    checked,
                }, options)
            });
            return api;
        },
        select: (label, options, selectOptions) => {
            struct.fields.push({
                label,
                select: Object.assign({
                    options: prepareSelectOptions(options)
                }, selectOptions)
            });
            return api;
        },
        submit: (text, options) => {
            struct.fields.push(Object.assign({
                type: 'submit',
                text: text
            }, options));
            return api;
        },
        radioGroup: () => {
            return api;
        },
        value: () => struct,
        valueOf: () => struct
    };

    /**
     * @private
     * @param {stirng} type
     * @return {function}
     */
    function createInputType(type) {
        return (label, options) => {
            options.checked = options.checked === true ? 'checked' : '';
            struct.fields.push({
                label: label,
                input: Object.assign({
                    type
                }, options, {
                    className: options.css || 'form-control'
                })
            });
            return api;
        };
    }

    return api;
}

/**
 * @public
 * @param {string} title
 * @param {string} flipListTitle
 * @param {string} image
 * @param {string} position
 * @param {object[]} items
 * @return {object}
 */
function flip(title, fliplistTitle, image, position, items) {
    return {
        component: 'fliplist',
        params: {title, fliplistTitle, image, items, position}
    };
}

/**
 * @private
 * @param {array|object} opts
 * @return {array}
 */
function prepareSelectOptions(opts) {
    return Array.isArray(opts) ?
        opts.map(opt => {
            return typeof opt === 'string' ? {text: opt, value: opt} : opt;
        }) :
        Object.keys(opts).map(text => {
            return {text: text, value: opts[text]};
        });
}
