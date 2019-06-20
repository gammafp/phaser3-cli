const config = require('../config.json');

const hostname = 'localhost';
const port = config.port_server_gamma_core;

const server = require('./controller.js');

module.exports = () => {
    server.listen(port, hostname, () => {
        console.log(`Server running at http://${hostname}:${port}/`);
    });
}