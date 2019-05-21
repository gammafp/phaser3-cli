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

            // Se crea la carpeta
            spinner.start();
            await files.copyFiles(`${files.getCurrentDirectory()}/scaffolding/files`, `./${newFolder}`, (err) => {
                if (err) {
                    return console.error(err);
                }
                const packageJSON = files.readFile(`./${newFolder}/package.json`)
                    .replace('{name}', newFolder);
                files.writeFile(`./${newFolder}/package.json`, packageJSON);
                spinner.succeed(`Project created.`);

            });


        } else {
            log.danger(`The folder name "${folder}" it is incorrect.`);
        }
    } else {
        log.danger('This folder already exists!');
    }
}