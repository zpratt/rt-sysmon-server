(function () {
    'use strict';

    var AmpersandModel = require('ampersand-model');

    module.exports = AmpersandModel.extend({
        props: {
            load: 'number',
            lastUpdateTs: 'date'
        }
    });
}());