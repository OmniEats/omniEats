const express = require('express')
const app = express()
const PORT = process.env.PORT || 3000
const PATH = require('path')

app.use('/api/google', require('./routes/googleMaps'));

app.get('/', (req, res, next) => {
    res.sendFile(PATH.join(__dirname,"index.html"))
})


app.listen(PORT, () => console.log("I Am Listening to You"))

module.exports = app