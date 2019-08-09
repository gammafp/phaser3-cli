const inquirer = require('inquirer');

const validNumber = (age) => {
   var isValid = !isNaN(parseFloat(age));
   return isValid || 'Please enter a number';
}

/** Nos ayudará a crear las preguntsa de inquirer */
module.exports = {
    askPhaserConfig: () => {
        const questions = [{
                type: 'input',
                name: 'title',
                default: 'My Game',
                message: 'Enter the name of the game'
            },
            {
                type: 'list',
                name: 'type',
                message: 'Select type of canvas?',
                choices: [
                    'Phaser.AUTO',
                    'Phaser.CANVAS',
                    'Phaser.WEBGL'
                ]
            },
            {
                type: 'number',
                name: 'width',
                default: 640,
                message: 'width of project',
                validate: validNumber
            }, 
            {
                type: 'number',
                name: 'height',
                default: 360,
                message: 'heigth of project',
                validate: validNumber
            }, 
            {
                type: 'list',
                name: 'pixelArt',
                message: 'Is it a pixel art game?',
                choices: [
                    'true',
                    'false'
                ]
            }, {
                type: 'list',
                name: 'physics',
                message: 'What physics system do you use?',
                choices: [
                    'arcade',
                    'matter',
                    'none'
                ]
            }
        ];
        return inquirer.prompt(questions);
    }
};