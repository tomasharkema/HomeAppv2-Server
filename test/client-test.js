process.env.NODE_ENV = "TEST";
process.env.PORT = 7000;
var assert = require("assert");
var request = require("request");
var fs = require("fs");
var Identifier = require("../lib/client/identify.js");

beforeEach(function(done){
    var identifier = new Identifier();
    identifier.remove();
    done();
});

describe('Client', function(){
    describe('identifier', function(){
        it("should get an new identifier", function(){
            var identifier = new Identifier();

            assert.equal(true, fs.existsSync("test/identifier"), "test/identifier hasn't be created");
        });

        it('should not have an empty identifier', function() {
            var identifier = new Identifier();

            assert.notEqual(identifier, undefined);
            assert.notEqual(identifier, "");
        });
    });
});