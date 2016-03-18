'use strict';

const meta = require('./meta');

module.exports = function (name, title, data) {
    data = Object.assign({
        title: title
    }, data);

    return Object.assign({
        name: name,
        entry: 'index',
        data
    }, meta);
};
