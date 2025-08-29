export declare enum GlobalTransmitterEvent {
    BACK_TO_LOBBY = "backToLobby",
    OPEN_GAME_ID = "openingGameId",
    NOTICE = "notice",
    USER_INFO_RED = "userInfoRed",
    CHANGE_AVATAR_ID = "avatarId",
    CLOSE_DIALOG = "closeDialog"
}
export declare const broadcastGlobalEvent: (event: Record<string, any>) => void;
export declare const broadcastBackToLobby: () => void;
export declare const broadcastOpeningGameId: (gameId: number) => void;
export declare const broadcastCloseDialog: () => void;
export declare const broadcastUserInfoRed: (userInfo: any) => void;
export declare const broadcastAvatarId: (avatarId: number) => void;
export declare const GlobalMessageTransmitter: {
    broadcast: (event: Record<string, any>) => void;
};
