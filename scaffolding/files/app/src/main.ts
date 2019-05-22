import 'phaser';
import { CONFIG } from './config';
declare const BUILD_TARGET: string;
import { pgOnInit } from '../gamma/core';

class Game {
    config: Phaser.Types.Core.GameConfig
    constructor(configIn) {
        this.config = configIn;
    }

    @pgOnInit
    init() {
        new Phaser.Game(this.config);
    }
}

const game = new Game(CONFIG);