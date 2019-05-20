#!/usr/bin/env node

const clear = require('clear');
const program = require('commander');
const pjson = require('./package.json');
const chalk = require('chalk');
const figlet = require('figlet');

// Lógica de carpetas para distintos trabajos
const newProject = require('./creator/newProject/newProject');

clear();

console.log(
    chalk.yellow(
        figlet.textSync('Phaser3-cli', {
            font: 'Small',
            horizontalLayout: 'full'
        })
    )
);
console.log(chalk.green('\tBy Gammafp\n\n\n\n'));

program
    .version(pjson.version)
    .command('new <folder>')
    .action((folder) => {
        newProject(folder);
    });


program.parse(process.argv)

