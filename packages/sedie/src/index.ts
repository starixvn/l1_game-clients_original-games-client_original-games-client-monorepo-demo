// Register the game when the module is loaded
import './game-registry';

// Export the main page component
export { default } from './page';

// Export other components that might be needed
export * from './sedie-multiplayer-constants';
export * from './sedie-multiplayer-game-round-data-handler';
export * from './result-block/sedie-plate';
export * from './sedie-multiplayer-betting-block';
export * from './round-history/sedie-multiplayer-round-history';
export * from './history';
export * from './scoreboard';
export * from './provably-fair';
