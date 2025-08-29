import { BettingInfoSlice } from "./betting-info-slice";
import { GameConfigSlice } from "./game-state.slice";
import { SocketSlice } from "./socket-slice";
export type GameStore = {
    registerEvent: (message: any) => void;
} & BettingInfoSlice & GameConfigSlice & SocketSlice;
export declare const useGameStore: import("zustand").UseBoundStore<import("zustand").StoreApi<GameStore>>;
export default useGameStore;
