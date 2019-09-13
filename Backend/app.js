const server = require('./server')
const PORT = process.env.PORT || 3000;

server.listen(3000, () => console.log("Listening"))
