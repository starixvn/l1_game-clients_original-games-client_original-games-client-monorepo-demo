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
import { localStorageKeys, StorageHelper } from "../../../helpers";
export var initialPFContextModel = function (_a) {
    var _b;
    var gameId = _a.gameId, uid = _a.uid;
    var defaultContext = {
        pfVerifyModalData: null,
        ownBets: {},
        gameId: gameId,
        uid: uid,
        pfClientSeedSetting: {
            roundId: 0,
            randomClientSeed: "0000",
            manualClientSeed: "",
            useManualClientSeed: false,
        },
    };
    try {
        var isShowPFSetting = StorageHelper.get("".concat(localStorageKeys.showPFSetting)) === "".concat(uid, "-").concat(gameId);
        !isShowPFSetting && StorageHelper.set("".concat(localStorageKeys.showPFSetting), '');
        var pfClientSeedSettingStorage = StorageHelper.get("".concat(localStorageKeys.pfSetting, "-").concat(uid, "-").concat(gameId));
        var isSleepMode = StorageHelper.get("".concat(localStorageKeys.isSleepMode));
        if (!isSleepMode) {
            isShowPFSetting = false;
        }
        StorageHelper.set(localStorageKeys.isSleepMode, false);
        return __assign(__assign(__assign({}, defaultContext), { isShowPFSetting: isShowPFSetting }), {
            pfClientSeedSetting: __assign(__assign({}, pfClientSeedSettingStorage), { manualClientSeed: ((_b = pfClientSeedSettingStorage === null || pfClientSeedSettingStorage === void 0 ? void 0 : pfClientSeedSettingStorage.manualClientSeed) === null || _b === void 0 ? void 0 : _b.length) <= 0 && (pfClientSeedSettingStorage === null || pfClientSeedSettingStorage === void 0 ? void 0 : pfClientSeedSettingStorage.useManualClientSeed)
                    ? pfClientSeedSettingStorage === null || pfClientSeedSettingStorage === void 0 ? void 0 : pfClientSeedSettingStorage.randomClientSeed
                    : pfClientSeedSettingStorage === null || pfClientSeedSettingStorage === void 0 ? void 0 : pfClientSeedSettingStorage.manualClientSeed })
        });
    }
    catch (error) {
        return defaultContext;
    }
};
