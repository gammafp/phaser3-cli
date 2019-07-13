const files = require('../../lib/files');
const newProjectQuestion = require('../../questions/newProject');
const ora = require('ora');
const command = require('child_process');
const emoji = require('node-emoji');

const log = require('../../lib/log');

const regexFolderName = /^(?:[a-zA-Z0-9-~][a-zA-Z0-9-._~]*)?[a-zA-Z0-9-~][a-zA-Z0-9-._~]*$/g;

const repoURL = 'https://raw.githubusercontent.com/gammafp/phaser3-cli/master/repos.json';

const config_routes = require('../../config.json');

module.exports = async (folder) => {
    if (!files.directoryExists(folder)) {
        if (regexFolderName.test(folder)) {

            const newFolder = folder;
            const spinner = ora(`Creating scaffolding.\n`);

            const result = await newProjectQuestion.askPhaserConfig();

            // Creación del scaffolding y configuración de las variables recibidas
            spinner.start();

            let repository = await files.readFileFromURL(repoURL);
            if (repository.search('phaser') === -1) {
                spinner.fail('Fail download repositories.');
                return false;
            }

            repository = JSON.parse(repository);

            files.copyFiles(`${files.getCurrentDirectory()}/scaffolding/files`, `./${newFolder}`, (err) => {
                if (err) {
                    return console.error(err);
                }

                // -> Remplazo de nombres
                const packageJSON = files.readFile(`./${newFolder}/package.json`)
                    .replace('{name}', newFolder);
                files.writeFile(`./${newFolder}/package.json`, packageJSON);

                // Change config title name 
                const configFile = files.readFile(`${newFolder}/${config_routes.route_base_project}/src/config.ts`)
                    .replace('{title}', result.title)
                    .replace('{type}', result.type)
                    .replace('{width}', result.width)
                    .replace('{height}', result.height)
                    .replace('{pixelart}', result.pixelArt)
                    .replace('{physics}', (JSON.parse(result.physics)) ?
                        `\n    physics: {\n        default: 'arcade',\n        arcade: {\n            gravity: {\n                y: 500\n            }\n        }\n    },` :
                        '');
                files.writeFile(`${newFolder}/${config_routes.route_base_project}/src/config.ts`, configFile);

                const indexHTMLFile = files.readFile(`${newFolder}/${config_routes.route_base_project}/index.html`)
                    .replace('{title}', result.title)
                files.writeFile(`${newFolder}/${config_routes.route_base_project}/index.html`, indexHTMLFile);

                spinner.succeed(`Scaffolding created.`);

                // -> Instalar dependencias
                spinner.text = 'Donwload Phaser :)';
                spinner.start();
                // Phaser definitions
                files.downloadFiles(`./${newFolder}/def/phaser.d.ts`, repository.phaserdef);
                // Download Phaser
                files.downloadFiles(`./${newFolder}/vendor/phaser/phaser.min.js`, repository.phaser);
                spinner.succeed(emoji.emojify(':heart:') + ' Phaser download has finished ' + emoji.emojify(':heart:'));

                spinner.text = 'Installing dependencies please be patient...';
                spinner.start();

                command.exec(`cd ${newFolder} && npm i`, (err, stdout, stderr) => {
                    if (err) {
                        log.danger(err);
                        return;
                    }
                    spinner.succeed('The dependencies are installed.');
                    log.success('Enjoy your game development :)');
                });

            });

        } else {
            log.danger(`The folder name "${folder}" it is incorrect.`);
        }
    } else {
        log.danger('This folder already exists!');
    }
}