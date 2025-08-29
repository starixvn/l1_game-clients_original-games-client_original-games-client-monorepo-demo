import { StateCreator } from "zustand";
import { GameConfigs, GameDurations, IUserStakeLevel, PlayerResultBoard, Round, RoundState } from "../../../components/game-base/type";
export interface GameConfigSlice {
    gameConfigs: GameConfigs | null;
    roundHistory: Round<object, object>[];
    roundId: number;
    result?: any;
    settlementResult?: any;
    disabledMessage?: string;
    showResultInfo: boolean;
    playResultAnimation: boolean;
    isShowBlink: boolean;
    rate?: number;
    userStakeLevel?: IUserStakeLevel;
    playerResultBoard?: PlayerResultBoard;
    prevRoundState: RoundState;
    roundState: RoundState;
    nextRoundState: RoundState;
    durations?: GameDurations;
    defaultResult: any;
    defaultSettlementResult: any;
    remainingTime: number;
    setRoundHistory: ({ roundHistory, roundId, result, settlementResult, isShowBlink }: any) => void;
    showResultInfoTimeOut: ({ roundHistory, isShowBlink, showResultInfo, playResultAnimation }: any) => void;
    setRate: ({ rate }: {
        rate: number;
    }) => void;
    registerGameConfigEvent: (message: any) => void;
    setGameState: (message: any) => void;
    setRoundState: (roundState: RoundState) => void;
    setShowResultInfo: (showResultInfo: boolean) => void;
    setUMMessage: (message: string) => void;
}
export declare const createGameConfigSlice: StateCreator<GameConfigSlice>;
