var config = require('./config-wrapper');
var Logger = require('le_node');
var log = new Logger({
    token: config('LOGENTRIES_TOKEN')
});

module.exports = log;