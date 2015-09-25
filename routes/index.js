/**
 * Created by Jia Rong on 9/25/2015.
 */
var express = require('express');
var router = express.Router();

router.get('/_status', function (req, res, next) {
    res.send("OK");
});

router.get('/', function (req, res, next) {
    res.send("OK");
});

module.exports = router;
