const { Router } = require('express');
const router = Router();

const { getPosts, createPost } = require('../controllers/feed');

router.get('/posts', getPosts);
router.post('/posts', createPost);


module.exports = router;