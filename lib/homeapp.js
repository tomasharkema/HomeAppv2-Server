var Device = require("./device");
var User = require("./user");

var d = {
    sendAll:function(socket){
        Device.find({}, function(err, docs){
            socket.emit("all", docs);
        });
    }
};

function userAuthenticated(user, socket) {
    console.log(user, "authed");
    socket.emit("authenticated", user);

    user.getDevices(function(devices){
        socket.emit("all", devices);
    });

    socket.on("add_device", function(id, cb){
        console.log("find", id);

        Device.findOne({identifier:id}).exec(function(err, dev){
            if (dev === null) {
                console.log("No device found.");
                return cb(false);
            }

            if (dev.user !== undefined) {
                console.log("Device already connected");
                return cb(false);
            }

            console.log("Device found!");
            dev.user = user._id;
            dev.save(function(){
                cb(true);
            });
        });
    });
}

module.exports = function(app, io){

    var client = io.of("/clients");
    var device = io.of("/device");

    client.on('connection', function(socket) {
        socket.on('authentication', function(user){
            User.findOrCreateUser(user, function(authenticated){
                console.log("AUTH", authenticated);
                if (authenticated !== undefined && authenticated !== null) {

                    userAuthenticated(authenticated, socket);

                    //Device.change(function(){
                    //    d.sendAll(client);
                    //});
                } else {
                    socket.emit("unauthorized");
                }
            });
        });
    });

    // handle inbound device connections
    device.on('connection', function(socket) {
        var d;
        socket.on('identification', function(config, cb) {
            Device.setOnline(config, function(device){
                d = device;
                if (device.user === undefined) {
                    cb(false);
                } else {
                    cb(true);
                }
                device.onSave(function(){
                    console.log("SAVED!!");
                });
            });
        });

        socket.on('disconnect', function(){
            d.turnOff();
        });
    });
};