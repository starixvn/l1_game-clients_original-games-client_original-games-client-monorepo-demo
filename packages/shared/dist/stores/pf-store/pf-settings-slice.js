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
import { localStorageKeys, randomNumberSeries, StorageHelper } from "../../helpers";
export var createPFSettingsSlice = function (set, get) { return ({
    // Initial state
    isShowPFSetting: false,
    pfClientSeedSetting: {
        roundId: 0,
        randomClientSeed: randomNumberSeries(4),
        manualClientSeed: "",
        useManualClientSeed: false,
    },
    serverSeedHash: "",
    expandGuideFirst: false,
    gameId: 0,
    uid: 0,
    // Actions
    togglePFSetting: function (isShow) {
        var _a = get(), gameId = _a.gameId, uid = _a.uid;
        if (isShow) {
            StorageHelper.set("".concat(localStorageKeys.showPFSetting), "".concat(uid, "-").concat(gameId));
        }
        else {
            StorageHelper.set("".concat(localStorageKeys.showPFSetting), "");
        }
        set({ isShowPFSetting: isShow });
    },
    updatePFClientSeedSetting: function (setting) {
        var _a = get(), gameId = _a.gameId, uid = _a.uid, pfClientSeedSetting = _a.pfClientSeedSetting;
        var newSetting = __assign(__assign({}, pfClientSeedSetting), setting);
        StorageHelper.set("".concat(localStorageKeys.pfSetting, "-").concat(uid, "-").concat(gameId), newSetting);
        set({ pfClientSeedSetting: newSetting });
    },
    updateServerSeedHash: function (hash) {
        set({ serverSeedHash: hash });
    },
    toggleExpandGuideFirst: function (isExpand) {
        set({ expandGuideFirst: isExpand });
    },
    initializePFSettings: function (gameId, uid) {
        var _a;
        var defaultSettings = {
            gameId: gameId,
            uid: uid,
            pfClientSeedSetting: {
                roundId: 0,
                randomClientSeed: "0000",
                manualClientSeed: "",
                useManualClientSeed: false,
            },
            serverSeedHash: "",
        };
        try {
            var isSleepMode = StorageHelper.get("".concat(localStorageKeys.isSleepMode));
            var isShowPFSetting = false;
            if (isSleepMode) {
                var storedShowPFSetting = StorageHelper.get("".concat(localStorageKeys.showPFSetting));
                isShowPFSetting = storedShowPFSetting === "".concat(uid, "-").concat(gameId);
            }
            // Reset sleep mode flag
            StorageHelper.set(localStorageKeys.isSleepMode, false);
            // Get stored PF client seed settings
            var storedPFSetting = StorageHelper.get("".concat(localStorageKeys.pfSetting, "-").concat(uid, "-").concat(gameId));
            var finalPFSetting = defaultSettings.pfClientSeedSetting;
            if (storedPFSetting) {
                finalPFSetting = __assign(__assign({}, storedPFSetting), { manualClientSeed: ((_a = storedPFSetting.manualClientSeed) === null || _a === void 0 ? void 0 : _a.length) > 0
                        ? storedPFSetting.manualClientSeed
                        : storedPFSetting.randomClientSeed });
            }
            set(__assign(__assign({}, defaultSettings), { isShowPFSetting: isShowPFSetting, pfClientSeedSetting: finalPFSetting }));
        }
        catch (error) {
            set(defaultSettings);
        }
    },
}); };
