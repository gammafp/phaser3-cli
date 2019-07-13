import { buildTargets } from '../constants';

export class MainScene extends Phaser.Scene {
    image: Phaser.GameObjects.Image;
    constructor() {
        super({
            key: 'MainScene'
        });
    }

    init() {
        console.log('MainScene');
    }

    create(): void {
        this.image = this.add.image(this.scale.width / 2, this.scale.height / 2, 'phaser3_cli');
    }
}
