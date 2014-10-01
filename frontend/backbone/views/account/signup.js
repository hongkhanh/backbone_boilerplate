/**
 * Created by ezgoing on 9/25/14.
 */

define(function(require){
   'use strict';

    var Backbone = require('backbone'),
        MINI = require('minified'),
        _=MINI._, $=MINI.$, $$=MINI.$$,
        User = require('model:user'),
        UserList = require('model:user-list'),
        template = require('text!account:signup.html');

    return  Backbone.View.extend({
        useNative: true,
        el: '.content',
        template: _.template(template),
        events: {
            'click #btnSignUp': 'signUp'
        },
        initialize: function() {
            this.render();
        },
        render: function() {
            var self = this;
            var model = new User();
            var modelList = new UserList();

            //model.fetch(
            //{
            //    success: function( data){
            //        var html = self.template(data.toJSON());
            //        self.el.innerHTML = html;
            //    },
            //    error: function(){}
            //});

            //modelList.fetch({
            //    success: function( data){
            //        var html = self.template(data.toJSON());
            //        self.el.innerHTML = html;
            //    },
            //    error: function(){}
            //})

            var html = self.template();
            self.el.innerHTML = html;

            return this;
        },
        signUp: function(e)
        {
            var c = $(this.el);
            var model = new User();

            var user = {
                name: $('#txtName', c).get('value'),
                role: $('#txtRole', c).get('value')
            }

            model.save(user, {
                success: function(data, response){
                    alert('response: ' + response.message);
                }
            });
        }
    });
})
