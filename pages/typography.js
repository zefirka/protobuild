'use strict';

const markup = require('../utils/page');
const page = markup.page;
const header = markup.header;
const nav = markup.nav;

module.exports =  page('typography', 'Typography', {
    header: header(),
    breadcrumbs: 'Typography',
    nav: nav('typography'),
    page: {
        value: 'pages/typography',
    }
});
