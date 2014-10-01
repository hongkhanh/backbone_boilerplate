/**
 * Created by ezgoing on 9/25/14.
 */

define(function(require){
    'use strict';

    var Backbone = require('backbone'),
        MINI = require('minified'),
        _=MINI._, $=MINI.$, $$=MINI.$$,
        BookCollection = require('collection:book'),
        template = require('text!book:list.html');

    return  Backbone.View.extend({
        useNative: true,
        el: '.content',
        template: _.template(template),
        events: {
            'click #btnCreate': 'create'
        },
        initialize: function() {
            this.render();
        },
        render: function() {
            var self = this,
                Books = new BookCollection();

            Books.fetch({
                success: function( data){
                    var html = self.template(data.toJSON());
                    self.el.innerHTML = html;
                },
                error: function(){}
            })
            return this;
        },
        create: function(e)
        {
            var book = new Book({
                title: $('#txtName').get('value'),
                page: $('#txtPage').get('value'),
                language: $('#txtLanguage').get('value'),
                isbn: $('#txtISBN').get('value'),
                dimension: $('#txtDimension').get('value'),
                description: $('#txtDescription').get('value')
            });
            book.save(this, {
                success: function(data, response){
                    alert('response: ' + response.message);
                }
            });
        }
    });
})
