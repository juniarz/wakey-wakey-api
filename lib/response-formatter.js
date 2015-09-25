var formatter = function(err, data) {
    var ret = {};

    if (err) ret.error_msg = err.message;

    ret.body = data;

    return ret;
};

module.exports = formatter;