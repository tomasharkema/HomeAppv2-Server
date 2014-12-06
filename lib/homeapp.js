var Device = require("./device");

var device = {
    sendAll:function(socket){
        Device.find({}, function(err, docs){
            socket.emit("all", docs);
        });
    }
};

module.exports = function(app, io){

    var devices = io.of("/devices");

    // handle inbound device connections
    devices.on('connection', function(socket){
        device.sendAll(socket);
    });

    Device.on(function(){
        device.sendAll(socket);
    });

};