import { SuggestBet } from "@shared/components/game-base/type";
export interface PlaceBetContextModel {
    ownBets: object;
    suggestBet: SuggestBet;
    notConfirmOwnBets: object;
    showConfirmBet: boolean;
    showConfirmDialog: boolean;
}
export declare const initialPlaceBetContext: () => {
    ownBets: {};
    notConfirmOwnBets: {};
    showConfirmBet: boolean;
    showConfirmDialog: boolean;
    suggestBet: {
        currentBetChoice: string;
        sendOutstandingBet: any;
        suggestBetAmount: number;
        isInsufficientFunds: any;
    };
};
