const User = require("../models/User")

/**
 * Valida si el email ya
 * esta registrado en la base de datos
 */
const existEmail = async(req, res, next) => {

    const { email } = req.body;

    const checkEmail = await User.findOne({ email });

    if (checkEmail) {
        res.status(422).json({
            message: 'Email already exists'
        });

        return;
        
    }

    next();

}

module.exports = {
    existEmail,
}