import { Scene } from 'phaser';
import skyTexture from '../assets/artwork.png';
import playerTexture from '../assets/logo.png';

import Player from '../game-objects/player';
import Gems from '../game-objects/gems';

enum ImageNames {
  Sky = 'sky',
  Player = 'player',
  Gem = 'gem',
}

export default class MainScene extends Scene {
  private player: Player | undefined;
  private gems: Gems | undefined;
  private cursors: Phaser.Types.Input.Keyboard.CursorKeys | undefined;
  private score = 0;
  private lastSpawnTime = 0;

  constructor() {
    super('main-scene');
  }

  preload(): void {
    this.load.image(ImageNames.Sky, skyTexture);
    this.load.spritesheet(ImageNames.Player, playerTexture, {
      frameWidth: 32,
      frameHeight: 48,
    });
    this.load.spritesheet(ImageNames.Gem, playerTexture, {
      frameWidth: 32,
      frameHeight: 48,
    });
  }

  create(): void {
    this.add.image(400, 300, ImageNames.Sky);

    this.cursors = this.input.keyboard?.createCursorKeys();

    if (this.cursors == null) return;

    const x = window.innerWidth / 2;
    const y = window.innerHeight - 100;

    this.player = new Player(this, x, y, ImageNames.Player, this.cursors);
    this.gems = new Gems(this, ImageNames.Gem);

    this.physics.add.overlap(
      this.player.display,
      this.gems.display,
      this.collectGem,
      null,
      this
    );
  }

  update(time: number, delta: number): void {
    this.player?.update();
    this.gems?.update();

    if (time - this.lastSpawnTime > 2000) {
      this.lastSpawnTime = time;
      this.gems?.spawn();
    }
  }

  collectGem(
    player: Phaser.Types.Physics.Arcade.SpriteWithDynamicBody,
    gem: Phaser.Physics.Arcade.Image,
  ): void {
    gem.disableBody(true, true);

    this.score += 10;
    console.log('Score:', this.score);
  }
}
