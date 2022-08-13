const { Router } = require('express');
const { body } = require('express-validator');

const router = Router();

const { getPosts, createPost, getPost } = require('../controllers/feed');
const validations = require('../helpers/validations');

router.get('/posts', getPosts);
router.post('/post', [
    body('title').trim().isLength({ min: 5 }),
    body('content').trim().isLength({ min: 5 }),
    validations,
], createPost);
router.get('/post/:postId', getPost)


module.exports = router;