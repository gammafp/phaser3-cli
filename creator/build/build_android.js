const files = require('../../lib/files');
const log = require('../../lib/log');
const command = require('child_process');
const ora = require('ora');

module.exports = () => {
    if (files.fileExists('.phaser_cli')) {
        const spinner = ora(`Open Android Studio, be patient...\n`);
        spinner.start();
        command.exec('npm run build-android', (err, stdout, stderr) => {
            if (err) {
                log.danger(err);
                return;
            }
            spinner.succeed('Android studio is open.');
            log.success('Your must create a apk with Android Studio, good look :D');
        });
    } else {
        log.no_project();
    }
};