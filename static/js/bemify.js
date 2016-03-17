'use strict';

var channel = require('./channel');

function getMods(list) {
    return [].slice.call(list).reduce(function (mods, className) {
        var rule = className.split('_');

        if (rule.length > 1) {
            var name = rule[1];
            var value = rule[2] || true;
            mods[name] = value;
        }

        return mods;
    }, {});
}

var API = {

    block: function (name) {
        var block = this[0];
        block._block = name;
        block.mods = getMods(block.classList);
        return this;
    },

    setMod: function (modName, modVal) {
        var block = this[0];
        var name = block._block;

        if (!name) {
            var error = 'This is not a BEM block';
            console.error(error);
            channel.emit('error', {
                message: error
            });
            return this;
        }
        block.mods = block.mods || {};
        block.mods[modName] = modVal || true;
        this.addClass(name + '_' + modName + (modVal ? '_' + modVal : ''));
        return this;
    },

    delMod: function (modName) {
        var block = this[0];
        var name = block._block;
        var val = block.mods && block.mods[modName];

        if (val === true) {
            val = null;
        }

        if (name) {
            this.removeClass(name + '_' + modName + (val ? '_' + val : ''));
        }

        return this;
    }
};

module.exports = function (jq) {
    Object.assign(jq.constructor.prototype, API);
    return jq;
};
