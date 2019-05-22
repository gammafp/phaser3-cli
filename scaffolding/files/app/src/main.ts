import 'phaser';
import { CONFIG } from './config';
declare const BUILD_TARGET: string;

class Game extends Phaser.Game {
    constructor(config: Phaser.Types.Core.GameConfig) {
        super(config);
    }
}

const game = new Game(CONFIG);