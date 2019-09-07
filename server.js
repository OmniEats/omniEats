const express = require('express')
const app = express()
const PORT = process.env.PORT || 3000
const PATH = require('path')
const distPath = PATH.join(__dirname, "/dist")

console.log(distPath)

app.use(express.static(distPath))
app.use(express.urlencoded({extended: false}))
app.use(express.json())

app.use('/api/google', require('./routes/googleMaps'));

app.get('/', (req, res, next) => {
    res.sendFile(PATH.join(__dirname,"index.html"))
})

app.listen(PORT, () => console.log("I Am Listening to You"))

module.exports = app
