process.env.NODE_ENV = "TEST";

var assert = require("assert");
var Device = require('../lib/device');

beforeEach(function(done){
    return Device.remove({}, function() {
        var d = new Device();
        d.name = "test";
        return d.save(function(){
            done();
        });
    });
})

describe('Devices', function(){
    describe('#addDevice', function(){
        it('should have 2 devices after add 1 device', function(done){
            var d = new Device();
            d.name = "test";
            return d.save(function(){
                return Device.find({}, function(err, res){
                    if (res.length === 2) {
                        done();
                    } else {
                        throw new Error();
                    }
                })
            });
        })

        it('should call my handler when I add a device', function(done){
            var d = new Device();
            d.name = "test";
            Device.once(function(){
                done();
            });
            d.save();
        })
    })
})


describe('Device', function(){
    describe('#turnOff', function(){
        it('should turn off when called', function(done){
            Device.findOne({}, function(err, d){
                d.turnOff(function(d){
                    done();
                });
            });
        })
    })
})