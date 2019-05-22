const files = require('../../lib/files');
const newProjectQuestion = require('../../questions/newProject');
const ora = require('ora');

const log = require('../../lib/log');

const regexFolderName = /^(?:[a-zA-Z0-9-~][a-zA-Z0-9-._~]*)?[a-zA-Z0-9-~][a-zA-Z0-9-._~]*$/g;

module.exports = async (folder) => {
    if (!files.directoryExists(folder)) {
        if (regexFolderName.test(folder)) {

            const newFolder = folder;
            const spinner = ora(`Creating project.`);

            const result = await newProjectQuestion.askPhaserConfig();
       
            // Creación del scaffolding y configuración de las variables recibidas
            spinner.start();
           
           await files.copyFiles(`${files.getCurrentDirectory()}/scaffolding/files`, `./${newFolder}`, (err) => {
                if (err) {
                    return console.error(err);
                }

                // Change package name
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
                    .replace('{physics}', (result.physics) ? 
                    `physics: {\n\t\tdefault: "arcade",\n\t\t"arcade": {\n\t\t\tgravity: {\n\t\t\t\ty: 500\n\t\t\t}\n\t\t}\n\t},` 
                        : '');
                files.writeFile(`${newFolder}/app/src/config.ts`, configFile);
                
                
                
                spinner.succeed(`Project created.`);


            });


        } else {
            log.danger(`The folder name "${folder}" it is incorrect.`);
        }
    } else {
        log.danger('This folder already exists!');
    }
}