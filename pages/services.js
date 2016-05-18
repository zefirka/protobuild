'use strict';

const markup = require('../utils/page');
const page = markup.page;
const header = markup.header;
const nav = markup.nav;
const footer = markup.footer;

module.exports =  page('services', 'Services', {
    header: header(),
    nav: nav('services'),
    footer: footer()
});
