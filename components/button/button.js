'use strict';

const Component = require('../Component');
const get = require('lodash').get;

module.exports = Component(function (params, data) {
    return {
        submit: params.submit ? 'type="submit"' : '',
        text: get(data, params.text) || params.text,
    };
});
