export type URLContextModel = {
    token?: string;
    language?: string;
    gameId?: number;
    redirectUrl?: string;
    backToLobby?: boolean;
    backToRedirectUrl?: Function;
};
export declare function parseContextFromURL(): URLContextModel | undefined;
export declare function loadURLContext(): URLContextModel;
export declare const initialURLContextData: {
    backToRedirectUrl: (redirectUrl: string) => void;
    token?: string;
    language?: string;
    gameId?: number;
    redirectUrl?: string;
    backToLobby?: boolean;
};
export declare const URLContext: import("react").Context<URLContextModel>;
export declare const useURLContext: () => URLContextModel;
export declare function updateURLContext(context: Partial<URLContextModel>): void;
export declare function getURLContext(): URLContextModel;
