import { StateCreator } from "zustand";
export interface BetLog {
    freeBet: boolean;
    roundId: number;
    appType: number;
    betwin: number;
    clientSeed: string;
    even: number;
    name: string;
    odd: number;
    odds: Record<string, number>;
    rate: number;
    red2: number;
    red3: number;
    red4: number;
    time: string;
    totalAmount: number;
    white3: number;
    white4: number;
    phien: number;
    result: any;
    settlementResult: any;
    betLogDetails: Array<{
        freeBet: boolean;
        amount: number;
        appType: number;
        time: string;
        choice: string;
    }>;
}
export interface BetHistoryData {
    betLogs: BetLog[];
    page: number;
    pageSize: number;
    total: number;
}
export interface BetHistorySlice {
    betLogs: BetLog[];
    currentPage: number;
    totalPages: number;
    isLoading: boolean;
    isExpanded: boolean;
    hasMoreData: boolean;
    pendingBetDetails: Array<{
        time: string;
        amount: number;
        choice: string;
    }>;
    pendingBetRoundId: number | null;
    pendingFirstBetTime: string | null;
    setBetLogs: (logs: BetLog[]) => void;
    appendBetLogs: (logs: BetLog[]) => void;
    setCurrentPage: (page: number) => void;
    setTotalPages: (totalPages: number) => void;
    setIsLoading: (loading: boolean) => void;
    setIsExpanded: (expanded: boolean) => void;
    setHasMoreData: (hasMore: boolean) => void;
    resetBetHistory: () => void;
    addPendingBet: (bet: {
        time: string;
        amount: number;
        choice: string;
    }) => void;
    setPendingBetRoundId: (roundId: number) => void;
    setPendingFirstBetTime: (time: string) => void;
    clearPendingBets: () => void;
    hasPendingBets: () => boolean;
    getDisplayedBetLogs: () => BetLog[];
    getWinValue: (betLog: BetLog) => number;
    registerBetHistoryEvent: (message: any) => void;
}
export declare const createBetHistorySlice: StateCreator<BetHistorySlice>;
