var io = require('socket.io-client');
var config = require('./config.json');

var Identify = require("./lib/client/identify");

var identifier = new Identify();

var url = "";

if (config.env === "development") {
    url = "http://localhost:"+(process.env.PORT || 4000)+"/"
} else if (config.env === "staging") {
    url = "http://homeappv2-staging.herokuapp.com/"
} else {
    url = "http://homeappv2.herokuapp.com/"
}

console.log("connect", url);
config.identifier = identifier.identifier;

var socket = io.connect(url + "device");

socket.on('connect', function(){
    socket.emit("identification", config, function(isConnected){
        if (!isConnected) {
            console.log("\n\n------------");
            console.log("Hi there! Your device has not yet been assigned to a user. Please, serve to " + url + " and enter the following device-code:", identifier.identifier);
        }
    });
});

socket.on("found_user", function(user){
    console.log("You're now owned by", user.name);
});

socket.on("config", function(config){
    console.log("config", config);
});