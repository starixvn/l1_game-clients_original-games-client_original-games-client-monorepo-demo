import { TFnType, TranslationKey } from "@tolgee/react";
import { Dispatch } from "react";
import { GameMessageHandler } from "..";
import { SystemContextModel } from "@shared/react-contexts";
import { GameStateContextModel } from "@shared/react-contexts/game-state-context/game-state-context-model";
import { PlaceBetEventAction } from "@shared/react-contexts/game-state-context/place-bet-context/place-bet-action";
import { PlaceBetContextModel } from "@shared/react-contexts/game-state-context/place-bet-context/place-bet-context-model";
import { NoticeModel, RoundState } from "../../type";
export type PlaceBetHandlerProps = {
    tolgeeNamespace: string;
    gameName: string;
    gameMessageHandler: GameMessageHandler;
    translate: TFnType<string, TranslationKey>;
    playPlaceBetSound?: Function;
    hedgeBetGroups: string[][];
    getPlayerBalance: Function;
    gameId: number;
    signOut?: Function;
    betPayloadFormat?: "map" | "single";
};
export declare class PlaceBetHandler {
    readonly props: PlaceBetHandlerProps;
    private retryInterval;
    private placeBetDispatch;
    private placeBetContext;
    private endBetHandlerId;
    private ownBetsHandlerId;
    private finishHandlerId;
    private roundStateHandlerId;
    private isProcessingBet;
    private roundState;
    private isFirstOwnBetHandler;
    private endPlaceBetHandlerId;
    constructor(props: PlaceBetHandlerProps);
    setPlaceBetDispatch: (dispatch: Dispatch<PlaceBetEventAction>) => void;
    getPlaceBetDispatch: () => Dispatch<PlaceBetEventAction>;
    registerEvents: (signOut: () => void, placeBetContext: PlaceBetContextModel) => void;
    handleRoundState: ({ roundState }: {
        roundState: any;
    }) => void;
    unregisterEvents: () => void;
    broadcastNotice: (notice: object) => void;
    clearNotice: () => void;
    handleEndPlaceBet: () => void;
    handleOwnBets: ({ ownBets }: {
        ownBets: any;
    }) => void;
    handleBetFailed: ({ notice, kickedOut }: {
        notice: any;
        kickedOut: any;
    }, signOut: () => void) => void;
    getNoticePayloadBetFailed: (notice: NoticeModel, kickedOut: any) => NoticeModel;
    handleEndBet: ({ endBet, ownBets, notice, kickedOut, apiError }: {
        endBet: any;
        ownBets: any;
        notice: any;
        kickedOut: any;
        apiError: any;
    }, signOut: () => void, placeBetContext: PlaceBetContextModel) => void;
    placeBet: (betChoice: string, amount: number, enabledQuickBet: boolean, gameStateContext: GameStateContextModel, systemContext: SystemContextModel) => void;
    sendOutstandingBet(betChoice: string, suggestAmount: number): void;
    protected handleValidBetChoice: (amount: number, betChoice: string) => void;
    handleProcessingBet: () => void;
    handlePreventBet: (roundState: RoundState) => void;
    protected getNotice: (errorCode: string, adjustBetNoticePosition?: boolean, betChoice?: string, args?: object) => NoticeModel;
    private isReachRoundMaxBet;
    protected sendBetMessage(betChoice: string, amount: number): void;
    setRetryInterval: () => void;
    clearRetryInterval: () => void;
}
