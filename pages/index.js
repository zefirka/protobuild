'use strict';

const markup = require('../utils/page');
const page = markup.page;
const header = markup.header;
const nav = markup.nav;

module.exports =  page('index', 'Index', {
    header: header(),
    nav: nav(),
    footer: {
        itemClassName: 'b-footer__item',
        footerItems: [
            {text: 'One'},
            {text: 'Two'}
        ],
        footerTable: {
            rows: [
                [
                    {
                        queries: {
                            md:12,
                            sm:12,
                            xs:12,
                            lg:12,
                        },
                        data: '${list:items=footerItems, template=simple, className=b-footer__list}'
                    }
                ]
            ]
        }
    },
});

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
// }
