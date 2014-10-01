/**
 * Created by khanhnh on 25/09/2014.
 */

// dummy jquery & underscore
define('jquery', function(){});
define('underscore', function(){});

// config curl
curl.config({
    baseUrl: '',
    paths: {
        // libs
        minified: 'libs/minified',
        backbone: {
            location: 'libs/exoskeleton.js',
            exports: 'Backbone',
            requires: ['jquery', 'underscore']
        },
        // app
        routes: 'app/routes',
        comm: 'app/comm',

        // views
        'book:create': 'views/book/create',
        'book:edit': 'views/book/edit',
        'book:list': 'views/book/list',
        'book:detail': 'views/book/detail',

        // models
        'model:book': 'models/book',

        // collection
        'collection:book': 'collections/book',

        // templates
        'book:create.html': 'templates/book/create.html',
        'book:edit.html': 'templates/book/edit.html',
        'book:list.html': 'templates/book/list.html',
        'book:detail.html': 'templates/book/detail.html'

    },
    pluginPath: 'libs/curl/plugin'
});

// Kick off the application.
curl(['routes'], function(Routes) {
    'use strict';

    var route = new Routes();
    Backbone.history.start();
});
