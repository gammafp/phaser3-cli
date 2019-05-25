const files = require('../../lib/files');
const log = require('../../lib/log');
const command = require('child_process');


module.exports = () => {
    if (files.fileExists('.phaser_cli')) {
        const exec = command.spawn('npm', [
            'run',
            'dev'
        ], {shell: true});

        exec.stdout.on('data', function(data) {
            console.log(data.toString());
        });
        exec.stderr.on('data', function(data) {
            console.log(data.toString());
        });
    } else {
        log.no_project();
    }
};