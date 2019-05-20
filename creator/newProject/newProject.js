const files = require('../../lib/files');
const newProjectQuestion = require('../../questions/newProject');
const ora = require('ora');

const log = require('../../lib/log');

const regexFolderName = /^(?:[a-zA-Z0-9-~][a-zA-Z0-9-._~]*)?[a-zA-Z0-9-~][a-zA-Z0-9-._~]*$/g;

module.exports = async (folder) => {
    if(!files.directoryExists(folder)) {
        if(regexFolderName.test(folder)) {
            const result = await newProjectQuestion.askPhaserConfig();
            
            const spinner = ora(`Creating folder "${folder}".`);
            spinner.start();
            files.createFolder(`./${folder}`);
            spinner.succeed(`Folder "${folder}" created.`);
            
            console.log(result);
        } else {
            log.danger(`The folder name "${folder}" it is incorrect.`);
        }
    } else {
        log.danger('This folder already exists!');
    }

    // const result = await newProjectQuestion.askPhaserConfig();
    // console.log(result);
}