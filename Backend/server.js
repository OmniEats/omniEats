const express = require('express');
const app = express();
const PORT = process.env.PORT || 3000;
const PATH = require('path');
const distPath = PATH.join(__dirname, '../dist');
const dotenv = require('dotenv');
const seed = require('./seed')

dotenv.config();


app.use(express.urlencoded());
app.use(express.json());

app.use(express.static(distPath));

app.use('/api/google', require('./routes/googleMaps'));

app.get('/', (req, res, next) => {
  res.sendFile(PATH.join(__dirname, '../index.html'));
});

app.listen(PORT, () => console.log('I Am Listening to You'));

module.exports = app;
