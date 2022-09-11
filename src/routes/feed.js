const { Router } = require('express');
const { body, check } = require('express-validator');

const router = Router();

const { getPosts, createPost, getPost, updatePost, deletePost } = require('../controllers/feed');
const validations = require('../helpers/validations');
const tokenVerify = require('../middleware/tokenVerify');

router.get('/posts', getPosts);

router.post('/post', [
    tokenVerify,
    body('title').trim().isLength({ min: 5 }),
    body('content').trim().isLength({ min: 5 }),
    validations,
], createPost);

router.get('/post/:id',[
    check('id').isMongoId(), 
validations],
getPost);

router.put('/post/:id', [
    body('title').trim().isLength({ min: 5 }),
    body('content').trim().isLength({ min: 5 }),
    validations,
], updatePost);

router.delete('/post/:id', deletePost);


module.exports = router;