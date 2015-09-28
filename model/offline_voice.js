var mongoose = require('mongoose');

var schema = new mongoose.Schema({
    URL: {type: String},
    User_ID: {type: mongoose.Schema.Types.ObjectId},
    Published: {type: Boolean, default: false},
    CreatedOn: {type: Date, default: Date.now},
	Listened: {type: [mongoose.Schema.Types.ObjectId]}
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

    var query = [{Published: true}];

    if (user_id) {
        query.push({User_ID: {$ne: user_id}});
        query.push({Listened: {$nin: [user_id]}});
    }
    // Get all published voice that is not submitted by the user.
    OfflineVoice.find({$and: query}, function (err, list) {
        callback(err, list);
    });

};

schema.statics.setPublished = function (_id, callback) {
	
	OfflineVoice.findByIdAndUpdate(_id, {Published: true}, {upsert: false}, function(err, model) {
		callback(err);
	});
};

schema.statics.listened = function (_id, user_id, callback) {
	
	OfflineVoice.findByIdAndUpdate(_id, {$push: {Listened: user_id}}, {upsert: false}, function(err, model) {
		callback(err);
	});
}

schema.statics.clearListened = function (user_id, callback) {

    OfflineVoice.update({Listened: {$in: [user_id]}}, { $set: { Listened: [] }}, {multi: true}, function(err, model) {
        callback(err);
    });
}

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
