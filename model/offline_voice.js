var mongoose = require('mongoose');

var schema = new mongoose.Schema({
    URL: {type: String},
    User_ID: {type: mongoose.Schema.Types.ObjectId},
    Published: {type: Boolean, default: false},
    CreatedOn: {type: Date, default: Date.now}
});

schema.statics.create = function (_id, url, user_id, callback) {

    var obj = new OfflineVoice();
    obj._id = _id;
    obj.URL = url;
    obj.User_ID = user_id;
    obj.save(function (err) {
        callback(err);
    });

};

schema.statics.list = function (user_id, callback) {

    // Get all published voice that is not submitted by the user.
    OfflineVoice.find({$and: [{User_ID: {$ne: user_id}}, {Published: true}]}, function (err, list) {
        callback(err, list);
    });

};

schema.statics.setPublished = function (_id, callback) {

    this.findOne({'_id': _id}, function (err, offlineVoice) {
        if (err) return callback(err);

        if (!offlineVoice) {
            return callback(new Error("OfflineVoice not found."));
        }

        offlineVoice.Published = true;
        offlineVoice.save(function (err) {
            callback(err);
        });

    });

};

schema.statics.delete = function (_id, callback) {

    this.findOne({'_id': _id}, function (err, offlineVoice) {
        if (err) return callback(err);

        if (!offlineVoice) {
            return callback(new Error("OfflineVoice not found."));
        }

        offlineVoice.remove(function (err) {
            callback(err);
        });

    });

};

var OfflineVoice = module.exports = mongoose.model('OfflineVoice', schema);