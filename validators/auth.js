const { check } = require("express-validator");
const validations = require("../src/helpers/validations");
const { existEmail } = require("../src/helpers/validationsDB");

const registerValidators = [
    check("name", "Name is required").not().isEmpty(),
    check("email")
        .isEmail().withMessage("Email is not valid"),
    validations,
    existEmail,
]

module.exports = {
    registerValidators
}