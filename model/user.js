var mongoose = require('mongoose');
var Authentication = mongoose.model('Authentication');

var schema = new mongoose.Schema({
    Authentications: { type: [Authentication] },
    Username: { type: String },
    Password: { type: String },
    Password_Salt: { type: String },
    Email: { type: String },
    CreatedOn: { type: Date, default: Date.now }
});

var User = module.exports = mongoose.model('User', schema);