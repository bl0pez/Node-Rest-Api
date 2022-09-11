const User = require("../models/User");
const bcrypt = require('bcryptjs');
var jwt = require('jsonwebtoken');

const signup = (req, res, next) => {
    const {email, password, name} = req.body;

    const user = new User({
        email,
        password,
        name
    });

    const salt = bcrypt.genSaltSync(10);
    user.password = bcrypt.hashSync(password, salt);

    user.save()
        .then(user => {
            res.json({
                message: 'User created!',
                user
            });
        })
        .catch(err => {
            if(!err.statusCode) {
                err.statusCode = 500;
            }
            next(err);
        });

}

const login = (req, res, next) => {
    const {email, password} = req.body;

    //Find user
    User.findOne({email})
        .then(user => {

            // Check if user exists
            if(!user){
                const error = new Error('A user with this email could not be found.');
                error.statusCode = 401;
                throw error;
            }

            // Check password
            const isEqual = bcrypt.compareSync(password, user.password);

            if(!isEqual){
                const error = new Error('Wrong password!');
                error.statusCode = 401;
                throw error;
            }

            // Create token
            const token = jwt.sign({
                email: user.email,
                userId: user._id.toString()
            }, 'secret', {expiresIn: '1h'})

            // Send response
            res.json({
                message: 'User logged in!',
                token,
                userId: user._id.toString()
            });

        })
        .catch(err => {
            if(!err.statusCode) {
                err.statusCode = 500;
            }
            next(err);
        });
}

//Revalidate token
const revalidateToken = (req, res, next) => {
    
    User.findById(req.userId)
        .then(user => {
            if(!user){
                const error = new Error('User not found.');
                error.statusCode = 401;
                throw error;
            }
            res.json({
                message: 'Token revalidated!',
                user
            });
        })
}




module.exports = {
    signup,
    login,
    revalidateToken
}