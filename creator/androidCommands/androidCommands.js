const command = require('child_process');
module.exports = {
    copy: () => {
        const exec = command.spawn('npm', [
            'run',
            'build-install-android',
            '&&',
            'npx',
            'cap',
            'copy'
        ], {shell: true});

        exec.stdout.on('data', function(data) {
            console.log(data.toString());
        });
        exec.stderr.on('data', function(data) {
            console.log(data.toString());
        });
    }
}