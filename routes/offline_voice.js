/**
 * Created by Jia Rong on 9/25/2015.
 */
var express = require('express');
var router = express.Router();

var config = require.main.require('../lib/config-wrapper');
var aws = require('aws-sdk');
aws.config.update({accessKeyId: config("AWS.ACCESS_KEY"), secretAccessKey: config("AWS.SECRET")});
var s3 = new aws.S3();
var uuid = require('node-uuid');

var mongoose = require('mongoose');
var OfflineVoice = mongoose.model('OfflineVoice');

router.get('/', function (req, res, next) {
    OfflineVoice.list(req.query.user_id, function (err, list) {
        if (err) {
            log.err("Failed to list OfflineVoice: " + err);
            return res.status(404).send(err);
        }

        res.send(list);
    });
});

router.get('/published', function (req, res, next) {
    OfflineVoice.setPublished(req.query._id, function (err) {
        if (err) {
            log.err("Failed to update OfflineVoice: " + err);
            return res.status(404).send(err);
        }

        res.sendStatus(201);
    });
});

router.get('/sign', function (req, res, next) {
    var filename = uuid.v4();
    var offlineVoice_id = mongoose.Types.ObjectId();
    var params = {
        Bucket: config("AWS.S3_BUCKET"),
        Key: filename + "." + req.query.file_ext,
        Expires: 60,
        ACL: 'public-read',
        Metadata: {
            user_id: req.query.user_id
        }
    };

    s3.getSignedUrl('putObject', params, function (err, signedUrl) {
        if (err) {
            console.log(err);
        }
        else {

            OfflineVoice.create(offlineVoice_id, 'https://' + config("AWS.S3_BUCKET") + '.s3.amazonaws.com/' + filename + "." + req.query.file_ext, req.query.user_id, function (err) {
                if (err) {
                    log.err("Failed to create OfflineVoice: " + err);
                    return res.status(404).send(err);
                }

                res.send({
                    offlineVoice_id: offlineVoice_id,
                    url: signedUrl
                });
            });
        }
    });
});

module.exports = router;
