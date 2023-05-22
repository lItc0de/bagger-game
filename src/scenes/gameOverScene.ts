import { Scene } from 'phaser';

export class GameOverScene extends Scene {
  private score: number | undefined;

  constructor() {
    super('game-over-scene');
  }

  create(data?: { score: number }): void {
    this.score = data?.score;

    const gameOverText = this.make.text({
      x: window.innerWidth / 2,
      y: window.innerHeight / 2 - 50,
      text: `Game Over | Score: ${this.score != null ? this.score : 0}`,
      style: {
        font: '20px monospace',
        color: '#ffffff',
      },
    });
    gameOverText.setOrigin(0.5, 0.5);

    const startButton = this.add
      .text(
        this.cameras.main.centerX,
        this.cameras.main.centerY,
        'Start Again',
        {
          font: '20px monospace',
          color: '#ffffff',
        }
      )
      .setOrigin(0.5)
      .setPadding(10)
      .setStyle({ backgroundColor: '#111' })
      .setInteractive({ useHandCursor: true })
      .on('pointerdown', this.startGame.bind(this))
      .on('pointerover', () => startButton.setStyle({ fill: '#f39c12' }))
      .on('pointerout', () => startButton.setStyle({ fill: '#FFF' }));
  }

  startGame(): void {
    this.scene.start('main-scene');
  }
}
