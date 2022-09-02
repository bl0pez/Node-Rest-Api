const { Router } = require('express');
const { getAuth, signup, login } = require('../controllers/auth');

const router = Router();

router.get('/signup', getAuth);

//route to register a new user
router.post('/signup', signup);
//route to login
router.get('/login', login);


module.exports = router;