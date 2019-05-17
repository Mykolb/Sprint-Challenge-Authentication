const express = require('express');
const cors = require('cors');
const helmet = require('helmet');

const configureRoutes = require('../config/routes.js');

const server = express();

server.use(helmet());
server.use(cors());
server.use(express.json());

configureRoutes(server);

server.get('/', (req, res) => {
    res.send(`<h2>We have data showing!</h2>`)
});

module.exports = server;
