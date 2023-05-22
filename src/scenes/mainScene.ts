import { Scene } from 'phaser';
import gameConfig from '../game-config';

import Player from '../game-objects/player';
import ObstaclesGroup from '../game-objects/obstaclesGroup';

import type BaseGameObject from '../game-objects/baseGameObject';
import GemsGroup from '../game-objects/gemsGroup';

export default class MainScene extends Scene {
  private score = 0;
  private hearts = 3;
  private obstacleSpawnTime = 0;
  private gemSpawnTime = 0;

  private infoLayer: Phaser.GameObjects.Layer | undefined;
  private gameLayer: Phaser.GameObjects.Layer | undefined;

  private background: Phaser.GameObjects.TileSprite | undefined;
  private player: Player | undefined;
  private scoreText: Phaser.GameObjects.Text | undefined;
  private obstaclesGroup: ObstaclesGroup | undefined;
  private gemsGroup: GemsGroup | undefined;

  private cursors: Phaser.Types.Input.Keyboard.CursorKeys | undefined;

  constructor() {
    super('main-scene');
  }

  preload(): void {
    this.load.image(gameConfig.sky.key, gameConfig.sky.texture);

    this.load.spritesheet(gameConfig.player.key, gameConfig.player.texture, {
      frameWidth: gameConfig.player.frameWidth,
      frameHeight: gameConfig.player.frameHeight,
    });

    gameConfig.gems.forEach(gem => {
      this.load.image(gem.key, gem.texture);
    })

    gameConfig.obstacles.forEach(obstacle => {
      this.load.image(obstacle.key, obstacle.texture);
    })
  }



  create(): void {
    this.score = 0;
    this.hearts = 3;
    this.obstacleSpawnTime = 0;
    this.gemSpawnTime = 0;

    this.gameLayer = this.add.layer();
    this.infoLayer = this.add.layer();

    const backgroundScale = window.innerWidth / 400;

    this.background = this.add
      .tileSprite(0, 0, 400, 2000, gameConfig.sky.key)
      .setOrigin(0)
      .setScrollFactor(0, 1);

    this.background.scale = backgroundScale;

    this.cursors = this.input.keyboard?.createCursorKeys();

    if (this.cursors == null) return;

    const x = window.innerWidth / 2;
    const y = window.innerHeight - 100;

    this.player = new Player(this, x, y, gameConfig.player, this.cursors);

    this.obstaclesGroup = new ObstaclesGroup(this, this.gameLayer);
    this.gemsGroup = new GemsGroup(this, this.gameLayer);


    this.scoreText = this.add.text(100, 100, 'Score: 0 | Hearts: 3', {
      backgroundColor: '#456eee',
      padding: { x: 4, y: 3 },
    });

    this.physics.add.overlap(
      this.player,
      this.gemsGroup,
      this.collectGem as Phaser.Types.Physics.Arcade.ArcadePhysicsCallback,
      undefined,
      this
    );

    this.physics.add.overlap(
      this.player,
      this.obstaclesGroup,
      this.collideObstacle as Phaser.Types.Physics.Arcade.ArcadePhysicsCallback,
      undefined,
      this
    );

    // Layout:
    this.infoLayer.add(this.scoreText);
    this.gameLayer.add(this.background);
    this.gameLayer.add(this.player);
  }

  update(time: number, _delta: number): void {
    this.player?.move();

    this.background?.setTilePosition(0, this.background.tilePositionY - 1);

    if (time - this.obstacleSpawnTime > 4000) {
      this.obstacleSpawnTime = time;
      this.obstaclesGroup?.spawn();
    }

    if (time - this.gemSpawnTime > 2000) {
      this.gemSpawnTime = time;
      this.gemsGroup?.spawn();
    }

    if (this.hearts <= 0) {
      this.scene.start('game-over-scene', { score: this.score });
    }
  }

  collectGem(
    _player: Phaser.Types.Physics.Arcade.SpriteWithDynamicBody,
    gem: BaseGameObject
  ): void {
    gem.disableBody(true, true);

    this.score += gem.config.score;
    this.hearts += gem.config.hearts;
    this.scoreText?.setText(`Score: ${this.score} | Hearts: ${this.hearts}`);
  }

  collideObstacle(
    _player: Phaser.Types.Physics.Arcade.SpriteWithDynamicBody,
    obstacle: BaseGameObject
  ): void {
    obstacle.disableBody(true, true);

    this.score += obstacle.config.score;
    this.hearts += obstacle.config.hearts;
    this.scoreText?.setText(`Score: ${this.score} | Hearts: ${this.hearts}`);
  }
}
