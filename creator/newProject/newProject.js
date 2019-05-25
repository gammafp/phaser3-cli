const files = require('../../lib/files');
const newProjectQuestion = require('../../questions/newProject');
const ora = require('ora');
const command = require('child_process');

const log = require('../../lib/log');

const regexFolderName = /^(?:[a-zA-Z0-9-~][a-zA-Z0-9-._~]*)?[a-zA-Z0-9-~][a-zA-Z0-9-._~]*$/g;
const urlPhaserDef = 'https://raw.githubusercontent.com/photonstorm/phaser/master/types/phaser.d.ts';

module.exports = async (folder) => {
    if (!files.directoryExists(folder)) {
        if (regexFolderName.test(folder)) {

            const newFolder = folder;
            const spinner = ora(`Creating scaffolding.\n`);

            const result = await newProjectQuestion.askPhaserConfig();

            // Creación del scaffolding y configuración de las variables recibidas
            spinner.start();

            files.copyFiles(`${files.getCurrentDirectory()}/scaffolding/files`, `./${newFolder}`, (err) => {
                if (err) {
                    return console.error(err);
                }

                // -> Remplazo de nombres
                const packageJSON = files.readFile(`./${newFolder}/package.json`)
                    .replace('{name}', newFolder);
                files.writeFile(`./${newFolder}/package.json`, packageJSON);

                // Change config title name 
                const configFile = files.readFile(`${newFolder}/app/src/config.ts`)
                    .replace('{title}', result.title)
                    .replace('{type}', result.type)
                    .replace('{width}', result.width)
                    .replace('{height}', result.height)
                    .replace('{pixelart}', result.pixelArt)
                    .replace('{physics}', (JSON.parse(result.physics)) ?
                        `\n\tphysics: {\n\t\tdefault: 'arcade',\n\t\t'arcade': {\n\t\t\tgravity: {\n\t\t\t\ty: 500\n\t\t\t}\n\t\t}\n\t},` :
                        '');
                files.writeFile(`${newFolder}/app/src/config.ts`, configFile);

                const indexHTMLFile = files.readFile(`${newFolder}/app/index.html`)
                .replace('{title}', result.title)
                files.writeFile(`${newFolder}/app/index.html`, indexHTMLFile);

                spinner.succeed(`Scaffolding created.`);

                // -> Instalar dependencias
                
                // Phaser definitions
                files.downloadFiles(`./${newFolder}/def/phaser.d.ts`, urlPhaserDef);
                
                spinner.text = 'Installing dependencies please be patient...';
                spinner.start();

                command.exec(`cd ${newFolder} && npm i phaser`, (err, stdout, stderr) => {
                    if (err) {
                        log.danger(err);
                        return;
                    }
                    command.exec(`cd ${newFolder} && npm i`, (err, stdout, stderr) => {
                        if (err) {
                            log.danger(err);
                            return;
                        }
                        spinner.succeed('The dependencies are installed.');
                        log.success('Enjoy your game development :)');
                    });
                    console.log(stdout);
                });
            });

        } else {
            log.danger(`The folder name "${folder}" it is incorrect.`);
        }
    } else {
        log.danger('This folder already exists!');
    }
}