var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/'+((process.env.NODE_ENV === "TEST") ? "homeappv2test":"homeappv2" )+'');
var Schema = mongoose.Schema;

var deviceSchema = new Schema({ name: String, type: String });
var Device = mongoose.model('Device', deviceSchema);

exports.Device = Device;