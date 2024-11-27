export * from './constants';

// You can also add utility functions here
export function getRandomIndex(max: number): number {
  return Math.floor(Math.random() * max);
}

export function shuffleArray<T>(array: T[]): T[] {
  return [...array].sort(() => Math.random() - 0.5);
}
