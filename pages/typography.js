'use strict';

const {page,
       header,
       nav,
       form,
       col} = require('../utils/page');

let f = form('Test form')
        .text('Text firld', {
            placeholder: 'placeholder',
        })
        .email('Email', {
            placeholder: 'Your email'
        })
        .password('Password', {
            placeholder: 'Your pass'
        })
        .number('Number', {
            placeholder: 'Number'
        })
        .select('Test', 'тебе хабиб прислал бакшиш'.split(' '), {
            className: 'form-select'
        })
        .checkbox('Name', {
            checked: true
        })
        .radioGroup('Allah', [
            {
                label: 'yes',
                selected: true
            },
            {
                label: 'no',
                selected: false
            }
        ])
        .submit('Submit', {
            className: 'btn-success'
        })
        .value();

module.exports =  page('typography', 'Typography', {
    header: header(),
    breadcrumbs: 'Typography',
    nav: nav('typography'),
    page: {
        value: 'pages/typography',
    },
    formf: {
        rows: [
            [
                col().data({
                    component: 'form',
                    params: f
                })
            ]
        ]}
});
