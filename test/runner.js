/*global define mocha */
var should;

require.config({
    baseUrl: './',
    paths: {
        'underscore': '../bower_components/underscore/underscore',
        'jquery': '../bower_components/jquery/jquery',
        'eventemitter': '../bower_components/eventemitter2/lib/eventemitter2',
        'text': '../bower_components/requirejs-text/text',
        'css':'../bower_components/require-css/css',
        'chai': '../node_modules/chai/chai',
        'plugins': '../../lib/plugins'
    },
    shim: {
        'underscore': { 'exports': '_' },
        'jquery': { 'exports': 'jquery' }
    },
    packages: [{
        name: 'veronica',
        location: '../lib'
    }],
    sources: {
        'default': './widgets'
    }
});

define(['chai'], function (chai) {
    window.chai = chai;
    window.expect = chai.expect;
    window.assert = chai.assert;
    window.should = chai.should();
    window.notrack = true;

    mocha.setup('bdd');

    require([
        'main-spec'
    ], function () {
        mocha.run();
    });
});
