'use strict';

module.exports = function (params, data) {
    return data.nav.items.filter(item => item.active).pop().text || data.breadcrumbs;
};
