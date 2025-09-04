// Register the game when the module is loaded
import './game-registry';

export { default } from './page';
export * from './baccarat-constants';
export { default as BaccaratBettingBlock } from './betting-block/baccarat-betting-block';
export { default as BaccaratResultBlock } from './result-block/baccarat-result-block';
export { default as BaccaratRoundHistory } from './round-history/baccarat-round-history';


