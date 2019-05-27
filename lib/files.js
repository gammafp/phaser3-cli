const fs = require('fs-extra');
const path = require('path');
const https = require('https');


/** Nos ayudará a comprobar los archivos que ya existen y crear carpetas */
module.exports = {

    // Obtener rutas
    getCurrentDirectory: () => path.dirname(require.main.filename),
    getCurrentDirectoryBase: () => {
        return path.basename(process.cwd());
    },

    // Lectura, descarga y escritura de ficheros
    readFile: (url) => fs.readFileSync(path.normalize(url), {
        encoding: 'utf-8'
    }),
    downloadFiles: (urlFile, urlDownload) => {
        const phaserDef = fs.createWriteStream(path.normalize(urlFile));

        https.get(urlDownload, function(response) {
            response.pipe(phaserDef);
        });
    },
    readFileFromURL: (url) => {
        return new Promise((resolve, reject) => {
            https.get(url, function(resp) {
                resp.on('data', (chunk) => {
                    resolve(chunk.toString());
                });
            });
        });
    },
    writeFile: (url, data) => fs.outputFileSync(path.normalize(url), data, {encoding:'utf8', flag:'w'}),
    // Copia y creación de carpetas
    copyFiles: (a, b, callback) => {
        try {
            fs.copySync(a, b)
            callback(false);
        } catch(error) {
            callback(error);
        }
    },
    
    // Comprobación de existencia de archivos y directorios
    directoryExists: (filePath) => {
        try {
            return fs.statSync(path.normalize(filePath)).isDirectory();
        } catch (err) {
            return false;
        }
    },
    fileExists: (file) => {
        try {
            return fs.statSync(path.normalize(file)).isFile();
        } catch (err) {
            return false;
        }
    }
};