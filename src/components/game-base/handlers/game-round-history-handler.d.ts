import { GameStateContextModel } from "../../../_shared/react-contexts/game-state-context/game-state-context-model";
export type GameRoundHistorydHandlerProps = {
    dispatch: Function;
    gameStateContextModel(): GameStateContextModel;
};
export declare class GameRoundHistoryHandler {
    private readonly props;
    constructor(props: GameRoundHistorydHandlerProps);
    handleRoundHistory({ roundHistory, roundId, newRoundState }: {
        roundHistory: any;
        roundId: any;
        newRoundState: any;
    }): void;
}
