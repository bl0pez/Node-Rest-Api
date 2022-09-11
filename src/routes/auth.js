const { Router } = require('express');
const { getAuth, signup, login, revalidateToken } = require('../controllers/auth');
const tokenVerify = require('../middleware/tokenVerify');

const router = Router();

//route to register a new user
router.post('/signup', signup);
//route to login
router.post('/login', login);
//check webtoken
router.get('/renew', tokenVerify, revalidateToken);


module.exports = router;