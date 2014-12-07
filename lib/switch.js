// switch.js

function Switch(){
    this.id = -1;
    this.name = "";
    this.brand = "";
    this.code = "";
    this.switch = "";
    this.state = false;
}

Switch.serialize = function(obj){
    var instance = new Switch();
    instance.id = obj.id || -1;
    instance.name = obj.name || "";
    instance.brand = obj.brand || "";
    instance.code = obj.code || "";
    instance.switch = obj.switch || "";
    instance.state = (obj.switch === "on" || obj.switch === 1);
};

Switch.prototype = {
    turn: function(state){
        this.state = state;
        return this;
    },
    turnOn: function(){
        this.turn(true);
        return this;
    },
    turnOff: function(){
        this.turn(false);
        return this;
    },

    getRaspberryCommand:function(){
        return [this.brand, this.code, this.switch, this.state];
    }
};

module.exports = Switch;