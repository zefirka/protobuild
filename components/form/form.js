'use strict';

const read = require('../../utils/fileSystem').read;

const get = require('lodash').get;

const select = require('../select/select');

const Component = require('../Component');

const compileComponent = require('../../builder').compileComponent;

module.exports = Component(function (params, data, interpolate) {
    const fields = Array.isArray(params.fields) ? params.fields : (get(data, params.fields) || []);

    const fieldsMarkup = fields.map(field => {
        const type =  field.type || (field.input ? 'input' : 'select');
        const inputType = field.input ? field.input.type : true;

        if (type === 'input' && (!inputType || inputType === 'text')) {
            field.input.css = 'form-control';
        }else
        if (type === 'select') {
            field.select.css = 'form-control';
            field.select.options = select({
                options: 'options'
            }, {
                options: field.select.options
            }, interpolate).options;
        }else
        if (type === 'submit') {
            return compileComponent('button', {}, {
                tag: 'button',
                submit: true,
                text: field.text,
                className: field.className
            }, interpolate);
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
});
