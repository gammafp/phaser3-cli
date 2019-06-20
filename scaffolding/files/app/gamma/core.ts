import { info_drag } from './templates';

/**
 * A callback method that is invoked immediately after the
 * DOM is it change.
 */
export function pgOnInit(
    target: any,
    propertyName: string,
    propertyDesciptor: PropertyDescriptor
) {
    window.addEventListener('load', propertyDesciptor.value());
}

/**
 * A callback method that is invoked immediately after the
 * window is resize
 */
export function pgOnResize(
    target: any,
    propertyName: string,
    propertyDesciptor: PropertyDescriptor
) {
    window.addEventListener('resize', () => {
        propertyDesciptor.value();
    });
}

/**
 * Ayuda a obtener la mitad del viewport
 */
export const canvasSize = {
    w: (scene) => scene.scale.width,
    h: (scene) => scene.scale.height,
    mw: (scene) => scene.scale.width / 2,
    mh: (scene) => scene.scale.height / 2
};


// Variable para agrupar el dragGameObject UI
let uIDrag = null;
/**
 * Herramienta que ayuda a posicionar un elemento en el canvas.
 */
export function dragGameObject(pathConfig) {

    // Objeto a enviar al servidor 
    const configToSend: any = {
        path: pathConfig.path
    };
    return (target: any, key: string | symbol) => {

        let val = target[key];
        const setter = (gameObject) => {

            val = gameObject;
            val.setInteractive();
            val.nameGammaCore = key;
            val.scene.input.setDraggable(val);

            val.scene.input.on('dragstart', (pointer, game_object) => {
                console.log(val);
                game_object.setTint(0xff0000);
                // Crea y destruye la información de posición
                if (uIDrag !== null) {
                    uIDrag.destroy();
                    uIDrag.removeListener('click');
                }
                // nombre variable de referencia para enviar al servidor
                configToSend.variableKey = game_object.nameGammaCore;
                
                uIDrag = val.scene.add.dom(val.scene.scale.width - 50, 70 / 2).createFromHTML(info_drag);
                uIDrag.getChildByID('x_pos_drag_info').innerHTML = game_object.x;
                uIDrag.getChildByID('y_pos_drag_info').innerHTML = game_object.y;
                fix_UIDrag_pos(game_object);

                uIDrag.getChildByID('drag_info_button_send').addEventListener('click', () => {
                    // TODO: Change alert to config
                    if (confirm('Are you sure?')) {
                        fetch('http://localhost:43010/update', {
                            method: 'POST',
                            body: JSON.stringify(configToSend),
                            mode: 'no-cors',
                            headers: {
                                'Accept': 'application/json',
                                'Content-Type': 'application/json'
                            }
                        }).then(res => {
                            return res.text();
                        })
                        .then(response => {
                            console.log('Success:', response)
                        })
                        .catch(error => {
                            console.error('Error:', error)
                        });

                        console.log('Esto es lo que se va a enviar ', configToSend);
                    }
                });
            });

            val.scene.input.on('drag', (pointer, game_object, dragX, dragY) => {
                game_object.x = Math.round(dragX);
                game_object.y = Math.round(dragY);
                uIDrag.getChildByID('x_pos_drag_info').innerHTML = game_object.x;
                uIDrag.getChildByID('y_pos_drag_info').innerHTML = game_object.y;
                fix_UIDrag_pos(game_object);
            });

            val.scene.input.on('dragend', (pointer, game_object) => {
                game_object.clearTint();
                configToSend.x = game_object.x;
                configToSend.y = game_object.y;


            });

            const fix_UIDrag_pos = (game_object) => {
                // Corrección de la sobreposición de uIDrag de la derecha
                if (
                    (game_object.x + (game_object.width * game_object.originX)) > uIDrag.x - 50
                    &&
                    (game_object.y - (game_object.height * game_object.originY)) < uIDrag.y + 70 / 2
                ) {
                    uIDrag.x = 50;
                    uIDrag.y = 70 / 2;
                }
                if (
                    (game_object.x - (game_object.width * game_object.originX)) < uIDrag.x + 50
                    &&
                    (game_object.y - (game_object.height * game_object.originY)) < uIDrag.y + 70 / 2
                ) {
                    uIDrag.x = val.scene.scale.width - 50;
                    uIDrag.y = 70 / 2;
                }
            }

        };

        Object.defineProperty(target, key, {
            set: setter,
            enumerable: true,
            configurable: true
        });
    };
}
