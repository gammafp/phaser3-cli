const files = require('../../lib/files');
const log = require('../../lib/log');
const ora = require('ora');
const command = require('child_process');
const config_routes = require('../../config.json');


// Inicia un proyecto con android
module.exports = (sceneNames) => {
    const spinner = ora(`Downloading capacitor, be patient...\n`);

    spinner.start();
    // Configuramos el capacitor.config.json
    const app_id = JSON.parse(files.readFile('./package.json')).name;
    const config_project_file = files.readFile(`./${config_routes.route_base_project}/src/config.ts`);
    let app_name = config_project_file.match(/title: *['a-z A-Z0-9.12]*/);
    app_name = (app_name === null) ? 'default_name' : app_name[0].split(':')[1].replace(/['"]/g, '').trim();
    app_name = (app_name === '') ? 'default_name' : app_name;

    let capacitor_config = files.readFile(`${files.getCurrentDirectory()}/scaffolding/android/capacitor.config.json`);
    capacitor_config = capacitor_config
        .replace('{{app_id}}', app_id)
        .replace('{{app_name}}', app_name);

    files.writeFileAsync(`./capacitor.config.json`, capacitor_config).then(
        (err) => {
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