var crypto = require('crypto');
var uuid = require('node-uuid');

var mongoose = require('mongoose');
var Authentication = mongoose.model('Authentication');
var UserProfile = mongoose.model('UserProfile');

var schema = new mongoose.Schema({
    Authentications: {type: [Authentication]},
    Username: {type: String},
    Password: {type: String},
    Password_Salt: {type: String},
    Email: {type: String},
    CreatedOn: {type: Date, default: Date.now}
});

var hashPassword = function (password, salt, callback) {
    var iterations = 10000,
        keyLen = 64;
    crypto.pbkdf2(password, salt, iterations, keyLen, callback);
};

schema.statics.register = function (username, password, email, callback) {

    this.findOne({$or: [{'Username': username}, {'Email': email}]}, function (err, existingUser) {
        if (err) return callback(err);

        if (existingUser) {
            return callback(new Error("Username or Email is taken."));
        }

        var user = new User();
        var passwordSalt = uuid.v4();
        hashPassword(password, passwordSalt, function (err, passwordHash) {
            user.Username = username;
            user.Password = passwordHash;
            user.Password_Salt = passwordSalt;
            user.Email = email;
            user.save(function (err) {
                callback(err);
            });
        });

    });
};

schema.statics.login = function (email, password, callback) {
    this.findOne({Email: email}, function (err, user) {
        if (err) return callback(err, null);

        if (user) {
            return hashPassword(password, user.Password_Salt, function (err, passwordHash) {
                if (passwordHash == user.Password) {
                    var userProfile = new UserProfile();
                    userProfile._id = user._id;
                    userProfile.Username = user.Username;
                    userProfile.Email = user.Email;
                    return callback(null, userProfile);
                } else {
                    return callback(new Error("Wrong password."), null);
                }
            });
        }

        return callback(new Error("Not found."), null);
    });
};

var User = module.exports = mongoose.model('User', schema);