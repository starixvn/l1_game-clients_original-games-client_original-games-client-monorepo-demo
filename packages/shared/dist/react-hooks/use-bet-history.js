import { useEffect, useRef, useState } from 'react';
import { useGameContext } from '../react-contexts';
import useBetHistoryStore from '../stores/bet-history-store/bet-history-store';
import { BetHistoryHandler } from '../../components/game-base/handlers/bet-history-handler';
import { useShallow } from 'zustand/react/shallow';
/**
 * Custom hook for managing bet history functionality
 * Provides a clean interface for components to interact with bet history
 */
export function useBetHistory() {
    var gameMessageHandler = useGameContext().gameMessageHandler;
    var _a = useState(null), betHistoryHandler = _a[0], setBetHistoryHandler = _a[1];
    var isInitialized = useRef(false);
    // Store state selectors
    var _b = useBetHistoryStore(useShallow(function (state) { return ({
        betLogs: state.betLogs,
        currentPage: state.currentPage,
        totalPages: state.totalPages,
        isLoading: state.isLoading,
        isExpanded: state.isExpanded,
        hasMoreData: state.hasMoreData,
        getDisplayedBetLogs: state.getDisplayedBetLogs,
        getWinValue: state.getWinValue,
    }); })), betLogs = _b.betLogs, currentPage = _b.currentPage, totalPages = _b.totalPages, isLoading = _b.isLoading, isExpanded = _b.isExpanded, hasMoreData = _b.hasMoreData, getDisplayedBetLogs = _b.getDisplayedBetLogs, getWinValue = _b.getWinValue;
    // Initialize bet history handler
    useEffect(function () {
        if (!isInitialized.current && gameMessageHandler) {
            var handler_1 = new BetHistoryHandler({ gameMessageHandler: gameMessageHandler });
            setBetHistoryHandler(handler_1);
            isInitialized.current = true;
            return function () {
                handler_1.cleanup();
            };
        }
        return undefined;
    }, [gameMessageHandler]);
    // Action functions
    var requestHistory = function (page) {
        if (page === void 0) { page = 1; }
        betHistoryHandler === null || betHistoryHandler === void 0 ? void 0 : betHistoryHandler.requestHistory(page);
    };
    var loadNextPage = function () {
        betHistoryHandler === null || betHistoryHandler === void 0 ? void 0 : betHistoryHandler.loadNextPage();
    };
    var toggleExpanded = function () {
        betHistoryHandler === null || betHistoryHandler === void 0 ? void 0 : betHistoryHandler.toggleExpanded();
    };
    var resetHistory = function () {
        betHistoryHandler === null || betHistoryHandler === void 0 ? void 0 : betHistoryHandler.resetHistory();
    };
    var scrollToTop = function () {
        betHistoryHandler === null || betHistoryHandler === void 0 ? void 0 : betHistoryHandler.scrollToTop();
    };
    // Computed values
    var displayedBetLogs = getDisplayedBetLogs();
    var hasMultiplePages = totalPages > 1;
    var canLoadMore = hasMoreData && currentPage < totalPages;
    return {
        // State
        betLogs: betLogs,
        displayedBetLogs: displayedBetLogs,
        currentPage: currentPage,
        totalPages: totalPages,
        isLoading: isLoading,
        isExpanded: isExpanded,
        hasMoreData: hasMoreData,
        hasMultiplePages: hasMultiplePages,
        canLoadMore: canLoadMore,
        // Actions
        requestHistory: requestHistory,
        loadNextPage: loadNextPage,
        toggleExpanded: toggleExpanded,
        resetHistory: resetHistory,
        scrollToTop: scrollToTop,
        // Utilities
        getWinValue: getWinValue,
        // Handler reference (for advanced usage)
        betHistoryHandler: betHistoryHandler,
    };
}
/**
 * Hook for bet history state only (no actions)
 * Useful for components that only need to display data
 */
export function useBetHistoryState() {
    var _a = useBetHistoryStore(useShallow(function (state) { return ({
        betLogs: state.betLogs,
        currentPage: state.currentPage,
        totalPages: state.totalPages,
        isLoading: state.isLoading,
        isExpanded: state.isExpanded,
        hasMoreData: state.hasMoreData,
        getDisplayedBetLogs: state.getDisplayedBetLogs,
        getWinValue: state.getWinValue,
    }); })), betLogs = _a.betLogs, currentPage = _a.currentPage, totalPages = _a.totalPages, isLoading = _a.isLoading, isExpanded = _a.isExpanded, hasMoreData = _a.hasMoreData, getDisplayedBetLogs = _a.getDisplayedBetLogs, getWinValue = _a.getWinValue;
    var displayedBetLogs = getDisplayedBetLogs();
    var hasMultiplePages = totalPages > 1;
    var canLoadMore = hasMoreData && currentPage < totalPages;
    return {
        betLogs: betLogs,
        displayedBetLogs: displayedBetLogs,
        currentPage: currentPage,
        totalPages: totalPages,
        isLoading: isLoading,
        isExpanded: isExpanded,
        hasMoreData: hasMoreData,
        hasMultiplePages: hasMultiplePages,
        canLoadMore: canLoadMore,
        getWinValue: getWinValue,
    };
}
