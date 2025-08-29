import { GameMessageHandler } from "./game-message-handler";
export type GameErrorHandlerProps = {
    dispatch: Function;
    gameMessageHandler: GameMessageHandler;
    gamName: string;
};
export interface ApiError {
    errorCode: string;
    hedgeBetGroup?: string[];
    minBet?: number;
    maxBet?: number;
    gameRoundId?: number;
    gameTypeId?: number;
    isPlaceBetFailed?: boolean;
}
export declare class GameErrorHandler {
    private readonly props;
    constructor(props: GameErrorHandlerProps);
    registerEvents: (signOut: Function) => void;
    handleApiError: (apiError: ApiError, signOut: Function) => void;
}
