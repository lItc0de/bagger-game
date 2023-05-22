import skyTexture from './assets/background.png';
import playerTexture from './assets/bagger.png';

// Gems:
import coalTexture from './assets/coal.png';
import treeTexture from './assets/tree.png';
import foxTexture from './assets/fox.png';

// Obstacles:
import powerPlantTexture from './assets/power-plant.png';
import legoLakeTexture from './assets/lego-lake.png';

export interface GameObjectConfig {
  key: string;
  texture: string;
  score: number;
  probability: number;
  velocityY: number;
  hearts: number;
}

export default {
  sky: {
    key: 'sky',
    texture: skyTexture,
  },

  player: {
    key: 'player',
    texture: playerTexture,
    frameWidth: 668,
    frameHeight: 1486,
  },

  gems: [
    {
      key: 'coal',
      texture: coalTexture,
      score: 10,
      probability: 0.5,
      velocityY: 200,
      hearts: 0,
    },
    {
      key: 'tree',
      texture: treeTexture,
      score: 15,
      probability: 0.2,
      velocityY: 200,
      hearts: 0,
    },
    {
      key: 'fox',
      texture: foxTexture,
      score: 12,
      probability: 0.3,
      velocityY: 175,
      hearts: 0,
    },
  ],

  obstacles: [
    {
      key: 'power-plant',
      texture: powerPlantTexture,
      score: -20,
      probability: 0.5,
      velocityY: 160,
      hearts: -1,
    },
    {
      key: 'lego-lake',
      texture: legoLakeTexture,
      score: -15,
      probability: 0.5,
      velocityY: 160,
      hearts: -1,
    },
  ],
};
