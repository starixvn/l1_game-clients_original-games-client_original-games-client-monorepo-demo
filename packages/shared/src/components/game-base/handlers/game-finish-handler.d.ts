import { Dispatch } from "react";
import { GameEventAction } from "@shared/react-contexts/game-state-context/game-event-action";
import { GameStateContextModel } from "@shared/react-contexts/game-state-context/game-state-context-model";
import { IRoundStateHandler } from "../../round-base/round-state-handler";
import { GameDurations } from "../type";
import { GameMessageHandler } from "./";
import { GameRoundDataHandler } from "./game-round-data-handler";
export type GameFinishHandlerProps = {
    dispatch: Dispatch<GameEventAction>;
    gameMessageHandler: GameMessageHandler;
    durations: GameDurations;
    roundStateHandler: IRoundStateHandler;
    runGame: Function;
    gameId: number;
    gameStateContextModel(): GameStateContextModel;
    gameRoundDataHandler: GameRoundDataHandler;
};
export declare class GameFinishHandler {
    private readonly props;
    protected showResultInfoTimeout: NodeJS.Timeout;
    protected showWinningAnimationTimeout: NodeJS.Timeout;
    private _betWin;
    private _roundHistory;
    private _finish;
    constructor(props: GameFinishHandlerProps);
    set betWin(betWin: number);
    registerEvents: () => void;
    handleFinishHandler(finish: any): void;
    handleRoundHistoryHandler(history: any): void;
    handleStatus: ({ status }: {
        status: any;
    }) => void;
    handleFinish: ({ finish }: {
        finish: any;
    }) => void;
    handleRoundHistory: () => void;
    clearTimeout: () => void;
}
