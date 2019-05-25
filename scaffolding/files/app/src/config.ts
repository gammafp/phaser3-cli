import { Bootloader } from './Bootloader';
import { MainScene } from './scenes/MainScene';

export const CONFIG: any = {
    title: '{title}',
    version: '0.0.1',
    type: {type},
    backgroundColor: '#22a6b3',
    scale: {
        parent: 'phaser_container',
        width: {width},
        height: {height},
        mode: Phaser.Scale.FIT,
        autoCenter: Phaser.Scale.CENTER_BOTH
    },
    render: {
        pixelArt: {pixelart},
    },{physics}
    scene: [
        Bootloader,
        MainScene
    ]
};
