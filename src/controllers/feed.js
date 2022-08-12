const { validationResult } = require('express-validator');

const getPosts = (req, res, next) => {
    res.status(200).json({
        posts:[
            {
                _id: '5a422aa71b54a676234d17fc',
                title: 'First Post', 
                content: 'This is the first post', 
                imageUrl: '../images/image.jpg',
                creator: {
                    name: 'John Doe',
                },
                createAt: new Date(),
            }
        ]
    });
}

const createPost = (req, res, next) => {

    const errors = validationResult(req);
    if(!errors.isEmpty()) {
        return res.status(422).json({
            message: 'Validation failed',
            errors: errors.array(),
        });
    }

    const {title, content} = req.body;

    res.status(201).json({
        message: 'Post created successfully!',
        post: {
            _id: new Date().toISOString(), 
            title, 
            content,
            creator: {
                name: 'John Doe',
            },
            createAt: new Date(),
        }
    });

}


module.exports = {
    getPosts,
    createPost,
}