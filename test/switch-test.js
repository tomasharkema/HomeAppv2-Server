/*var vows = require('vows'),
    assert = require('assert');

vows.describe('The Switches').addBatch({
    'A Swtich': {
        topic: new(Switch),

        'when turned off *synchronously*': {
            topic: function(sw) {
                return sw.turnOff();
            },
            'has been turned off': function(topic) {
                assert.isFalse(!topic.state);
            }
        },
        'when turned on *synchronously*': {
            topic: function(sw) {
                return sw.turnOn();
            },
            'has been turned on': function(topic) {
                assert.isTrue(topic.state);
            }
        },
        'when get raspberrycommand': {
            topic: function(sw){
                return sw.getRaspberryCommand();
            },
            'should recieve array with commands':function(topic){
                assert.isArray(topic);
            }
        }
    }
}).export(module);*/

var assert = require("assert");

var Switch = require('../lib/Switch');

describe('Switch', function(){
    describe('#turnOff', function(){
        it('should be turned off afterwards', function(){
            var s = new Switch();
            s.turnOff();
            assert.equal(s.state, false);
        })
    })
    describe('#turnOff', function(){
        it('should be turned on afterwards', function(){
            var s = new Switch();
            s.turnOn();
            assert.equal(s.state, true)
        })
    })
})
