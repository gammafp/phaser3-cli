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

export function dragGameObject() {
    return (target: object, key: string | symbol) => {
        let val = target[key];

        const setter = (gameObject) => {
            val = gameObject;
            val.setInteractive();

            val.scene.input.setDraggable(val);
            val.scene.input.on('dragstart', (pointer, game_object) => {
                game_object.setTint(0xff0000);
            });

            val.scene.input.on('drag', (pointer, game_object, dragX, dragY) => {
                game_object.x = dragX;
                game_object.y = dragY;
            });

            val.scene.input.on('dragend', (pointer, game_object) => {
                game_object.clearTint();
            });
        };

        Object.defineProperty(target, key, {
            set: setter,
            enumerable: true,
            configurable: true
        });
    };
}
