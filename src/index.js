const path = require('path');

const express = require('express');
const { mongoose } = require('mongoose');
require('dotenv').config();

const app = express();

app.use(express.json()); // for parsing application/json requests
app.use(express.static(path.join(__dirname, 'images'))); // for serving static files from the images folder
console.log(path.join(__dirname, 'images'));

//Cors middleware
app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
    next();
});

app.use('/api/feed', require('./routes/feed'));

// for handling errors
app.use((error, req, res, next) => {
    const status = error.statusCode || 500;
    const message = error.message;
    res.status(status).json({ message });
});

mongoose
    .connect(process.env.CONNECT_MONGOOSE_DB_URL)
        .then(() => {
            app.listen(4000, () => {
                console.log('Server started on port 4000');
            });
        })
        .catch(err => console.log(err));