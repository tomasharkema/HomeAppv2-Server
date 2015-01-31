var fs = require("fs");
var crypto = require("crypto");

var path = "";
if (process.env.NODE_ENV == "TEST") {
    path = "test/identifier";
} else {
    path = "identifier";
}

function random() {
    var current_date = (new Date()).valueOf().toString();
    var random = Math.random().toString();
    return crypto.createHash('sha1').update(current_date + random).digest('hex');
}

function Identify() {
    this.init();
}

Identify.prototype = {
    identifier: 0,
    init :function(){
        if (fs.existsSync(path)) {
            this.identifier = fs.readFileSync(path).toString();
        } else {
            var identifier = random();
            fs.writeFileSync(path, identifier);
            this.identifier = identifier.toString();
        }
    },
    remove:function() {
        fs.unlinkSync(path);
    }
};

module.exports = Identify;