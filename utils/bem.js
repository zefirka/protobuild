'use strict';

module.exports.getMods = function (name, mods) {
    return Object.keys(mods).map(function (mod) {
        if (mods[mod] === 'true') {
            return `${name}_${mod}`;
        }
        return null;
    }).filter(Boolean).join(' ');
};
