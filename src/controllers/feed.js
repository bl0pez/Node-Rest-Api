const Post = require("../models/Post");

const getPosts = (req, res, next) => {
    Post.find()
        .then(posts => {
            res.status(200).json({
                message: 'Posts fetched successfully!',
                posts
            });
        })
        .catch(err => {
            if(!err.statusCode) {
                err.statusCode = 500;
            }
            next(err);
        });
}

const createPost = (req, res, next) => {
    const {title, content} = req.body;
    const post = new Post({
        title, 
        content,
        imageUrl: '../images/image.jpg',
        creator: {
            name: 'John Doe',
        },
    })

    post.save()
        .then(result => {
            res.status(201).json({
                message: 'Post created successfully!',
                post: result
            });
        })
        .catch(err =>{
            if(!err.statusCode) {
                err.statusCode = 500;
            }
            next(err);
        });

}

const getPost = (req, res, next) => {
    const { postId } = req.params;

    console.log(postId);

    Post.findById(postId)
        .then(post => {
            if(!post) {
                const error = new Error('Could not find post');
                error.statusCode = 404;
                throw error;
            }
            res.status(200).json({
                message: 'Post fetched successfully!',
                post
            });
        })
        .catch(err => {
            if(!err.statusCode) {
                err.statusCode = 500;
            }
            next(err);
        })

}


module.exports = {
    getPosts,
    createPost,
    getPost,
}