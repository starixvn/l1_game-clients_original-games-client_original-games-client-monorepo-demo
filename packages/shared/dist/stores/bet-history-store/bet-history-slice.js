var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
var __spreadArray = (this && this.__spreadArray) || function (to, from, pack) {
    if (pack || arguments.length === 2) for (var i = 0, l = from.length, ar; i < l; i++) {
        if (ar || !(i in from)) {
            if (!ar) ar = Array.prototype.slice.call(from, 0, i);
            ar[i] = from[i];
        }
    }
    return to.concat(ar || Array.prototype.slice.call(from));
};
var INITIAL_STATE = {
    betLogs: [],
    currentPage: 1,
    totalPages: 1,
    isLoading: false,
    isExpanded: false,
    hasMoreData: true,
    pendingBetDetails: [],
    pendingBetRoundId: null,
    pendingFirstBetTime: null,
};
export var createBetHistorySlice = function (set, get) { return (__assign(__assign({}, INITIAL_STATE), { setBetLogs: function (logs) { return set({ betLogs: sortByRoundDesc(logs) }); }, appendBetLogs: function (logs) {
        var currentState = get();
        var existingLogs = currentState.betLogs;
        // Build a set of existing round keys (consider roundId, phien)
        var existingKeys = new Set(existingLogs.map(function (log) { return getRoundKey(log); }));
        var newLogs = logs.filter(function (newLog) { return !existingKeys.has(getRoundKey(newLog)); });
        if (newLogs.length > 0) {
            var updatedLogs = sortByRoundDesc(__spreadArray(__spreadArray([], existingLogs, true), newLogs, true));
            // Update pagination metadata when logs are added locally
            var newTotalPages = Math.ceil(updatedLogs.length / 10);
            var hasMoreData = updatedLogs.length > 10 && currentState.currentPage < newTotalPages;
            set({
                betLogs: updatedLogs,
                totalPages: newTotalPages,
                hasMoreData: hasMoreData
            });
        }
    }, setCurrentPage: function (page) { return set({ currentPage: page }); }, setTotalPages: function (totalPages) { return set({ totalPages: totalPages }); }, setIsLoading: function (loading) { return set({ isLoading: loading }); }, setIsExpanded: function (expanded) { return set({ isExpanded: expanded }); }, setHasMoreData: function (hasMore) { return set({ hasMoreData: hasMore }); }, resetBetHistory: function () { return set(INITIAL_STATE); }, 
    // Pending bet actions
    addPendingBet: function (bet) {
        var state = get();
        set({ pendingBetDetails: __spreadArray(__spreadArray([], state.pendingBetDetails, true), [bet], false) });
    }, setPendingBetRoundId: function (roundId) { return set({ pendingBetRoundId: roundId }); }, setPendingFirstBetTime: function (time) { return set({ pendingFirstBetTime: time }); }, clearPendingBets: function () { return set({
        pendingBetDetails: [],
        pendingBetRoundId: null,
        pendingFirstBetTime: null
    }); }, hasPendingBets: function () {
        var state = get();
        return state.pendingBetDetails.length > 0 && state.pendingBetRoundId !== null;
    }, getDisplayedBetLogs: function () {
        var state = get();
        var betLogs = state.betLogs, isExpanded = state.isExpanded;
        if (isExpanded) {
            return betLogs;
        }
        else {
            // Show only first 10 records when collapsed
            return betLogs.slice(0, 10);
        }
    }, getWinValue: function (betLog) {
        // Win value = betWin - total bet amount (net profit/loss)
        return betLog.betwin - betLog.totalAmount;
    }, registerBetHistoryEvent: function (message) {
        var _a;
        if (message.history) {
            var history_1 = message.history;
            var state = get();
            // Calculate total pages
            var total = history_1.total || 0;
            var pageSize = history_1.pageSize || 10;
            var calculatedTotalPages = Math.ceil(total / pageSize);
            state.setTotalPages(calculatedTotalPages);
            state.setIsLoading(false);
            if (((_a = history_1.betLogs) === null || _a === void 0 ? void 0 : _a.length) > 0) {
                if (history_1.page === 1) {
                    // First page
                    if (state.isExpanded && state.betLogs.length > 0) {
                        // Keep expanded view populated: merge page 1 into the top of existing logs
                        var existingLogs = state.betLogs;
                        var page1Logs = history_1.betLogs;
                        var page1Ids_1 = new Set(page1Logs.map(function (log) { return getRoundKey(log); }));
                        var merged = __spreadArray(__spreadArray([], page1Logs, true), existingLogs.filter(function (log) { return !page1Ids_1.has(getRoundKey(log)); }), true);
                        state.setBetLogs(sortByRoundDesc(merged));
                    }
                    else {
                        // Collapsed or initial load: replace with page 1
                        state.setBetLogs(sortByRoundDesc(history_1.betLogs));
                    }
                }
                else {
                    // Additional pages - append data
                    state.appendBetLogs(sortByRoundDesc(history_1.betLogs));
                }
                state.setHasMoreData(state.betLogs.length < total);
            }
            else {
                state.setHasMoreData(false);
            }
        }
    } })); };
// Helpers
function toNumeric(value) {
    if (value == null) {
        return 0;
    }
    var num = Number(value);
    return Number.isFinite(num) ? num : 0;
}
function getRoundKey(log) {
    var _a;
    // Prefer roundId, then phien as numeric
    return toNumeric((_a = log === null || log === void 0 ? void 0 : log.roundId) !== null && _a !== void 0 ? _a : log === null || log === void 0 ? void 0 : log.phien);
}
function sortByRoundDesc(logs) {
    return __spreadArray([], (logs || []), true).sort(function (a, b) { return getRoundKey(b) - getRoundKey(a); });
}
