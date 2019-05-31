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
export function dragGameObject() {

    return (target: any, key: string | symbol) => {
        const sceneName = target.constructor.name;
        let val = target[key];

        const setter = (gameObject) => {
            val = gameObject;
            val.setInteractive();

            val.scene.input.setDraggable(val);
            val.scene.input.on('dragstart', (pointer, game_object) => {
                game_object.setTint(0xff0000);
      
                const div = document.createElement('div');
                div.setAttribute('id', 'uIDrag');
                div.style.background = `rgba(${Phaser.Math.Between(0, 254)}, 255, ${Phaser.Math.Between(0, 254)})`;
                div.style.width = '100px';
                div.style.height = '100px';

                if (uIDrag !== null) {
                    uIDrag.destroy();
                }
                uIDrag = val.scene.add.dom(Phaser.Math.Between(25, 300), 100, div);


            });

            val.scene.input.on('drag', (pointer, game_object, dragX, dragY) => {
                game_object.x = dragX;
                game_object.y = dragY;
            });

            val.scene.input.on('dragend', (pointer, game_object) => {
                game_object.clearTint();
                const modificarDiv = document.querySelector('#uIDrag') as HTMLElement;
                modificarDiv.style.background = 'rgb(255, 0, 0)';
            });
        };

        Object.defineProperty(target, key, {
            set: setter,
            enumerable: true,
            configurable: true
        });
    };
}
