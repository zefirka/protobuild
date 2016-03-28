'use strict';

const ROW = '<div class="row">${content}</div>';
const COL = '<div class="${columns}">${content}</div>';

const lodash = require('lodash');
const omit = lodash.omit;
const get = lodash.get;

module.exports = function  (params, data, interpolate) {
    const containerData = get(data, params.data) || [];

    const content = containerData.rows.map(row => {
        const content = row.map(col => {
            const queries = col.queries;
            const hiddens = queries.hidden || [];
            const cols = omit(queries, ['hidden']);

            let columns = Object.keys(cols).reduce((str, col) => {
                let colVal = cols[col];
                str += `col-${col}-${colVal} `;
                return str;
            }, '') || '';

            let hd = hiddens.reduce((str, col) => {
                str += `hidden-${col} `;
                return str;
            }, '') || '';

            return interpolate(COL, {
                columns: `${columns} ${hd}`,
                content: interpolate(col.data || '', data)
            });
        }).join('\n');

        return interpolate(ROW, {content});
    }).join('\n');

    return {
        content
    };
};
