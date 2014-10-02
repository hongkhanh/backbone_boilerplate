/**
 * Created by khanhnh on 25/09/2014.
 */

define(function(require) {
    'use strict';

    var Backbone = require('backbone'),
        MINI = require('minified'),
        _=MINI._, $=MINI.$, $$=MINI.$$;

    Backbone.View.prototype.destroy = function(){

        this.el.innerHTML='';    // remove view from DOM
        this.undelegateEvents(); // Unbind all local event bindings

        delete this.el;          // delete wrapper
        delete this.$el;         // delete wrapper

        if (this.destructor) this.destructor(); // for manual destroying just include destructor to backbone view
    }

    var app = {}
    return app;
});