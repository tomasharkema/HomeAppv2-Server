var Device = require("./device");

var d = {
    sendAll:function(socket){
        Device.find({}, function(err, docs){
            socket.emit("all", docs);
        });
    }
};

module.exports = function(app, io){

    var devices = io.of("/devices");
    var device = io.of("/device");

    // handle inbound device connections
    devices.on('connection', function(socket) {
        d.sendAll(socket);
    });

    device.on('connection', function(socket) {
        var d;
        socket.on('config', function(config) {
            console.log("config", config);
            Device.setOnline(config, function(device){
                d = device;
            });
        });

        socket.on('disconnect', function(){
            d.turnOff();
        });
    });

    Device.change(function(){
        d.sendAll(devices);
    });
};