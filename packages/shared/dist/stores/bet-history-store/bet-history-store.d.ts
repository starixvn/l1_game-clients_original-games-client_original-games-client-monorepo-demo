import { BetHistorySlice } from "./bet-history-slice";
export type BetHistoryStore = BetHistorySlice;
export declare const useBetHistoryStore: import("zustand").UseBoundStore<Omit<import("zustand").StoreApi<BetHistorySlice>, "persist"> & {
    persist: {
        setOptions: (options: Partial<import("zustand/middleware").PersistOptions<BetHistorySlice, unknown>>) => void;
        clearStorage: () => void;
        rehydrate: () => Promise<void> | void;
        hasHydrated: () => boolean;
        onHydrate: (fn: (state: BetHistorySlice) => void) => () => void;
        onFinishHydration: (fn: (state: BetHistorySlice) => void) => () => void;
        getOptions: () => Partial<import("zustand/middleware").PersistOptions<BetHistorySlice, unknown>>;
    };
}>;
export default useBetHistoryStore;
