import { type GameObjectConfig } from '../game-config';

export const getRandXYTop = (): { x: number; y: number } => {
  const x = Math.floor(Math.random() * window.innerWidth);
  const y = 0;

  return { x, y };
};

export const getRandGameObject = (
  gameObjectConfigs: GameObjectConfig[] = []
): GameObjectConfig =>
  gameObjectConfigs[Math.floor(Math.random() * gameObjectConfigs.length)];
