/**
 * Created by ezgoing on 9/25/14.
 */

define(function(require){
    'use strict';

    var app = require('app'),
        Backbone = require('backbone'),
        MINI = require('minified'),
        _=MINI._, $=MINI.$, $$=MINI.$$,
        Book = require('model:book'),
        template = require('text!book:edit.html');

    return  Backbone.View.extend({
        useNative: true,
        el: '.content',
        template: _.template(template),
        events:
        {
            'click #btnSave': 'save',
            'click #btnCancel': 'cancel'
        },
        initialize: function()
        {
            this.render();
        },
        render: function()
        {
            var self = this;
            var book = new Book({
                id: self.id
            });

            book.fetch({
                success: function( data){
                    var html = self.template(data.toJSON());
                    self.el.innerHTML = html;
                    self.model = book;
                },
                error: function(){}
            });

            return this;
        },
        save: function(e)
        {
            var book = {
                title: $('#txtTitle').get('value'),
                page: $('#txtPage').get('value'),
                language: $('#txtLanguage').get('value'),
                isbn: $('#txtISBN').get('value'),
                dimension: $('#txtDimension').get('value'),
                description: $('#txtDescription').get('value')
            };
            this.model.save(book, {
                success: function(data, response){
                    alert(response.message);
                }
            });
        },
        cancel: function(e)
        {
            Backbone.history.history.back();
        }
    });
})
