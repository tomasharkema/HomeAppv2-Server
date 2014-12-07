var mongoose = require("./db");
var Schema = mongoose.Schema;
var EventEmitter = require('events').EventEmitter;
var emitter = new EventEmitter();

var t = require("./type");
var typeSchema = t.typeSchema;
var Type = t.Type;

var deviceSchema = new Schema({
    name: String,
    type: String,
    state: Boolean,
    type:[{type: Schema.Types.ObjectId, ref: 'Type'}]
});

deviceSchema.statics.once = function(cb){
    emitter.once('change', cb);
};

deviceSchema.statics.change = function(cb){
    emitter.on('change', cb);
};

deviceSchema.statics.findByName = function(name, cb){
    Device.findOne({name:name}).exec(cb);
};

deviceSchema.statics.setOnline = function(config, cb) {
    Device.findByName(config.name, function(err, d){
        if (d) {
            d.turnOn(function(){
                cb(d);
            });
        } else {
            var d = new Device(config);
            d.state = true;
            d.save(function(){
                cb(d);
            });
        }
    });
};

deviceSchema.methods.turnOff = function(cb){
    this.state = false;
    this.save(cb);
};

deviceSchema.methods.turnOn = function(cb){
    this.state = true;
    this.save(cb);
};

deviceSchema.methods.addType = function(name, cb) {
    var self = this;
    var id = this._id;
    Type.findOne({name:name}).exec(function(err, t){
        var callback = function(type){
            self.type.push(type._id);
            self.save(function(err){
                cb();
            });
        };
        if (t) {
            callback(t);
        } else {
            var t = Type({name:name});
            t.save(function(err){
                callback(t);
            });
        }
    });
}

deviceSchema.post('save', function(doc){
    emitter.emit('change', doc);
});

var Device = mongoose.model('Device', deviceSchema);

module.exports = Device;