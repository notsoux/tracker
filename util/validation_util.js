const constant = require ('../constant/Constant');
const util = require('util');

let validation_util = {
    /**
     * apply validation rules and check outcome
     * throw Error if validation fails
     * @param req http request
     */
    checkValidation: function (req) {
        var errors = req.validationErrors();
        if (errors) {
            let help = util.inspect( errors);
            let err = new Error( help);
            err.errors = [];
            errors.forEach( it => err.errors.push( it));
            err.code = constant.VALIDATION_ERROR;
            throw err;
        }
    }
}

module.exports = validation_util;
