const express = require('express');

const app = express();

app.use(express.json());
app.use('/api/feed', require('./routes/feed'));

app.listen(3000);