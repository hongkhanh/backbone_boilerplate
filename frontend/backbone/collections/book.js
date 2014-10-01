/**
 * Created by khanhnh on 25/09/2014.
 */

define(function(require){
    'use strict';

    var Backbone = require('backbone'),
        comm = require('comm'),
        Book = require('model:book');

    return Backbone.Collection.extend({
        model: Book,
        sync: function(action, model, options)
        {
            switch (action)
            {
                case 'create':
                    return;
                case 'update':
                    return;
                case 'read':
                    comm.send(null, 'book/findAll', function(err, data)
                    {
                        if(!err) options.success(data);
                        else options.error(err);
                    });
                    return;
                case 'delete':
                    return;
                default:
                    callback('Invalid action');
            }
        }
    });
})
