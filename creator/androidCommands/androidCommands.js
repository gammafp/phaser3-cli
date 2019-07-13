const command = require('child_process');
const ora = require('ora');
const log = require('../../lib/log');

module.exports = {
    copy: () => {
        const spinner = ora(`Updating the project of Android Studio...\n`);
        spinner.start();
        command.exec('npm run build-install-android', (err, stdout, stderr) => {
            if (err) {
                log.danger(err);
                return;
            }
            spinner.succeed();
            const exec = command.spawn('npx', [
                'cap',
                'copy'
            ], {shell: true});
    
            exec.stdout.on('data', function(data) {
                console.log(data.toString());
            });
            exec.stderr.on('data', function(data) {
                console.log(data.toString());
            });
        });
    }
}