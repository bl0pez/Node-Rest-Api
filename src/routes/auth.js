const { Router } = require('express');

const router = Router();

router.get('/signup', (req, res, next) => {
    res.json({
        message: 'Hola :)'
    });
});


module.exports = router;