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
import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";
import { createPFSettingsSlice } from "./pf-settings-slice";
import { createPFVerificationSlice } from "./pf-verification-slice";
import { createPFBetsSlice } from "./pf-bets-slice";
import { localStorageKeys } from "../../helpers";
export var usePFStore = create()(persist(function (set) {
    var a = [];
    for (var _i = 1; _i < arguments.length; _i++) {
        a[_i - 1] = arguments[_i];
    }
    var pfSettingsSlice = createPFSettingsSlice.apply(void 0, __spreadArray([set], a, false));
    var pfVerificationSlice = createPFVerificationSlice.apply(void 0, __spreadArray([set], a, false));
    var pfBetsSlice = createPFBetsSlice.apply(void 0, __spreadArray([set], a, false));
    return __assign(__assign(__assign(__assign({}, pfSettingsSlice), pfVerificationSlice), pfBetsSlice), { registerEvent: function (message) {
            pfBetsSlice.registerPFBetsEvent(message);
        }, initializePF: function (gameId, uid) {
            pfSettingsSlice.initializePFSettings(gameId, uid);
        } });
}, {
    name: localStorageKeys.pfStore,
    storage: createJSONStorage(function () { return localStorage; }),
    partialize: function (state) { return ({
        isShowPFSetting: state.isShowPFSetting,
        pfClientSeedSetting: state.pfClientSeedSetting,
        expandGuideFirst: state.expandGuideFirst,
    }); },
}));
export default usePFStore;
