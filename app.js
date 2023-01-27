require('dotenv').config();
console.log('hola mundon');
const Server = require('./models/server');

const server = new Server();

server.listen();
