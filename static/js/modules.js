'use strict';

var $ = require('jquery');

var ATTR = '[data-module]';

module.exports = {
    init: init,
    update: update
};

var modules = {
    menu: require('./modules/menu'),
    popup: require('./modules/popup'),
    trigger: require('./modules/trigger'),
    viewport: require('./modules/viewport')
};

function init() {
    $(ATTR).each(function () {
        run(this, false);
    });
}

function update(context) {
    $(ATTR, context).each(function () {
        run(this, true);
    });
}

function run(elem, update) {
    var context = $(elem);
    var name = context.data('module');
    var args = argify(context.data('params'));
    var module = modules[name];

    if (!elem.module || update) {
        elem.module = module.call(context, args);
    }
    return elem.module;
}

// data-module="menu" data-params="paramName: 20, paramName2: 30"
function argify(argv) {
    return argv.split(',')
        .map(trim)
        .reduce(function (args, arg) {
            var str = arg.split(':').map(trim);
            try {
                args[str[0]] = JSON.parse(str[1]);
            } catch (error) {
                args[str[0]] = str[1];
            }
            return args;
        }, {});
}

function trim(str) {
    return str.trim();
}
