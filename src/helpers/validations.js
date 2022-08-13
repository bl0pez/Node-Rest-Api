const { validationResult } = require('express-validator');

const validations = (req, res, next) => {
    const errors = validationResult(req);
    if(!errors.isEmpty()) {
        const error = new Error('Validation failed, entered data is incorrect');
        error.statusCode = 422;
        throw error;
    }

    next();

}

module.exports = validations;