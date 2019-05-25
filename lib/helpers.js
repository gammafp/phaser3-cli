const path = require('path');
module.exports = {
    getSceneRoute: (sceneName) => {
        const route = path.dirname(sceneName).trim();
        return (sceneName.search(/\\|\//) !== -1) ? `${route}` : route.replace('.', 'scenes');
    },
    sceneNameToUpperCase: (sceneName) => { 
        let name = path.basename(sceneName);
        return (name.trim(), name.charAt(0).toUpperCase() + name.slice(1)).replace(/_[\w]/g, (find) => {
            return find[find.length - 1].toUpperCase();
        });
    }
};