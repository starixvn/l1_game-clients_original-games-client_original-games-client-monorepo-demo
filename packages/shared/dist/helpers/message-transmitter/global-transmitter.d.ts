export declare const GlobalMessageTransmitter: {
    register: (messageKey: string, handleMessage: Function) => string;
    unsubscribe: (listenerId: string) => void;
    clearAllListener: () => void;
    broadcast: (message: any) => void;
};
export declare enum GlobalTransmitterEvent {
    BACK_TO_LOBBY = "backToLobby",
    OPEN_GAME_ID = "openingGameId",
    NOTICE = "notice",
    USER_INFO_RED = "userInfoRed",
    CHANGE_AVATAR_ID = "avatarId",
    CLOSE_DIALOG = "closeDialog"
}
export declare const registerGlobalMessageEvent: (messageKey: string, handler: Function) => string;
export declare const unsubscribeGlobalMessageEvent: (listenerId: string) => void;
