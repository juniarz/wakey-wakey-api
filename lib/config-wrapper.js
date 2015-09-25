var config = require('config');

var wrapper = function (key) {

    if (process.env[key]) {
        return process.env[key];
    }

    return config.get(key);
};

module.exports = wrapper;