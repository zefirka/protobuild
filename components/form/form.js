'use strict';

const read = require('../../utils/fileSystem').read;

const get = require('lodash').get;

const select = require('../select/select');

module.exports = function form(params, data, interpolate) {
    const fields = get(data, params.fields) || [];

    const fieldsMarkup = fields.map(field => {
        const type = field.input ? 'input' : 'select';
        const inputType = field.input ? field.input.type : true;

        if (type === 'input' && (!inputType || inputType === 'text')) {
            field.input.css = 'form-control';
        }

        if (type === 'select') {
            field.select.css = 'form-control';
            field.select.options = select({
                options: 'options'
            }, {
                options: field.select.options
            }, interpolate).options;
        }

        const fieldMarkup =  interpolate(read(`./components/${type}/${type}.html`), field[type]);

        return interpolate(read(`./components/form/field.html`), {
            label: field.label,
            formInput: fieldMarkup
        });
    }).join('\n');

    return {
        caption: get(data, params.caption) || params.caption,
        fields: fieldsMarkup
    };
};
