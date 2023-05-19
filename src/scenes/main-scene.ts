import { Scene } from 'phaser';
import skyTexture from '../assets/artwork.png';
import playerTexture from '../assets/logo.png';

import Player from '../game-objects/player';
import Gem from '../game-objects/gem';

enum ImageNames {
  Sky = 'sky',
  Player = 'player',
}

export default class MainScene extends Scene {
  private player: Player | undefined;
  private gem: Gem | undefined;
  private cursors: Phaser.Types.Input.Keyboard.CursorKeys | undefined;

  constructor() {
    super('main-scene');
  }

  preload(): void {
    this.load.image(ImageNames.Sky, skyTexture);
    this.load.spritesheet(ImageNames.Player, playerTexture, { frameWidth: 32, frameHeight: 48 });
  }

  create(): void {
    this.add.image(400, 300, ImageNames.Sky);

    this.cursors = this.input.keyboard?.createCursorKeys();

    if (this.cursors == null) return;

    const x = window.innerWidth / 2;
    const y = window.innerHeight - 100;

    this.player = new Player(this, x, y, ImageNames.Player, this.cursors);
    this.gem = new Gem(this, x, y, ImageNames.Player);
  }

  update(time: number, delta: number): void {
    this.player?.update();
  }
}
