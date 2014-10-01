/**
 * Created by khanhnh on 25/09/2014.
 */

define(function(require) {
    'use strict';

    var Backbone = require('backbone'),
        ListView = require('book:list');
        //DetailView = require('book:detail'),
        //CreateView = require('book:create'),
        //EditView = require('book:edit');

    return Backbone.Router.extend({
        routes: {
            '': 'index',
            '/book/:id': 'detail',
            '/book/edit/:id': 'edit',
            '/book/create': 'create'
        },
        index: function() {
            new ListView();
        },
        detail: function(id)
        {
            new DetailView({id: id});
        },
        create: function()
        {
            new CreateView();
        },
        edit: function(id)
        {
            new EditView({id: id});
        }
    });
});