import { StateCreator } from "zustand";
export interface BettingInfoSlice {
    totalBets: Record<string, number>;
    betPercentage: Record<string, number>;
    playerBetCount: Record<string, number>;
    ownBets: Record<string, number>;
    endBet: number;
    setTotalBets: (totalBets: Record<string, number>) => void;
    setBetPercentage: (betPercentage: Record<string, number>) => void;
    setPlayerBetCount: (playerBetCount: Record<string, number>) => void;
    setOwnBets: (ownBets: Record<string, number>) => void;
    setEndBet: (endBet: number) => void;
    registerBettingInfoEvent: (message: any) => void;
    resetBettingInfo: () => void;
}
export declare const createBettingInfoSlice: StateCreator<BettingInfoSlice>;
