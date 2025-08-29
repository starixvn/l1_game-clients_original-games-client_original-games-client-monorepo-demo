import { GameDurations, RoundState } from "../game-base/type";
export interface IRoundStateHandler {
    determineRoundBaseState({ roundRemainingTime, wholeRound, remainingTime, durations }: {
        roundRemainingTime: any;
        wholeRound: any;
        remainingTime: any;
        durations: any;
    }): RoundState;
    getRemainingTime({ remainingTime, durations }: {
        remainingTime: any;
        durations: any;
    }): number;
    getWholeRoundDuration({ durations }: {
        durations: any;
    }): number;
}
export declare class RoundStateHandler implements IRoundStateHandler {
    constructor();
    determineRoundBaseState({ roundRemainingTime, wholeRound, remainingTime, durations, }: {
        roundRemainingTime: number;
        wholeRound: number;
        remainingTime: number;
        durations: GameDurations;
    }): RoundState;
    getRemainingTime({ remainingTime, durations }: {
        remainingTime: any;
        durations: any;
    }): number;
    getWholeRoundDuration({ durations }: {
        durations: any;
    }): number;
}
