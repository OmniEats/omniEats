const express = require("express");
const app = express();
const PORT = process.env.PORT || 3000;
const PATH = require("path");
const distPath = PATH.join(__dirname, "../dist");
const dotenv = require("dotenv");
const db = require('./db');

dotenv.config();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(express.static(distPath));

app.use('/api', require('./routes/index'));

app.get("/", (req, res, next) => {
  res.sendFile(PATH.join(__dirname, "../index.html"));
});

db.sync()
  .then(() => {
    app.listen(PORT, () => console.log(`App listening at port: ${PORT}`));
  })
  .catch(console.error)

app.use('/testing', (req, res) => res.send('someText!'))

module.exports = app;
