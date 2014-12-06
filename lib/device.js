var mongojs = require('promised-mongo');
var db = mongojs("homeappv2");

//console.log(process.env);

function Devices() {
    this.devices = db.collection('devices');
}

Devices.prototype = {
    addDevice: function(a){
        return this.devices.save(a);
    },
    getAll:function(){
        return this.devices.find({}).toArray();
    },

    setTest: function(){
        this.devices = db.collection('devices.test')
    }.bind(this)
};

exports.Devices = new Devices();

function Device() {

}

Device.prototype = {};

exports.Device = Device;