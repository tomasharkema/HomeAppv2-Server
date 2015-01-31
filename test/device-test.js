process.env.NODE_ENV = "TEST";

var assert = require("assert");
var should = require('should');
var Device = require('../lib/device');
var Type = require('../lib/type').Type;

beforeEach(function(done){
    return Type.remove({}, function() {
        return Device.remove({}, function () {
            var t = new Type({name: "durr"});
            t.save(function () {
                Type.findOne({name: "durr"}, function (err, t) {
                    var d = new Device();
                    d.name = "test";
                    d.state = false;
                    d.identifier = "asfasdfasdf";
                    d.type.push(t._id);
                    return d.save(function () {
                        done();
                    });
                });
            });
        });
    });
});

describe('Devices', function(){
    describe('#addDevice', function(){
        it('should have 2 client after add 1 device', function(done){
            var d = new Device();
            d.name = "test";
            d.identifier = "asdf";
            return d.save(function(){
                return Device.find({}).exec(function(err, res){
                    res.should.have.length(2);
                    done();
                })
            });
        });

        it('should call my handler once when I add a device', function(done){
            var d = new Device();
            d.name = "test";
            d.save(function(){
                Device.findOne({name:"test"}).exec(function(err, doc){
                    doc.onSaveOnce(function(){
                        done();
                        return true;
                    });
                    doc.name = "test1";
                    // FIXME: this should be resolved very quick
                    setTimeout(function(){
                        doc.save();
                    }, 100);
                    setTimeout(function(){
                        doc.save();
                    }, 200);
                });
            });
        })
    });

    describe('#findByName', function(){
        it('should return the proper device', function(done){
            Device.findByName("test", function(err, d){
                if (d.name === "test") {
                    done();
                } else {
                    throw new Error();
                }
            })
        })
    })
});


describe('Device', function(){
    describe('#turn', function(){
        it('should turn off when called', function(done){
            Device.findOne({name:"test"}).exec(function(err, d){
                if (err) throw new Error(err);
                d.turnOff(function(){
                    Device.findOne({name:"test"}).exec(function(err, d) {
                        if (!d.state) {
                            done();
                        } else {
                            throw new Error();
                        }
                    });
                });
            });
        });

        it('should turn on when called', function(done){
            Device.findOne({name:"test"}).exec(function(err, d){
                if (err) throw new Error(err);
                d.turnOn(function(){
                    Device.findOne({name:"test"}).exec(function(err, d) {
                        if (d.state) {
                            done();
                        } else {
                            throw new Error();
                        }
                    });
                });
            });
        })
    });

    describe('#addType', function(){
        it('should have 1 type after add one type', function(done){
            Device.findOne({name:"test"}).exec(function(err, d){
                d.addType("temp", function(){
                    Device.findOne({name:"test"}).exec(function(err, d) {
                        if (d.type.length === 2) {
                            done();
                        } else {
                            throw new Error();
                        }
                    });
                });
            });
        });
    });
});