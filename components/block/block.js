'use strict';

const Component = require('../Component');

module.exports = Component(function (params) {
    let bg = params.bg[0] === '#' ? params.bg.slice(1) : params.bg;
    const height = params.height && params.height + 'px';
    const width = params.width && params.width + 'px';

    if (parseInt(bg, 16)) {
        bg = '#' + bg;
    }

    return {
        bg,
        width,
        height
    };
});
