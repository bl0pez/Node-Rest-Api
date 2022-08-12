const { Router } = require('express');
const router = Router();

const { getPosts, createPost } = require('../controllers/feed');

router.get('/posts', getPosts);
router.post('/post', createPost);


module.exports = router;