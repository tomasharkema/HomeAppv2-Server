process.env.NODE_ENV = "TEST";

var assert = require("assert");
var Device = require('../lib/device').Device;

beforeEach(function(done){
    return Device.remove({}, function() {
        var d = new Device({name:"testDevice", type:"test"});
        return d.save(function(){
            done();
        });
    });
})

describe('Devices', function(){
    describe('#addDevice', function(){
        it('should have 2 devices after add 1 device', function(done){
            var d = new Device({name:"testDevice", type:"test"});
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
    })
})
