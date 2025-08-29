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
import { RoundState } from "@/components/game-base/type";
import { LanguageLocaleMapper } from "../../constants";
import { tolgee } from "../../tolgee";
var GameEvents = {
    GAME_CONFIGS: "gameConfigs",
    PLAYER_RESULT_BOARD: "playerResultBoard",
    USER_STAKE_LEVEL: "userStakeLevel",
};
export var createGameConfigSlice = function (set) { return ({
    gameConfigs: null,
    roundHistory: [],
    roundId: 0,
    result: undefined,
    settlementResult: undefined,
    disabledMessage: undefined,
    showResultInfo: false,
    playResultAnimation: false,
    isShowBlink: false,
    rate: undefined,
    userStakeLevel: undefined,
    prevRoundState: RoundState.None,
    roundState: RoundState.None,
    nextRoundState: RoundState.None,
    durations: undefined,
    defaultResult: null,
    defaultSettlementResult: null,
    remainingTime: 0,
    setRoundHistory: function (_a) {
        var roundHistory = _a.roundHistory, roundId = _a.roundId, result = _a.result, settlementResult = _a.settlementResult, isShowBlink = _a.isShowBlink;
        return set({ roundHistory: roundHistory, roundId: roundId, result: result, settlementResult: settlementResult, isShowBlink: isShowBlink, playResultAnimation: false, showResultInfo: true });
    },
    showResultInfoTimeOut: function (_a) {
        var roundHistory = _a.roundHistory, isShowBlink = _a.isShowBlink, showResultInfo = _a.showResultInfo, playResultAnimation = _a.playResultAnimation;
        var stateUpdate = {
            showResultInfo: showResultInfo,
            isShowBlink: isShowBlink,
            roundHistory: roundHistory,
        };
        if (playResultAnimation) {
            stateUpdate["playResultAnimation"] = playResultAnimation;
        }
        set(__assign({}, stateUpdate));
    },
    setRate: function (_a) {
        var rate = _a.rate;
        return set({ rate: rate });
    },
    setGameState: function (newGameState) {
        set(__assign({}, newGameState));
    },
    setRoundState: function (roundState) { return set({ roundState: roundState }); },
    setShowResultInfo: function (showResultInfo) { return set({ showResultInfo: showResultInfo }); },
    setUMMessage: function (message) {
        return set({
            disabledMessage: message[LanguageLocaleMapper[tolgee.getLanguage() || "en"]], // TO DO: remove hard code
        });
    },
    registerGameConfigEvent: function (message) {
        Object.values(GameEvents).forEach(function (event) {
            var _a;
            if (message[event] !== undefined) {
                set((_a = {}, _a[event] = message[event], _a));
            }
        });
    },
}); };
