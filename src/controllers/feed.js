const Post = require("../models/Post");
const fs = require('fs');
const path = require('path');

const getPosts = (req, res, next) => {

    const currentPage = req.query.page || 1;
    const perPage = 2;
    let totalItems;

    

    Post.find()
        .countDocuments()
        .then(count => {
            totalItems = count;
            return Post.find()
                .skip((currentPage - 1) * perPage)
                .limit(perPage);
        })
        .then(posts => {
            res.status(200).json({
                message: 'Posts fetched successfully!',
                posts,
                totalItems
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

    if(!req.file){
        const error = new Error('No image provided');
        error.statusCode = 422;
        throw error;
    }

    const post = new Post({
        title, 
        content,
        imageUrl: req.file.filename,
        creator: {
            name: 'John Doe',
        },
    })

    post.save()
        .then(post => {
            res.status(201).json({
                message: 'Post created successfully!',
                post
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
    const { id } = req.params;
    Post.findById(id)
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

const updatePost = (req, res, next) => {
    const { id } = req.params;
    const { title, content, image } = req.body;

    Post.findById(id)
        .then(post => {

            if(image !== post.imageUrl){
                clearImage(post.imageUrl);
            }

            post.title = title;
            post.content = content;
            post.imageUrl = image || req.file.filename;
            post.save();

            res.status(200).json({
                message: 'Post updated successfully!',
                post
            });
        })
        .catch(err => {
            if(!err.statusCode) {
                err.statusCode = 500;
            }
            next(err);
        });
}

const deletePost = (req, res, next) => {
    const { id } = req.params;
    Post.findById(id)
        .then(post => {
            if(!post) {
                const error = new Error('Could not find post');
                error.statusCode = 404;
                throw error;
            }
            clearImage(post.imageUrl);
            return Post.deleteOne({ _id: id });
        })
        .then(result => {
            res.status(200).json({
                message: 'Post deleted successfully!',
            });
        })
        .catch(err => {
            if(!err.statusCode) {
                err.statusCode = 500;
            }
            next(err);
        })
}

const clearImage = (filePath) => {
    filePath = path.join(__dirname, '../images', filePath);
    fs.unlink(filePath, err => {
        if(err){
            console.log(err);
        }
    })
}


module.exports = {
    getPosts,
    createPost,
    getPost,
    updatePost,
    deletePost,
}