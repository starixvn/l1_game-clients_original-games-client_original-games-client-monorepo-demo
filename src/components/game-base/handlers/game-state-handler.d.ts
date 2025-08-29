import { GameStateContextModel } from "../../../_shared/react-contexts/game-state-context/game-state-context-model";
import { GameDurations, RoundState } from "../type";
type GameStateHandlerProps = {
    gameStateContextModel: GameStateContextModel;
    nextRoundState: RoundState;
    durations: GameDurations;
    defaultResult: any;
    defaultSettlementResult: any;
    remainingTime: number;
};
export interface IGameStateHandler {
    getNextRoundState({ gameStateContextModel, nextRoundState, durations, defaultResult, defaultSettlementResult, remainingTime, }: GameStateHandlerProps): any;
}
export declare class GameStateHandler implements IGameStateHandler {
    getNextRoundState({ gameStateContextModel, nextRoundState, durations, defaultResult, defaultSettlementResult, remainingTime, }: GameStateHandlerProps): {
        remainingTime: number;
    };
    private getTimeCounter;
}
export {};
