import { PFSettingsSlice } from "./pf-settings-slice";
import { PFVerificationSlice } from "./pf-verification-slice";
import { PFBetsSlice } from "./pf-bets-slice";
export type PFStore = {
    registerEvent: (message: any) => void;
    initializePF: (gameId: number, uid: number) => void;
} & PFSettingsSlice & PFVerificationSlice & PFBetsSlice;
export declare const usePFStore: import("zustand").UseBoundStore<Omit<import("zustand").StoreApi<PFStore>, "persist"> & {
    persist: {
        setOptions: (options: Partial<import("zustand/middleware").PersistOptions<PFStore, unknown>>) => void;
        clearStorage: () => void;
        rehydrate: () => Promise<void> | void;
        hasHydrated: () => boolean;
        onHydrate: (fn: (state: PFStore) => void) => () => void;
        onFinishHydration: (fn: (state: PFStore) => void) => () => void;
        getOptions: () => Partial<import("zustand/middleware").PersistOptions<PFStore, unknown>>;
    };
}>;
export default usePFStore;
