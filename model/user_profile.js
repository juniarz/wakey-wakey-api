var mongoose = require('mongoose');

var schema = new mongoose.Schema({
    Username: {type: String},
    Email: {type: String}
});

var UserProfile = module.exports = mongoose.model('UserProfile', schema);