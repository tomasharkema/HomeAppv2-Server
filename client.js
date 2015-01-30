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
console.log("identify", identifier.identifier);
config.identifier = identifier.identifier;

var socket = io.connect(url + "device");

socket.on('connect', function(){
    socket.emit("config", config);
    socket.emit("identify", identifier.identifier);
    socket.on("identification", function(res){

    });
});