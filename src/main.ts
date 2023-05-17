import './style.css';
import { Scene, Game, WEBGL, type GameObjects } from 'phaser';
import sky from './assets/artwork.png';
import logo from './assets/logo.png';
import particle from './assets/particle.png';

const canvas = document.getElementById('game') as HTMLCanvasElement;

class GameScene extends Scene {
  private textbox: GameObjects.Text | undefined;

  constructor() {
    super('scene-game');
  }

  preload(): void {
    this.load.image('sky', sky);
    this.load.image('logo', logo);
    this.load.image('particle', particle);
  }

  create(): void {
    this.add.image(400, 300, 'sky');

    const particles = this.add.particles(0, 0, 'particle', {
      speed: 100,
      scale: { start: 1, end: 0 },
      blendMode: 'ADD',
    });

    const logo = this.physics.add.image(400, 100, 'logo');

    this.textbox = this.add.text(
      window.innerWidth / 2,
      window.innerHeight / 2,
      'Welcome to Phaser x Vite!',
      {
        color: '#FFF',
        fontFamily: 'monospace',
        fontSize: '26px',
      }
    );

    logo.setVelocity(100, 200);
    logo.setBounce(1, 1);
    logo.setCollideWorldBounds(true);

    particles.startFollow(logo);
  }

  update(time: number, delta: number): void {
    if (this.textbox == null) {
      return;
    }

    this.textbox.rotation += 0.0005 * delta;
  }
}

const config = {
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
  scene: [GameScene],
};

export const game = new Game(config);
