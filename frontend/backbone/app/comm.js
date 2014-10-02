/**
 * Created by khanhnh on 29/09/2014.
 */

define(function(require){
    'use strict';

    var comm =
        {
            host: "http://localhost:8080/",
            debug: '?XDEBUG_SESSION_START=19521',
            send: function (request, url, cb)
            {
                var con = new XMLHttpRequest();
                con.onload = function(){
                    if (con.status == 200)
                    {
                        cb(null, con.response);
                    }
                    else cb(con.status);
                };
                con.responseType = 'json';
                con.dataType = 'json'
                con.open('POST', this.host + url + this.debug, true);
                if (!request) con.send();
                else
                {
                    con.send(JSON.stringify(request));
                }
            }
        };
    return comm;
})
