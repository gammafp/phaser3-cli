const chalk = require('chalk');

module.exports = {
    success: (msj) => {
        console.log(chalk.cyan(msj));
    },
    danger: (msj) => {
        const warning = chalk.hex('#EE5A24');
        console.log(warning(msj));
    }
};