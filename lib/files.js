const fs = require('fs');
const path = require('path');
const ncp = require('ncp').ncp;
const https = require('https');

/** Nos ayudará a comprobar los archivos que ya existen y crear carpetas */
module.exports = {

    getCurrentDirectory: () => path.dirname(require.main.filename),

    getCurrentDirectoryBase: () => {
        return path.basename(process.cwd());
    },


    readFile: (url) => fs.readFileSync(url, {
        encoding: 'utf-8'
    }),


    downloadFiles: (urlFile, urlDownload) => {
        const phaserDef = fs.createWriteStream(urlFile);
        https.get(urlDownload, function(response) {
            response.pipe(phaserDef);
        });
    },

    writeFile: (url, data) => fs.writeFileSync(url, data, {encoding:'utf8',flag:'w'}),

    copyFiles: (a, b, callback) => {
        ncp(a, b, callback);
    },
    createFolder: (dir) => {
        fs.mkdirSync(dir);
    },


    directoryExists: (filePath) => {
        try {
            return fs.statSync(filePath).isDirectory();
        } catch (err) {
            return false;
        }
    },
    fileExists: (file) => {
        try {
            return fs.statSync(file).isFile();
        } catch (err) {
            return false;
        }
    }
};