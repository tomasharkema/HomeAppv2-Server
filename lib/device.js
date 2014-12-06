var mongoose = require("./db");
var Schema = mongoose.Schema;
var EventEmitter = require('events').EventEmitter;
var emitter = new EventEmitter();
var deviceSchema = new Schema({
    name: String,
    type: String,
    state: Boolean
});

deviceSchema.statics.once = function(cb){
    emitter.once('change', cb);
};

deviceSchema.statics.on = function(cb){
    emitter.on('change', cb);
};

deviceSchema.methods = {
    turnOff: function(cb){
        var name = this.name;
        Device.update({name:name}, {$set:{state:false}}, cb);
    }
};

deviceSchema.post('save', function(doc){
    emitter.emit('change', doc);
});

var Device = mongoose.model('Device', deviceSchema);

module.exports = Device;