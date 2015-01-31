const redis = require('redis');

module.exports = function(){
    var instance;
    if (process.env.NODE_ENV === "production") {
        instance = redis.createClient(3022, "50.30.35.9");
        instance.auth("tomasharkema:4fd5c4fbc16d381d92f043cf305f1498");
    } else if (process.env.NODE_ENV === "staging" || process.env.NODE_ENV === "accept") {
        instance = redis.createClient(3119, "50.30.35.9");
        instance.auth("tomasharkema:9636ce5ae6f71698b9ab5a8ac5e204e8");
    } else if (process.env.NODE_ENV === "TEST") {
        instance = redis.createClient();
    } else {
        instance = redis.createClient();
    }

    return instance;
};