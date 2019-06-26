const files = require('../../lib/files');
const log = require('../../lib/log');
const ora = require('ora');
const command = require('child_process');

module.exports = (sceneNames) => {
    const spinner = ora(`Downloading capacitor, be patient...\n`);

    spinner.start();
    // Seteamos capacitor
    files.copyFiles(`${files.getCurrentDirectory()}/scaffolding/android/capacitor.config.json`, `./capacitor.config.json`, (err) => {
        if (err) {
            log.danger(err);
            return;
        }
        // Instalamos el nucleo de capacitor
        command.exec(`npm i --save @capacitor/core @capacitor/cli`, (err, stdout, stderr) => {
            if (err) {
                log.danger(err);
                return;
            }
            spinner.succeed('Capacitor is installed.');
            spinner.text = 'Installing android, be patient';
            spinner.start();
            // Instalamos android
            command.exec(`npm run build-install-android && npx cap add android`, (err, stdout, stderr) => {
                if (err) {
                    log.danger(err);
                    return;
                }
                
                spinner.succeed('Android is installed');
                log.success('You can create your android app with android studio now :)');
                log.success('Open your android proyect with: phaser build android');
            });
        });

    });
}