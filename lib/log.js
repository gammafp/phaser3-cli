const chalk = require('chalk');

module.exports = {
    danger: (msj) => {
        const warning = chalk.hex('#EE5A24');
        console.log(warning(msj));
    }
};