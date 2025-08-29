import { RoundState } from "../game-base/type";
export type GameSoundHandlerProps = {
    gameSound: () => {
        startPlaceBetSound: Function;
        startRoundSound: Function;
        blockBetSound: Function;
        playPlaceBetSound: Function;
    };
};
export interface IGameSoundHandler {
    handleSound(newRoundState: RoundState): void;
}
export declare class RoundGameSoundHandler implements IGameSoundHandler {
    protected readonly props: GameSoundHandlerProps;
    constructor(props: GameSoundHandlerProps);
    handleSound(newRoundState: RoundState): void;
}
