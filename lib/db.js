var mongoose = require('mongoose');
var url = (process.env.NODE_ENV === "production")
    ? "mongodb://homeapp:homeapp@ds057000.mongolab.com:57000/homeappv2"
    : ('mongodb://localhost/' + ((process.env.NODE_ENV === "TEST")
        ? "homeappv2test"
        :"homeappv2"));

mongoose.connect(url);
console.log("connect to", url);

module.exports = mongoose;