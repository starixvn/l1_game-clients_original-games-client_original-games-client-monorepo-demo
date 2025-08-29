import { StateCreator } from "zustand";
export interface GlobalEventsSlice {
    openingGameId: number;
    backToLobby: boolean;
    closeDialog: boolean;
    userInfoRed: any;
    avatarId: number;
    setOpeningGameId: (gameId: number) => void;
    setBackToLobby: (backToLobby: boolean) => void;
    setCloseDialog: (closeDialog: boolean) => void;
    setUserInfoRed: (userInfo: any) => void;
    setAvatarId: (avatarId: number) => void;
    broadcast: (event: Record<string, any>) => void;
}
export declare const createGlobalEventsSlice: StateCreator<GlobalEventsSlice>;
