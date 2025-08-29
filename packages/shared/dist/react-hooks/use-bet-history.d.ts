/**
 * Custom hook for managing bet history functionality
 * Provides a clean interface for components to interact with bet history
 */
export declare function useBetHistory(): {
    betLogs: import("../stores/bet-history-store/bet-history-slice").BetLog[];
    displayedBetLogs: import("../stores/bet-history-store/bet-history-slice").BetLog[];
    currentPage: number;
    totalPages: number;
    isLoading: boolean;
    isExpanded: boolean;
    hasMoreData: boolean;
    hasMultiplePages: boolean;
    canLoadMore: boolean;
    requestHistory: (page?: number) => void;
    loadNextPage: () => void;
    toggleExpanded: () => void;
    resetHistory: () => void;
    scrollToTop: () => void;
    getWinValue: (betLog: import("../stores/bet-history-store/bet-history-slice").BetLog) => number;
    betHistoryHandler: any;
};
/**
 * Hook for bet history state only (no actions)
 * Useful for components that only need to display data
 */
export declare function useBetHistoryState(): {
    betLogs: import("../stores/bet-history-store/bet-history-slice").BetLog[];
    displayedBetLogs: import("../stores/bet-history-store/bet-history-slice").BetLog[];
    currentPage: number;
    totalPages: number;
    isLoading: boolean;
    isExpanded: boolean;
    hasMoreData: boolean;
    hasMultiplePages: boolean;
    canLoadMore: boolean;
    getWinValue: (betLog: import("../stores/bet-history-store/bet-history-slice").BetLog) => number;
};
