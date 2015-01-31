var mongoose = require("./db");
var utilities = require('mongoose-utilities');
var Schema = mongoose.Schema;
var typeSchema = require("./type").typeSchema;
var Type = require("./type").Type;

const redis = require('redis'),
    publish = redis.createClient();


var deviceSchema = new Schema({
    name: String,
    state: Boolean,
    identifier: String,
    type:[{type: Schema.ObjectId, ref: 'Type'}],
    user:{type: Schema.ObjectId, ref: 'User'}
});

deviceSchema.statics.findByName = function(name, cb){
    Device.findOne({name:name}).exec(cb);
};

deviceSchema.statics.findById = function(id, cb) {
    Device.findOne({identifier:id}).exec(cb);
};

deviceSchema.statics.findByUser = function(name, cb){
    Device.find({user:name._id}).exec(cb);
};

deviceSchema.statics.setOnline = function(config, cb) {
    Device.findById(config.identifier, function(err, d){
        if (d) {
            d.turnOn(function(){
                cb(d);
            });
        } else {
            var d = new Device(config);
            d.state = true;
            d.user = "";
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
};

deviceSchema.post('save', function(doc){
    var instance = process.env.NODE_ENV+":device:"+doc._id;
    console.log("save", instance);
    publish.publish(instance, JSON.stringify(doc));
});

deviceSchema.methods.onSaveOnce = function(cb){
    const subscribe = redis.createClient();
    var instance = process.env.NODE_ENV+":device:"+this._id;
    subscribe.subscribe(instance);
    console.log("subs", instance);
    subscribe.on('message', function (channel, doc) {
        console.log("message", instance);
        if (instance === channel) {
            if (cb(JSON.parse(doc)) === true) {
                subscribe.unsubscribe();
                subscribe.end();
            }
        }
    });
}

var Device = mongoose.model('Device', deviceSchema);
module.exports = Device;