var express = require('express');
var router = express.Router();
var log = require.main.require('../lib/logentries');
var ResponseFormatter = require.main.require('../lib/response-formatter');

var mongoose = require('mongoose');
var User = mongoose.model('User');

// Login
router.post('/', function(req, res, next) {
    if (!req.body || !req.body.password || !req.body.email) {
        var err = new Error("Missing fields.")
        log.err(err);
        return res.status(404).send(ResponseFormatter(err, null));
    }

    User.login(req.body.email, req.body.password, function (err, user) {
        if (err) {
            log.err(err);
            return res.status(404).send(ResponseFormatter(err, null));
        }
        return res.send(ResponseFormatter(err, user));
    });
});

// Register
router.post('/register', function(req, res, next) {
    if (!req.body || !req.body.username || !req.body.password || !req.body.email) {
        var err = new Error("Missing fields.")
        log.err(err);
        return res.status(404).send(ResponseFormatter(err, null));
    }
    User.register(req.body.username, req.body.password, req.body.email, function (err) {
        if (err) {
            log.err(err);
            return res.status(404).send(ResponseFormatter(err, null));
        }
        return res.send(ResponseFormatter(err, "OK"));
    });
});

module.exports = router;
