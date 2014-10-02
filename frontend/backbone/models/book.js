/**
 * Created by khanhnh on 25/09/2014.
 */

define(function(require){
    'use strict';

    var Backbone = require('backbone'),
        comm = require('comm');

    return Backbone.Model.extend({
        sync: function(action, model, options)
        {
            switch (action)
            {
                case 'create':
                    var request = model.attributes;
                    comm.send(request, 'book/create', function(err, data)
                    {
                        if(!err) options.success(data);
                        else options.error(err);
                    });
                    return;
                case 'update':
                    var request = model.attributes;
                    comm.send(request, 'book/update/'+request.id, function(err, data)
                    {
                        if(!err) options.success(data);
                        else options.error(err);
                    });
                    return;
                case 'read':
                    var id = model.attributes.id;
                    comm.send(null, 'book/findById/'+id, function(err, data)
                    {
                        if(!err) options.success(data);
                        else options.error(err);
                    });
                    return;
                case 'delete':
                    var id = model.attributes.id;
                    comm.send(null, 'book/delete/'+id, function(err, data)
                    {
                        if(!err) options.success(data);
                        else options.error(err);
                    });
                    return;
                default:
                    callback('Invalid action');
            }
        }
    });
})
