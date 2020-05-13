const express = require('express');
const bodyParser = require('body-parser');
const server = express();
const route = require('./server')


server.use(bodyParser.json())
server.use('/',route)


server.listen(5000,() => {
    console.log('Server is running om 5000')
})