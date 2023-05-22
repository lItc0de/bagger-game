import Phaser from 'phaser';
import gameConfig from '../game-config';

export default class Player extends Phaser.Physics.Arcade.Sprite {
  private readonly cursors: Phaser.Types.Input.Keyboard.CursorKeys;

  constructor(
    scene: Phaser.Scene,
    x: number,
    y: number,
    playerConfig: typeof gameConfig.player,
    cursors: Phaser.Types.Input.Keyboard.CursorKeys
  ) {
    super(scene, x, y, playerConfig.key);
    scene.add.existing(this);
    scene.physics.world.enableBody(this);

    this.cursors = cursors;

    this.setCollideWorldBounds(true);
    this.scale = 0.2;
    this.addAnims();
  }

  move(): void {
    if (this.cursors.left.isDown) {
      this.setVelocityX(-160);

      this.anims.play('left', true);
    } else if (this.cursors.right.isDown) {
      this.setVelocityX(160);

      this.anims.play('right', true);
    } else {
      this.setVelocityX(0);

      this.anims.play('turn', true);
    }
  }

  addAnims(): void {
    if (!this.scene.anims.exists('left')) {
      this.scene.anims.create({
        key: 'left',
        frames: this.scene.anims.generateFrameNumbers(gameConfig.player.key, {
          start: 0,
          end: 1,
        }),
        frameRate: 10,
        repeat: -1,
      });
    }

    if (!this.scene.anims.exists('turn')) {
      this.scene.anims.create({
        key: 'turn',
        frames: this.scene.anims.generateFrameNumbers(gameConfig.player.key, {
          start: 2,
          end: 3,
        }),
        frameRate: 10,
      });
    }

    if (!this.scene.anims.exists('right')) {
      this.scene.anims.create({
        key: 'right',
        frames: this.scene.anims.generateFrameNumbers(gameConfig.player.key, {
          start: 2,
          end: 3,
        }),
        frameRate: 10,
        repeat: -1,
      });
    }
  }
}
