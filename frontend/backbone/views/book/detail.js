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
        template = require('text!book:detail.html');

    return  Backbone.View.extend({
        useNative: true,
        el: '.content',
        template: _.template(template),
        events: {
            'click #btnBack': 'back',
            'click #btnEdit': 'edit',
            'click #btnDelete': 'delete'
        },
        initialize: function() {
            this.render();
        },
        render: function() {
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
        back: function()
        {
            app.routes.navigate('', {trigger: true})
        },
        edit: function(e)
        {
            app.routes.navigate('edit/'+this.model.id, {trigger: true});
        },
        delete: function(e)
        {
            this.model.destroy({
                success: function(data, response){
                    alert(response.message);
                }
            });
        }
    });
})
