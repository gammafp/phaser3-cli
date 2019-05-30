#!/usr/bin/env node

const program = require('commander');

const pjson = require('./package.json');
const log = require('./lib/log');

// Lógica de carpetas para distintos trabajos
const newProject = require('./creator/newProject/newProject');
const execServe = require('./creator/serve/serve');
const execBuild = require('./creator/build/build');
const addScene = require('./creator/add/scene');

// Agregar server gamma/core
const gammaCoreServer = require('./server_gamma_core/server');

program
    .version(pjson.version)
    .command('new [folder_name]')
    .action((folder_name) => {
        log.welcome();
        if(folder_name === undefined) {
            log.danger('you need add a folder name');
        } else {
            newProject(folder_name);
        }
    });

program
    .command('serve')
    .action(() => {
        log.success('\nStarting server...');
        execServe();
    });

program
    .command('build')
    .action(() => {
        log.success('\nBuilding your game...');
        execBuild();
    });

program
    .command('add <type> [args...]')
    .action((type, sceneName) => {
        if(type === 'scene') {
            addScene(sceneName);
        } else {
            log.danger('Error: The name scene is missing:\n\tphaser add scene <nameScene>');
        }
    });
// TODO: Agregar gammaCoreServer();
program
    .command('test')
    .action(() => {
        gammaCoreServer();
    });
program.parse(process.argv)