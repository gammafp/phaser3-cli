import { MainScene } from './scenes/MainScene';
import { Bootloader } from './Bootloader';

export const CONFIG: any = {
    title: "{title}",
    version: "0.0.1",
    type: {type},
    backgroundColor: "#4834d4",
    scale: {
        parent: 'game',
        width: {width},
        height: {height},
        mode: Phaser.Scale.FIT,
        autoCenter: Phaser.Scale.CENTER_BOTH
    },
    render: {
        pixelArt: {pixelart},
    },
    {physics}
    scene: [
        Bootloader,
        MainScene
    ]
};
