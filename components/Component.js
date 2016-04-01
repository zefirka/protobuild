'use strict';

const omit = require('lodash').omit;

function Component(fn, toOmit) {
    fn = fn || function (params) {
        return Object.assign({}, params);
    };

    /**
     * @public
     * @param {object} params
     * @param {object} data
     * @param {function} interpolate
     * @param {string} source
     * @return {object}
     */
    return function (params, data, interpolate, source) {
        const content = params.content;
        let contentHtml = data[content];

        if (!contentHtml && content) {
            try {
                contentHtml = interpolate('${' + content + '}', data, undefined, source);
            } catch (e) {
                console.log(e);
                contentHtml = '';
            }
        }

        let omitted = {};

        if (toOmit) {
            toOmit.forEach(function (name) {
                omitted[name] = params[name];
            });
            params = omit(params, toOmit);
        }

        params.content = contentHtml || '';

        let result = fn(params, data, interpolate, source);

        return typeof result === 'object' ? Object.assign({}, result, omitted) : result;
    };
}

module.exports = Component;
