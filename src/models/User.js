const { Schema, model } = require('mongoose');

const UserSchema = new Schema({
    email: {
        type: String,
        required: true
    },
    password: {
        type: String,
        requierd: true
    },
    name: {
        type: String,
        required: true
    },
    status: {
        type: String,
        required: true
    },
    posts: [
        {
            type: Schema.Types.ObjectId,
            ref: 'Post'
        }
    ]
}, { timestamps: true });

module.exports = model('User', UserSchema);