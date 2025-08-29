import { StateCreator } from "zustand";
export interface PFBetsSlice {
    ownBets: Record<string, any>;
    setOwnBets: (bets: Record<string, any>) => void;
    setNewGameState: () => void;
    registerPFBetsEvent: (message: any) => void;
}
export declare const createPFBetsSlice: StateCreator<PFBetsSlice>;
