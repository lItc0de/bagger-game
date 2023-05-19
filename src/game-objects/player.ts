import { type Scene } from 'phaser';

export default class Player {
  private readonly sprite: Phaser.Types.Physics.Arcade.SpriteWithDynamicBody;
  private readonly cursors: Phaser.Types.Input.Keyboard.CursorKeys;
  private readonly scene: Scene;
  private readonly texture: string;

  constructor(
    scene: Scene,
    x: number,
    y: number,
    texture: string,
    cursors: Phaser.Types.Input.Keyboard.CursorKeys
  ) {
    this.scene = scene;
    this.cursors = cursors;
    this.texture = texture;

    this.sprite = scene.physics.add.sprite(x, y, texture);

    this.initialize();
    this.addAnims();
  }

  initialize(): void {
    this.sprite.setCollideWorldBounds(true);
  }

  update(): void {
    if (this.cursors.left.isDown) {
      this.sprite.setVelocityX(-160);

      this.sprite.anims.play('left', true);
    } else if (this.cursors.right.isDown) {
      this.sprite.setVelocityX(160);

      this.sprite.anims.play('right', true);
    } else {
      this.sprite.setVelocityX(0);

      this.sprite.anims.play('turn');
    }
  }

  addAnims(): void {
    this.scene.anims.create({
      key: 'left',
      frames: this.scene.anims.generateFrameNumbers(this.texture, {
        start: 0,
        end: 3,
      }),
      frameRate: 10,
      repeat: -1,
    });

    this.scene.anims.create({
      key: 'turn',
      frames: [{ key: this.texture, frame: 4 }],
      frameRate: 20,
    });

    this.scene.anims.create({
      key: 'right',
      frames: this.scene.anims.generateFrameNumbers(this.texture, {
        start: 5,
        end: 8,
      }),
      frameRate: 10,
      repeat: -1,
    });
  }

  get display(): Phaser.Physics.Arcade.Sprite {
    return this.sprite;
  }
}
