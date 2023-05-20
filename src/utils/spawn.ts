export const getRandXYTop = (): { x: number; y: number } => {
  const x = Math.floor(Math.random() * window.innerWidth);
  const y = 0;

  return { x, y };
};
