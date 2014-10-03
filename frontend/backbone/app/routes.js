/**
 * Created by khanhnh on 25/09/2014.
 */

define(function(require) {
    'use strict';

    var Backbone = require('backbone'),
        ListView = require('book:list'),
        DetailView = require('book:detail'),
        CreateView = require('book:create'),
        EditView = require('book:edit');

    return Backbone.Router.extend({
        routes: {
            '': 'index',
            'book': 'index',
            'book/:id': 'detail',
            'edit/:id': 'edit',
            'create': 'create'
        },
        index: function() {
            this.showView(ListView);
        },
        detail: function(id)
        {
            this.showView(DetailView, {id: id});
        },
        create: function()
        {
            this.showView(CreateView);
        },
        edit: function(id)
        {
            this.showView(EditView, {id: id});
        },
        showView : function(View, params) {
            if (this.view) this.view.destroy();
            this.view = new View(params);
        }
    });
});