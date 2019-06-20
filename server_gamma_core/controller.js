const http = require('http');
const path = require('path');
const url = require('url');
const files = require('../lib/files');
const config = require('../config.json');

module.exports = http.createServer((req, res) => {

    const reqUrl = url.parse(req.url, true);
    if (reqUrl.pathname === '/update' && (req.headers['access-control-request-method'] === 'POST' || req.method === 'POST')) {

        console.log('Trata de acceder al data\n------------ ');

        let body = '';
        req.on('data', function (data) {
            body = JSON.parse(data.toString());

            console.log('Esto es el body del data: ', body);

            if (files.fileExists(path.normalize(`./${config.route_base_project}/src/${body.path}`))) {
                let sceneText = files.readFile(`./${config.route_base_project}/src/${path.normalize(body.path)}`);

                const regexReplaceVariable = new RegExp("[a-zA-Z]{0,}." + body.variableKey + " *= *[a-zA-Z]{0,}.add.(sprite|image)\\([a-zA-Z /0-9\\+\\(\\),'_\\-.\\)\\t\\n]{0,}\\)");
                const regexReplacePositionImage = /\([\(\)\+a-zA-Z\n./ *0-9]* {0,}, {0,}[\(\)\+a-zA-Z\n./ *0-9]* {0,}/;

                sceneText = sceneText.replace(regexReplaceVariable, (dato) => {
                    return dato.replace(regexReplacePositionImage, `(${body.x}, ${body.y}`);
                });

                files.writeFile(path.normalize(`./${config.route_base_project}/src/${body.path}`), sceneText);
                console.log('se sobreescribe');
            } else {
                console.log('La ruta no existe');
                const datos = JSON.stringify({
                    "msg": "the route does not exist"
                });
                console.log('Se trata de enviar estos datos: ', datos);
                // Ruta no encontrada y mandar notificación 
                res.writeHead(200, {
                    'Content-Type': 'application/json'
                });
                res.write(datos);
                res.end(datos);
            }
        });

    }
});