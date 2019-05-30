const http = require('http');
const url = require('url');
const { parse } = require('querystring');
const files = require('../lib/files');

module.exports = http.createServer((req, res) => {
    const reqUrl = url.parse(req.url, true);

    if (reqUrl.pathname === '/update' && req.method === 'POST') {
        let body = '';

        req.on('data', function (data) {
            const salida = files.readFile('package.json');
           
            console.log(salida);
            body = data.toString();
            console.log(parse(body).data);
        });
    }
});