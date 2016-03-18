'use strict';

module.exports = function (gulp) {
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
};
