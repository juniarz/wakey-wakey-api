var express = require('express');
var router = express.Router();
var log = require.main.require('../lib/logentries');

router.get('/_status', function(req, res, next) {
  res.send("OK");
});

router.get('/', function(req, res, next) {
  log.info("SIAO EHH");
  res.send("OK");
});

module.exports = router;
