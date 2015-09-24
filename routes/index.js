var express = require('express');
var router = express.Router();
var config = require('config');
var Logger = require('le_node');
var log = new Logger({
  token: config.get('LOGENTRIES_TOKEN')
});

router.get('/_status', function(req, res, next) {
  res.send("OK");
});

router.get('/', function(req, res, next) {
  res.send("OK");
});

module.exports = router;
