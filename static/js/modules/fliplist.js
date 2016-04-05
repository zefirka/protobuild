'use strict';

module.exports = function function_name(params) {
    var _this = this.block('b-fliplist');

    var title = this.elem('title');
    var position = params.position;

    title.css('text-align', position === 'left' ? 'right' : 'left');

    var list = this.elem('list').block('b-fliplist-items');

    this
        .on('mouseover', function () {
            list.delMod('hidden');
            _this.setMod('distant');
        })
        .on('mouseout', function () {
            list.setMod('hidden', 'yes');
            _this.delMod('distant');
        });
};
