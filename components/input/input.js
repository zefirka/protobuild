'use strict';

module.exports = function (params) {
    const type = params.container;
    const placeholder = params.placeholder;
    const css = params.css;

    return {
        type,
        placeholder,
        css
    };
};
