'use strict';

const lodash = require('lodash');
const omit = lodash.omit;
const get = lodash.get;

module.exports = Component;

/**
 * @public
 * @param {function} fn
 * @param {array} toOmit
 * @return {function}
 */
function Component(fn, toOmit) {
    fn = fn || function (params) {
        return Object.assign({}, params);
    };

    /**
     * @public
     * @param {object} 		params
     * @param {string} 		params.content
     * @param {object} 		data
     * @param {function} 	interpolate
     * @param {string} 		[source]
     * @return {object}
     */
    return function (params, data, interpolate, source) {
        const content = params.content;
        const className = get(data, params.className) || params.className;

        let omittedProperties = {};
        let contentHtml = get(data, content);

        if (!contentHtml && content) {
            try {
                contentHtml = interpolate('${' + content + '}', data, undefined, source);
            } catch (e) {
                console.error(e);
                contentHtml = content;
            }
        }

        if (toOmit) {
            toOmit.forEach(name => omittedProperties[name] = params[name]);
            params = omit(params, toOmit);
        }

        params.content = contentHtml || '';

        if (className && typeof className !== 'string') {
            if (Array.isArray(className)) {
                params.className = className.join(' ');
            } else {
                /** TODO **/
                params.className = 'TODO_CLASSNAME';
            }
        }

        const result = fn(params, data, interpolate, source);

        return typeof result === 'object' ? Object.assign({}, result, omittedProperties) : result;
    };
}
