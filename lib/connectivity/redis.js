const redis = require('redis');

module.exports = function(){
    if (process.env.NODE_ENV === "production") {
        return redis.createClient(3022, "50.30.35.9", "tomasharkema:4fd5c4fbc16d381d92f043cf305f1498");
    } else if (process.env.NODE_ENV === "staging") {
        return redis.createClient(3119, "50.30.35.9", "tomasharkema:9636ce5ae6f71698b9ab5a8ac5e204e8");
    } else if (process.env.NODE_ENV === "TEST") {
        return redis.createClient();
    } else {
        return redis.createClient();
    }
};