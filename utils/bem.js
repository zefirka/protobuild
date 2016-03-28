'use strict';

module.exports = {
    getMods
};

/**
 * @public
 * @param {sting} name
 * @param {object} mods
 * @return {string}
 */
function getMods(name, mods) {
    return Object.keys(mods).map(function (mod) {
        if (mods[mod] === true) {
            return `${name}_${mod}`;
        }
        return null;
    }).filter(Boolean).join(' ');
}
