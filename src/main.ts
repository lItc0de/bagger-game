import './style.css';
import { Game, WEBGL } from 'phaser';

import MainScene from './scenes/mainScene';
import { LoadingScene } from './scenes/loadingScene';
import { GameOverScene } from './scenes/gameOverScene';

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
      debug: true
    },
  },
  scene: [LoadingScene, MainScene, GameOverScene],
};

export const game = new Game(config);

const sizeChanged = (): void => {
  if (game.isBooted) {
    setTimeout(() => {
      game.scale.resize(window.innerWidth, window.innerHeight);
      game.canvas.setAttribute(
        'style',
        `display: block; width: ${window.innerWidth}px; height: ${window.innerHeight}px;`
      );
    }, 100);
  }
};

window.addEventListener('resize', () => {
  sizeChanged();
});
