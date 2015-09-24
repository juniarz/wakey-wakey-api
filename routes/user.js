var express = require('express');
var router = express.Router();
var log = require.main.require('../lib/logentries');

var mongoose = require('mongoose');
var User = mongoose.model('User');

// Login
router.post('/', function(req, res, next) {
    User.login(req.body.email, req.body.password, function (err, user) {
        if (err) {
            log.err(err);
            return res.status(404).send(err);
        }
        return res.send(user);
    });
});

// Register
router.get('/register', function(req, res, next) {
    new User().register("jiarong", "abc", "123@email.com", function (err) {
        if (err) {
            log.err(err);
            return res.status(404).send(err);
        }
        return res.send("OK");
    });
});

module.exports = router;
