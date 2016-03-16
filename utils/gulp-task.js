'use strict';

module.exports = function (gulp) {
    function task(name, fn) {
        gulp.task(name, function () {
            console.log(`---------------> ${name} ::`);
            fn();
        });

        return {
            task: task
        };
    }

    return task;
};
