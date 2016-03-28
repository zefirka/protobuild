'use strict';

const markup = require('../utils/page');
const page = markup.page;
const header = markup.header;

module.exports =  page('index', 'Index', {
    // form: {
    //     caption: 'General form',
    //     mainFields: [
    //         {
    //             label: 'The First',
    //             input: {
    //                 type: 'text',
    //                 value: 'Test'
    //             }
    //         },
    //         {
    //             label: 'The Second',
    //             input: {
    //                 type: 'checkbox',
    //                 value: 10
    //             }
    //         },
    //         {
    //             label: 'The select',
    //             select: {
    //                 options: [
    //                     {
    //                         text: 'the first',
    //                         value: 1
    //                     },
    //                     {
    //                         text: 'the second',
    //                         value: 2
    //                     }
    //                 ]
    //             }
    //         }
    //     ]
    // },
    layout: {},
    header: header(),
    nav: {
        itemClassName: 'b-nav__item',
        items: [
            {text: 'О компании'},
            {text: 'Услуги'},
            {text: 'Цены'},
            {text: 'Галерея работ'},
            {text: 'Контакты'}
        ]
    },
    footer: {
        footerItems: [
            {text: 'Allah'},
            {text: 'Akbar'}
        ]
    },
});
