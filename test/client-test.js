process.env.NODE_ENV = "TEST";
process.env.PORT = 7000;
var assert = require("assert");


describe('Client', function(){
    describe('server', function(){
        it('should come up', function(done){
            var server = require('../bin/server');
            var client = require('../bin/client');

            setTimeout(function(){
                done();
            }, 1000);
        })
    });
})