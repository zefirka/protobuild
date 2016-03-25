'use strict';

require('colors');

module.exports = gulpTask;

/**
 * @public
 * @param {object} gulp
 * @return {function}
 */
function gulpTask(gulp) {
    function task(name, fn) {
        gulp.task(name, typeof fn === 'function' ? function () {
            console.log(`---------------> ${name} ::`);
            fn();
        } : fn);

        return {
            task: task
        };
    }

    return task;
}
