'use strict';

const ROW = '<div class="row">${content}</div>';
const COL = '<div class="${columns}">${content}</div>';

const createColumn = require('../../utils/page').col;

const lodash = require('lodash');
const omit = lodash.omit;
const get = lodash.get;

const read = require('../../utils/fileSystem').read;

const compileComponent = require('../../builder').compileComponent;

module.exports = function  (params, data, interpolate) {
    let containerData = get(data, params.data) || [];

    if (!containerData.length && params.content) {
        const template = get(data, params.content) || '';
        const readyTemplate = interpolate(template, data);

        containerData = {
            rows: [
                [
                    createColumn().data(readyTemplate)
                ]
            ]
        };
    }

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
                if (col.data.component) {
                    content = compileComponent(col.data.component, data, col.data.params || {}, interpolate);
                } else
                if (col.data.decl) {
                    const src = `./declarations/${col.data.decl}.html`;
                    content = interpolate(read(src), data, undefined, src);
                }
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
