import { type Scene } from 'phaser';

export default class Gem {
  private readonly sprite: Phaser.Types.Physics.Arcade.SpriteWithDynamicBody;
  // private readonly scene: Scene;
  // private readonly texture: string;

  constructor(
    scene: Scene,
    x: number,
    y: number,
    texture: string,
  ) {
    // this.scene = scene;
    // this.texture = texture;

    this.sprite = scene.physics.add.sprite(x, y, texture);

    this.initialize();
    this.addAnims();
  }

  initialize(): void {
    this.sprite.setCollideWorldBounds(false);
  }

  update(): void {

  }

  addAnims(): void {}

  get display(): Phaser.Physics.Arcade.Sprite {
    return this.sprite;
  }
}
