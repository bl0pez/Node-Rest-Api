const { Router } = require('express');
const { registerValidators } = require('../../validators/auth');
const { getAuth, signup, login, revalidateToken } = require('../controllers/auth');
const { existEmail } = require('../helpers/validationsDB');
const tokenVerify = require('../middleware/tokenVerify');

const router = Router();

//route to register a new user
router.post('/signup',
        registerValidators,
    signup);
//route to login
router.post('/login', login);
//check webtoken
router.get('/renew', tokenVerify, revalidateToken);


module.exports = router;