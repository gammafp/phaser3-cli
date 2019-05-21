import { buildTargets } from '../constants';

export class MainScene extends Phaser.Scene {


    private phaserSprite: Phaser.GameObjects.Sprite;

    constructor() {
        super({
            key: 'MainScene'
        });
    }
    PruebUno() {

    }
    preload(): void {
        this.load.image('logo', './assets/phaser.png');
    }

    create(): void {
        this.phaserSprite = this.add.sprite(40, 300, 'logo');
    }
}
