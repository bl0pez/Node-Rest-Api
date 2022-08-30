const express = require('express');
const { mongoose } = require('mongoose');
const multer = require('multer');
const { v4: uuidv4 } = require('uuid');
require('dotenv').config();
const path = require('path');
var cors = require('cors')

const app = express();

const fileStorage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'src/images');
    },
    filename: (req, file, cb) => {

        console.log(file);

        cb(null, uuidv4() + '.' + file.mimetype.split('/')[1]);
    }
});

const fileFilter = (req, file, cb) => {
    if (
        file.mimetype === 'image/jpeg' ||
        file.mimetype === 'image/png' ||
        file.mimetype === 'image/jpg'
    ) {
        cb(null, true);
    } else {
        cb(new Error('Invalid file type'));
    }
}

app.use(express.json()); // for parsing application/json requests
app.use(multer({ storage: fileStorage, fileFilter: fileFilter }).single('image')); // for parsing multipart/form-data requests
app.use(express.static(path.join(__dirname, 'images'))); // for serving static files from the images folder

//Cors middleware
app.use(cors());

app.use('/api/feed', require('./routes/feed'));
app.use('/api/auth', require('./routes/auth'));

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