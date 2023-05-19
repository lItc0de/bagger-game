import './style.css';
import { Game, WEBGL } from 'phaser';

import MainScene from './scenes/main-scene';

const canvas = document.getElementById('game') as HTMLCanvasElement;

const config: Phaser.Types.Core.GameConfig = {
  type: WEBGL,
  width: window.innerWidth,
  height: window.innerHeight,
  canvas,
  physics: {
    default: 'arcade',
    arcade: {
      gravity: { y: 0 },
      // debug: true
    },
  },
  scene: [MainScene],
};

export const game = new Game(config);
