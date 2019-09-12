const express = require('express');
const app = express();
const PORT = process.env.PORT || 3000;
const PATH = require('path');
const distPath = PATH.join(__dirname, '../dist');
const dotenv = require('dotenv');
const seed = require('./seed');

dotenv.config();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(express.static(distPath));

app.use('/api', require('./routes/index'));

app.get('/', (req, res, next) => {
  res.sendFile(PATH.join(__dirname, '../index.html'));
});

app.listen(PORT, () => console.log('I Am Listening to You'));

module.exports = app;
