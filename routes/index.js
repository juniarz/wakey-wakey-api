/**
 * Created by Jia Rong on 9/25/2015.
 */
var express = require('express');
var router = express.Router();

var ResponseFormatter = require.main.require('../lib/response-formatter');

router.get('/_status', function (req, res, next) {
    res.send(ResponseFormatter(null, "OK"));
});

router.get('/', function (req, res, next) {
    res.send(ResponseFormatter(null, "OK"));
});

module.exports = router;
