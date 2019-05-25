const files = require('../../lib/files');
const log = require('../../lib/log');
const command = require('child_process');
const ora = require('ora');

module.exports = () => {
    if (files.fileExists('.phaser_cli')) {
        const spinner = ora(`Building game, be patient...\n`);
        spinner.start();
        command.exec('npm run build', (err, stdout, stderr) => {
            if (err) {
                log.danger(err);
                return;
            }
            spinner.succeed('Game builded.');
            log.success('Your game is in the "dist" folder :)');
        });
    } else {
        log.no_project();
    }
};