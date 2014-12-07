var mongoose = require('mongoose');

var url;
if (process.env.NODE_ENV === "production") {
    url = "mongodb://homeapp:homeapp@ds057000.mongolab.com:57000/homeappv2";
} else if (process.env.NODE_ENV === "staging") {
    url = "mongodb://homeapp:homeapp@ds057000.mongolab.com:57000/homeappv2-staging";
} else if (process.env.NODE_ENV === "TEST") {
    url = "mongodb://localhost/homeappv2test";
} else {
    url = "mongodb://localhost/homeappv2";
}

mongoose.connect(url);
console.log(process.env.NODE_ENV, "connect to", url);

module.exports = mongoose;