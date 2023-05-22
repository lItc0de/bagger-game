import { Scene } from 'phaser';

export class LoadingScene extends Scene {
  constructor() {
    super('loading-scene');
  }

  create(): void {
    console.log('hello loading');

    const loadingText = this.make.text({
      x: window.innerWidth / 2,
      y: window.innerHeight / 2 - 50,
      text: 'Bagger Game',
      style: {
        font: '20px monospace',
        color: '#ffffff',
      },
    });
    loadingText.setOrigin(0.5, 0.5);

    const startButton = this.add
      .text(
        this.cameras.main.centerX,
        this.cameras.main.centerY,
        'Start',
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
