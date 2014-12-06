var assert = require("assert");

var Devices = require('../lib/device').Devices;
Devices.setTest();
var Device = require('../lib/device').Device;

beforeEach(function(){
    return Devices.devices.remove({}).then(function() {
        return Devices.devices.save({name:"Test Device", type:"tester"});
    });
})

describe('Devices', function(){
    describe('#addDevice', function(){
        it('should have 1 device more.', function(done){
            return Devices.addDevice({name:"Test Device2", type:"tester"}).then(function(res){
                return Devices.getAll().then(function(res){
                    if (res.length === 2) {
                        done();
                    } else {
                        throw new Error("");
                    }
                })
            })
        })
    })
})
