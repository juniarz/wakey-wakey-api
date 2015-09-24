var config = require('config');
var Logger = require('le_node');
var log = new Logger({
    token: config.get('LOGENTRIES_TOKEN')
});

module.exports = log;