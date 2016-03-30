'use strict';

const ROW = '<div class="row">${content}</div>';
const COL = '<div class="${columns}">${content}</div>';

const lodash = require('lodash');
const omit = lodash.omit;
const get = lodash.get;

const compileComponent = require('../../builder').compileComponent;

module.exports = function  (params, data, interpolate) {
    const containerData = get(data, params.data) || [];

    const content = containerData.rows.map(row => {
        const content = row.map(col => {
            const queries = col.queries;
            const hiddens = queries.hidden || [];
            const cols = omit(queries, ['hidden']);
            let content;

            let columns = Object.keys(cols).reduce((str, col) => {
                let colVal = cols[col];
                str += `col-${col}-${colVal} `;
                return str;
            }, '') || '';

            let hd = hiddens.reduce((str, col) => {
                str += `hidden-${col} `;
                return str;
            }, '') || '';

            let columnData = '';

            if (typeof col.data === 'string') {
                columnData = col.data;
            } else {
                content = compileComponent(col.data.component, data, col.data.params || {}, interpolate);
            }

            return interpolate(COL, {
                columns: `${columns} ${hd}`,
                content: content || interpolate(columnData || '', data)
            });
        }).join('\n');

        return interpolate(ROW, {content});
    }).join('\n');

    return {
        content
    };
};
