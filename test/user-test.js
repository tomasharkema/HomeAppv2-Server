process.env.NODE_ENV = "TEST";

var assert = require("assert");
var should = require("should");
var User = require('../lib/user');

beforeEach(function(done){
    return User.remove({}, function(){
        done();
    });
});

describe("User", function(){
    describe("add", function(){
        it("should add an new user", function(done){
            var user = new User({name:"tomas", id:"1"});
            user.save(function(){
                User.find({}).exec(function(err, docs){
                    if (err) {
                        done(err);
                    }

                    docs.should.have.length(1);
                    done();
                });
            });
        });
    });
    describe("findOrCreateUser", function(){
        it("should add an new user when not found", function(done){
            User.findOrCreateUser("1", function(authenticated){
                done(assert.equal(authenticated.name, "Tomas"));
            });
        });
        it("should add an new user only once", function(done){
            User.findOrCreateUser("1", function(a){
                User.findOrCreateUser("1", function(a){
                    User.find({}).exec(function(err, docs){
                        docs.should.have.length(1);
                        done();
                    });
                });
            });
        });
    });
});