const constant = require( '../constant/Constant');

var response_util = {

    noQuote: function( res){
        res.render('track_not_available.jade', {message: constant.TRACK_NOT_AVAILABLE_MESSAGE});
    }
}

module.exports = response_util;
