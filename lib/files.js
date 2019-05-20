const fs = require('fs');
const path = require('path');

/** Nos ayudará a comprobar los archivos que ya existen y crear carpetas */
module.exports = {
    getCurrentDirectoryBase: () => {
        return path.basename(process.cwd());
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