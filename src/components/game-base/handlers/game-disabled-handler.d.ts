import { GameStateContextModel } from "../../../_shared/react-contexts/game-state-context/game-state-context-model";
import { IRoundStateHandler } from "../../round-base/round-state-handler";
import { GameDurations } from "../type";
import { GameMessageHandler } from "./game-message-handler";
export type GameDisabledHandlerProps = {
    dispatch: Function;
    gameMessageHandler: GameMessageHandler;
    roundStateHandler: IRoundStateHandler;
    gameStateContextModel(): GameStateContextModel;
    durations: GameDurations;
};
export declare class GameDisableHandler {
    private readonly props;
    constructor(props: GameDisabledHandlerProps);
    handleUM({ um, um_message, remainingTime }: {
        um: any;
        um_message: any;
        remainingTime: any;
    }, timeCounter: number): void;
}
