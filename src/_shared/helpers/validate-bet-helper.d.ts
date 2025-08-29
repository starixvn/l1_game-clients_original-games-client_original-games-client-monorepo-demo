import { GameConfigs, RoundState } from "@/components/game-base/type";
import { GameStateContextModel } from "../react-contexts/game-state-context/game-state-context-model";
import { PlaceBetContextModel } from "../react-contexts/game-state-context/place-bet-context/place-bet-context-model";
export interface IAvailableSuggestBetAmount {
    suggestAmount?: number;
    isInsufficientFunds?: boolean;
    isSuggestBet?: boolean;
    errorCode?: string;
    args?: object;
    maxBetPerChoice?: number;
    mode: SuggestBetMode;
}
declare enum SuggestBetMode {
    ReachMaxBet = "ReachMaxBet",
    SuggestBet = "SuggestBet",
    MinBet = "MinBet",
    MaxBetRound = "MaxBetRound"
}
export declare const validateHedgeBet: (hedgeBetGroup: string[], ownBets: object, betChoice: string, amount: number) => boolean;
export declare const getRoundMinBet: (gameConfigs: GameConfigs, userMinBet: number) => number;
export declare const getRoundMaxBet: (gameConfigs: GameConfigs, userMaxBet: number) => number;
export declare const getMaxBetPerChoice: (gameConfigs: GameConfigs, betChoice: string) => number;
export declare const getCurrentAmountOfChoice: (ownBets: object, notConfirmOwnBets: object, betChoice: string) => number;
export declare const isInsufficientFunds: (amount: number, accountBalance: number, totalBetNotConfirmAmount: number, enabledQuickBet: boolean) => boolean;
export declare const isOptionReachMaxBet: (currentTotalAmountOfChoice: number, maxBetPerChoice: number) => boolean;
export declare const isMinBet: (amount: number, roundMinBet: number, suggestAmount: number) => boolean;
export declare const isMaxBetRound: (amount: number, roundMaxBet: number, totalBetAmount: number) => boolean;
export declare const isInPhasePreventBet: (roundState: RoundState) => boolean;
export declare const isBalanceUnavailable: (availableBalance: number, amount: number, gameStateContext: GameStateContextModel, notConfirmOwnBets: object, enabledQuickBet: boolean) => boolean;
export declare const isHedgeBet: (hedgeBetGroups: string[], betChoice: string, amount: number, ownBets: object) => boolean;
export declare const findHedgeBetGroup: (hedgeBetGroups: string[][], betChoice: string) => string[];
export declare const getAccountBalance: (balance: number) => number;
export declare const getMaxAvailableAmountOfChoice: (maxBetPerChoice: number, currentAmountOfChoice: number, roundMaxBet: number, totalBetNotConfirmAmount: number, totalBeAmount: number, accountBalance: number, enabledQuickBet: boolean) => number;
export declare const getCriteriaValidateBet: (gameStateContext: GameStateContextModel, placeBetContext: PlaceBetContextModel, betChoice: string, amount: number, accountBalance: number, enabledQuickBet: boolean) => {
    errorCode: string;
    args?: object;
};
export declare const getTotalNotConfirmBet: (notConfirmOwnBets: object) => number;
export declare const getTotalBetAmount: (placeBetContext: PlaceBetContextModel) => number;
export {};
