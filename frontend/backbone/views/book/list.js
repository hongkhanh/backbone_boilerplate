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
        BookCollection = require('collection:book'),
        template = require('text!book:list.html');

    return  Backbone.View.extend({
        useNative: true,
        el: '.content',
        template: _.template(template),
        events:
        {
            'click #btnCreate': 'create',
            'click .view': 'view',
            'click .edit': 'edit',
            'click .delete': 'delete'
        },
        initialize: function()
        {
            this.render();
            $(window).on('resize', function(){console.log('resize')})
        },
        render: function()
        {
            var self = this,
                Books = new BookCollection();

            Books.fetch({
                success: function( data){
                    var html = self.template(data.toJSON());
                    self.el.innerHTML = html;
                    self.modelList = Books;
                },
                error: function(){}
            })
            return this;
        },
        create: function()
        {
            this.destroy();
            app.routes.navigate('create', {trigger: true});
        },
        view: function(e)
        {
            var target = e.delegateTarget;
            var item = $(target).up('.item');
            var id = item.select('input[hidden]').get('value');
            app.routes.navigate('book/'+id, {trigger: true});
        },
        edit: function(e)
        {
            var target = e.delegateTarget;
            var item = $(target).up('.item');
            var id = item.select('input[hidden]').get('value');
            app.routes.navigate('edit/'+id, {trigger: true});
        },
        delete: function(e)
        {
            var target = e.delegateTarget;
            var item = $(target).up('.item');
            var id = item.select('input[hidden]').get('value');
            var book = new Book({
                id: id
            })
            if(confirm('Are you sure to delete the book?'))
            {
                book.destroy();
                item.remove();
            }
        },
        destructor: function () {
            console.log('destroy view');
            $.off(window);
        }
    });
})
