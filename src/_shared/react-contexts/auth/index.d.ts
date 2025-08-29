import React from "react";
import { AuthorizeResponse, SSOResponse } from "sc-user-service-client/dist/auth";
export type PlayerContextModel = {
    authorizeInfo?: AuthorizeResponse;
    session?: SSOResponse;
    locale?: string;
    setBalance?: (balance: number) => void;
    signOut?: () => void;
    fractionalOddsFormat?: boolean;
    enableQuickBet: boolean;
};
export declare const PlayerContext: React.Context<PlayerContextModel>;
export declare const PlayerContextProvider: React.Provider<PlayerContextModel>;
export declare const PlayerContextConsumer: React.Consumer<PlayerContextModel>;
export declare const usePlayerContext: () => PlayerContextModel;
