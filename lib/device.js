var mongoose = require("./db");
var Schema = mongoose.Schema;
var EventEmitter = require('events').EventEmitter;
var emitter = new EventEmitter();
var typeSchema = require("./type").typeSchema;
var Type = require("./type").Type;

var deviceSchema = new Schema({
    name: String,
    state: Boolean,
    identifier: String,
    type:[{type: Schema.ObjectId, ref: 'Type'}],
    user:{type: Schema.ObjectId, ref: 'User'}
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

deviceSchema.statics.findByUser = function(name, cb){
    Device.find({user:name._id}).exec(cb);
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
                console.log("SAVED", config);
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