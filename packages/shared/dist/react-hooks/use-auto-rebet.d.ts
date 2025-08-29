interface UseAutoRebetReturn {
    isEnabled: boolean;
    isAutoRebetActive: boolean;
    remainingRounds: number;
    startAutoRebet: (rounds: number) => void;
    stopAutoRebet: () => void;
}
export declare const useAutoRebet: () => UseAutoRebetReturn;
export {};
