export type BettingStore = {
    selectedChip: number;
    ownBets: Record<string, number>;
    isAutoRebetActive: boolean;
    actions: {
        setSelectedChip: (selectedChip: number) => void;
        setIsAutoRebetActive: (isAutoRebetActive: boolean) => void;
        setOwnBets: (ownBets: Record<string, number>) => void;
    };
    registerEvent: (message: any) => void;
};
export declare const useBettingStore: import("zustand").UseBoundStore<import("zustand").StoreApi<BettingStore>>;
export default useBettingStore;
