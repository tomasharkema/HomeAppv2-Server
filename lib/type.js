var mongoose = require("./connectivity/db");
var Schema = mongoose.Schema;

var typeSchema = new Schema({
    name: String
});

var Type = mongoose.model('Type', typeSchema);

exports.Type = Type;
exports.typeSchema = typeSchema;