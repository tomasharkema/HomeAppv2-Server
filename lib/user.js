var mongoose = require("./connectivity/db");
var Schema = mongoose.Schema;

var Device = require("./device");

var userSchema = new Schema({
    name: String,
    id: String
});

userSchema.statics.findByUID = function(id, cb){
    User.findOne({id: id}).exec(cb);
};

userSchema.statics.findOrCreateUser = function(userid, cb){
    console.log(userid);
    User.findByUID(userid, function(err, obj) {
        if (obj === null) {
            var user = new User();
            user.name = "Tomas";
            user.id = userid;
            user.save();
            obj = user;
        }

        cb(obj);
    });
};

userSchema.methods.getDevices = function(cb){
    Device.findByUser(this._id, cb);
};

var User = mongoose.model('User', userSchema);

module.exports = User;