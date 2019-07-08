#!/usr/bin/env node

const program = require('commander');

const pjson = require('./package.json');
const log = require('./lib/log');

// Lógica de carpetas para distintos trabajos
const newProject = require('./creator/newProject/newProject');
const execServe = require('./creator/serve/serve');
const execBuild = require('./creator/build/build');
const execBuildAndroid = require('./creator/build/build_android');
const addScene = require('./creator/add/scene');

const addAndroid = require('./creator/add/android');
const androidCommands = require('./creator/androidCommands/androidCommands');

// Agregar server gamma/core
const gammaCoreServer = require('./server_gamma_core/server');

program
    .version(pjson.version)
    .command('new [folder_name]')
    .action((folder_name) => {
        log.welcome();
        if (folder_name === undefined) {
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
        gammaCoreServer();
    });

program
    .command('build [args...]')
    .action((type) => {
        if (type.length === 0) {
            // Build to web
            log.success('\nBuilding your game...');
            execBuild();
        }

        if (type[0] === 'android') {
            execBuildAndroid();
        }
    });

program
    .command('add <type> [args...]')
    .action((type, sceneName) => {
        if (type === 'scene') {
            if (sceneName.length > 0) {
                addScene(sceneName);
            } else {
                log.danger('Error: The name scene is missing:\n\tphaser add scene <nameScene>');
            }
        }
        if (type === 'android') {
            addAndroid();
        }
    });

// Android command
program
    .command('android <type>')
    .action((type) => {
        if (type === 'copy') {
            androidCommands.copy();
        } else {
            log.danger('Error: The android command does not exists');
        }
    });

program
    .command('test')
    .action(() => {
        gammaCoreServer();
    });
program.parse(process.argv)