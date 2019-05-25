const chalk = require('chalk');
const figlet = require('figlet');

module.exports = {
    welcome: () => {
        console.log(
            chalk.yellow(
                figlet.textSync('Phaser3-cli', {
                    font: 'Small',
                    horizontalLayout: 'full'
                })
            )
        );
        console.log(chalk.green('\tBy Gammafp\n\n\n\n'));
    },
    no_project: () => {
        const warning = chalk.hex('#EE5A24');
        console.log(warning('This is not a valid project.'));
    },

    success: (msj) => {
        console.log(chalk.cyan(msj));
    },
    danger: (msj) => {
        const warning = chalk.hex('#EE5A24');
        console.log(warning(msj));
    }
};