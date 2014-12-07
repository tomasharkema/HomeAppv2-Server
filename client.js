var io = require('socket.io-client');
var config = require('./config.json');

var url = "";

if (config.env === "development") {
    url = "http://localhost:"+(process.env.PORT || 3000)+"/"
} else if (config.env === "staging") {
    url = "http://homeappv2-staging.herokuapp.com/"
} else {
    url = "http://homeappv2.herokuapp.com/"
}


var socket = io.connect(url + "device");

socket.on('connect', function(){
    socket.emit("config", config);
});