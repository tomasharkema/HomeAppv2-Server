process.env.NODE_ENV = "TEST";

var assert = require("assert");

var Switch = require('../lib/switch');

describe('Switch', function(){
    describe('#turnOff', function(){
        it('should be turned off afterwards', function(){
            var s = new Switch();
            s.turnOff();
            assert.equal(s.state, false);
        })
    })
    describe('#turnOn', function(){
        it('should be turned on afterwards', function(){
            var s = new Switch();
            s.turnOn();
            assert.equal(s.state, true)
        })
    })
})
