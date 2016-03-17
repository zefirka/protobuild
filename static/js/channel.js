'use strict';

var warden = require('warden.js');

function propEq(prop, eq) {
    return function (item) {
        return item[prop] === eq;
    };
}

warden(document);

var channel = warden({
    id: 0,
    document: {
        __keyStream: document.stream('keydown')
    },
    popup: {
        __: {}
    }
});

var popupStream = channel.popup.__stream = channel.stream('popup*');

Object.assign(channel.popup.__, {
    reveal: popupStream.filter(propEq('type', 'popup.reveal')),
    hide: popupStream.filter(propEq('type', 'popup.hide')),
});

Object.assign(channel.popup, {
    reveals: makeApi(channel.popup.__.reveal),
    hides: makeApi(channel.popup.__.hide)
});

channel.document.key = function (keyCode) {
    return channel.document.__keyStream.filter(propEq('keyCode', keyCode));
};

function makeApi(stream) {
    return {
        get: function (chan) {
            return stream.filter(function (event) {
                return event.value === chan;
            });
        }
    };
}

module.exports = channel;
