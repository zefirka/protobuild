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
                            md: 3,
                            lg: 3,
                            hidden: ['xs', 'sm']
                        },
                        data: '<h1>${title}</h1>'
                    },
                    {
                        queries: {
                            md: 3,
                            lg: 3,
                            sm: 6,
                            hidden: ['xs']
                        },
                        data: '${logo}'
                    },
                    {
                        queries: {
                            md: 6,
                            lg: 6,
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
