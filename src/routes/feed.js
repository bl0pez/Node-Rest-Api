const { Router } = require('express');
const { body } = require('express-validator');

const router = Router();

const { getPosts, createPost } = require('../controllers/feed');

router.get('/posts', getPosts);
router.post('/post', [
    body('title').trim().isLength({ min: 5 }),
    body('content').trim().isLength({ min: 5 }),
], createPost);


module.exports = router;