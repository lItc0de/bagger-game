import Phaser from 'phaser';
import { getRandGameObject, getRandXYTop } from '../utils/spawn';
import gameConfig from '../game-config';
import BaseGameObject from './baseGameObject';

export default class GemsGroup extends Phaser.Physics.Arcade.Group {
  private readonly layer: Phaser.GameObjects.Layer

  constructor(scene: Phaser.Scene, layer: Phaser.GameObjects.Layer) {
    super(scene.physics.world, scene);

    this.layer = layer;
  }

  spawn(): void {
    const { x, y } = getRandXYTop();
    const gem = new BaseGameObject(this.scene, x, y, getRandGameObject(gameConfig.gems));

    this.add(gem, true);
    this.layer.add(gem);
  }
}
