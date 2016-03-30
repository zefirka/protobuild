'use strict';

const markup = require('../utils/page');
const page = markup.page;
const header = markup.header;
const nav = markup.nav;

module.exports =  page('about', 'About', {
    header: header(),
    nav: nav('about'),
    page: {
        value: 'pages/about',
    }
});
