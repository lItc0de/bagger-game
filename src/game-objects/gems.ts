import { type Scene } from 'phaser';
import { getRandXYTop } from '../utils/spawn';

export default class Gems {
  private readonly group: Phaser.Physics.Arcade.Group;
  private readonly scene: Scene;
  private readonly texture: string;

  constructor(scene: Scene, texture: string) {
    this.scene = scene;
    this.texture = texture;

    this.group = scene.physics.add.group({
      key: texture,
      allowGravity: true,
      collideWorldBounds: false,
      velocityY: 100,
    });

    this.initialize();
  }

  initialize(): void {}

  update(): void {}

  spawn(): void {
    const { x, y } = getRandXYTop();

    this.group.create(x, y);
  }

  get display(): Phaser.Physics.Arcade.Group {
    return this.group;
  }
}
