export class Bootloader extends Phaser.Scene {
    constructor() {
        super({
            key: 'Bootloader'
        });
        console.log('Scene Bootloader');
    }

    preload(): void {
        this.load.setPath('assets/');
        this.load.image('phaser3_cli');        

        this.load.on('complete', () => {
            this.scene.start('MainScene');
        });
    }

}
