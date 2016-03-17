'use strict';

module.exports = function (params) {
    const container = params.container;

    return {
        'container-start': container ? `<${container}>` : '',
        'container-end': container ? `</${container}>` : ''
    };
};
