var mongoose = require('mongoose');
var config = require('config');
var moment = require('moment');

var schema = new mongoose.Schema({
    Accesstoken: { type: String },
    Client_ID: { type: String },
    Client_OS: { type: String },
    Client_Type: { type: String },
    Client_Version: { type: String },
    GCM_Token: { type: String },
    APN_Token: { type: String },
    CreatedOn: { type: Date, default: Date.now },
    ExpireOn: { type: Date, default: moment().add(config.get("TOKEN_EXPIRY_IN_DAYS"), 'days') },
    ModifiedOn: { type: Date }
});

var Authentication = module.exports = mongoose.model('Authentication', schema);