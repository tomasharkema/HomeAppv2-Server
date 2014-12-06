var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/'+((process.env.NODE_ENV === "TEST") ? "homeappv2test":"homeappv2" )+'');

module.exports = mongoose;