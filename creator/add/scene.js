const files = require('../../lib/files');
const log = require('../../lib/log');
const {sceneNameToUpperCase, getSceneRoute} = require('../../lib/helpers');

const ora = require('ora');

const configURL = './app/src/config.ts';
// TODO: Crear el nuevo archivo
const sceneTextURL = './'

const regexImports = /export *[c|C][o|O][n|N][s|S][t|T] *[c|C][o|O][n|N][f|F][i|I][g|G] *: * (.*)=/;
const regexScene = /"?scene"? *: *[\n\t\r\s\[\w,]*[\w]/;

module.exports = (sceneNames) => {
    if (sceneNames.length > 0) {
        if (files.fileExists('.phaser_cli')) {
            if(files.fileExists(configURL)) {
                let data = files.readFile(configURL);
                if(regexImports.test(data)) {
                    if(regexScene.test(data)) {
                        const spinner = ora(`Creating scene...\n`);
                        sceneNames.map((sceneName) => {
                            // TODO: Comprobar si la escena ya existe
                            const route = getSceneRoute(sceneName).replace('./', '');
                            const name = sceneNameToUpperCase(sceneName);
                           
                            const newImport = `\nimport { ${name} } from './${route}/${name}';\n\n`;

                            const matchSplit = data.match(regexImports)[0];
                            
                            const importsSplit = data.split(regexImports);
                            const imports = importsSplit[0].trim() + newImport;
                            
                            const configJSON = imports + matchSplit + importsSplit[2]
                            
                            const importScene = configJSON.replace(regexScene, (find) => {
                                return `${find},\n        ${name}`;
                            });
                            data = importScene;

                            // --> Copiar archivo para crear la escena
                            // Nos ayuda a setear la ruta en scene o en rutas definidas por el usuario
                            const sceneScaffold = files.readFile(`${files.getCurrentDirectory()}/scaffolding/scene.ts`)
                            .replace(/{sceneName}/g, name);

                            const sceneRoute =`app/src/${route}/${name}.ts`;
                            files.writeFile(sceneRoute, sceneScaffold);
                        });
                        // --> Escribir escena
                        files.writeFile(configURL, data);
                        spinner.succeed('Scene created');
                        
                    } else {
                        log.danger('The scene can be create.\nscene have a bad structure.');
                    }
                } else {
                    log.danger('The scene can be create.\nThe "export const CONFIG: any" is missing.');
                }
            } else {
                log.danger('The file config.ts is missing :(');
                log.danger("The scene can't be create.");
            }
        } else {
            log.no_project();
        }
    } else {
        log.danger('The name of scene is missing');
    }
}