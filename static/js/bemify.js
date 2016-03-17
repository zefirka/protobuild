'use strict';

var $ = require('jQuery');
var channel = require('./channel');

Object.assign($.fn, {

    bem: function (name) {
        this[0]._block = name;
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
        var val = block.mods[modName];

        if (name) {
            this.removeClass(name + '_' + modName + (val ? '_' + val : ''));
        }

        return this;
    }
});
