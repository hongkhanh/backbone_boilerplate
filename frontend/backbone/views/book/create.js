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
        template = require('text!book:create.html');

    return  Backbone.View.extend({
        useNative: true,
        el: '.content',
        template: _.template(template),
        events: {
            'click #btnCreate': 'create',
            'click #btnCancel': 'cancel'
        },
        initialize: function() {
            this.render();
        },
        render: function() {
            var html = this.template();
            this.el.innerHTML = html;

            return this;
        },
        create: function(e)
        {
            var book = new Book({
                title: $('#txtTitle').get('value'),
                page: $('#txtPage').get('value'),
                language: $('#txtLanguage').get('value'),
                isbn: $('#txtISBN').get('value'),
                dimension: $('#txtDimension').get('value'),
                description: $('#txtDescription').get('value')
            });
            book.save({}, {
                    success: function(data, response){
                    alert(response.message);
                }
            });
        },
        cancel: function(e)
        {
            app.routes.navigate('', {trigger: true})
        },
        destructor: function () {
            console.log('view destroyed');
        }
    });
})
