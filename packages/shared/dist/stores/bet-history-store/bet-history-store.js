var __spreadArray = (this && this.__spreadArray) || function (to, from, pack) {
    if (pack || arguments.length === 2) for (var i = 0, l = from.length, ar; i < l; i++) {
        if (ar || !(i in from)) {
            if (!ar) ar = Array.prototype.slice.call(from, 0, i);
            ar[i] = from[i];
        }
    }
    return to.concat(ar || Array.prototype.slice.call(from));
};
import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";
import { createBetHistorySlice } from "./bet-history-slice";
export var useBetHistoryStore = create()(persist(function (set) {
    var a = [];
    for (var _i = 1; _i < arguments.length; _i++) {
        a[_i - 1] = arguments[_i];
    }
    return createBetHistorySlice.apply(void 0, __spreadArray([set], a, false));
}, {
    name: "bet-history-store",
    storage: createJSONStorage(function () { return localStorage; }),
    partialize: function (state) { return ({
        // Only persist the pending bet data (not the entire bet logs)
        pendingBetDetails: state.pendingBetDetails,
        pendingBetRoundId: state.pendingBetRoundId,
        pendingFirstBetTime: state.pendingFirstBetTime,
    }); },
}));
export default useBetHistoryStore;
