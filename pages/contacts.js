'use strict';

const markup = require('../utils/page');
const page = markup.page;
const header = markup.header;
const nav = markup.nav;

module.exports =  page('contacts', 'Contacts', {
    header: header(),
    nav: nav('contacts'),
    description: 'Allahu akbar',
    page: {
        value: 'pages/contacts',
    },
    footer: true
});
