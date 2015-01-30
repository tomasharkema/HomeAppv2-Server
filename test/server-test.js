process.env.NODE_ENV = "TEST";
process.env.PORT = 7000;
var assert = require("assert");
var request = require("request");
var fs = require("fs");

describe('Server', function(){
    describe('server - socket', function(){
        it('should come up', function(done){
            var server = require('../bin/server');
            var client = require('../bin/client');

            setTimeout(function(){
                done();
            }, 1000);
        });
    });
    describe('server - frontend', function(){
        it('should come up', function(done){
            var server = require('../bin/server');

            request("http://localhost:" + process.env.PORT, function(err, res, body){
                if (err) {
                    return done(err);
                }

                done(assert.equal(res.statusCode, 200, "Should return 200"));
            });
        });
    });
});