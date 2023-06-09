import Phaser from 'phaser';
import { type GameObjectConfig } from '../game-config';

export default class BaseGameObject extends Phaser.Physics.Arcade.Sprite {
  readonly config: GameObjectConfig;

  constructor(
    scene: Phaser.Scene,
    x: number,
    y: number,
    config: GameObjectConfig,
  ) {
    super(scene, x, y, config.key);
    this.config = config;

    scene.physics.world.enableBody(this);

    this.body?.setSize(this.body.width - 30, this.body.height - 30, true);
  }

  addedToScene(): void {
    this.setVelocityY(this.config.velocityY);
  }
}
