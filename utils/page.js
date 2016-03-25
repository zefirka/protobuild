'use strict';

const meta = {
    js: [
        'bundles/js/app.js'
    ],
    css: [
        'node_modules/bootstrap/dist/css/bootstrap.min.css',
        'bundles/css/index.css'
    ]
};

module.exports = function (name, title, data) {
    data = Object.assign({
        title: title
    }, data);

    return Object.assign({
        name: name,
        entry: data.entry || 'index',
        data
    }, meta);
};
