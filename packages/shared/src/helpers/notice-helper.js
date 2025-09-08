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
import ErrorCodeDictionary from '@shared/constants/error-code-dictionary";
import { useNoticeStore } from '@shared/stores/notice-store/notice-store";
export var GetLocalizedErrorMessage = function (errorCode, isPlaceBet) {
    if (isPlaceBet === void 0) { isPlaceBet = false; }
    var errorMessage = ErrorCodeDictionary[errorCode];
    if (errorMessage) {
        return errorMessage;
    }
    return isPlaceBet ? "Common.message_placebet_failed" : "Common.message_error_occurred";
};
// Helper function to broadcast notices using Zustand store
export var broadcastNotice = function (notice) {
    if (notice) {
        useNoticeStore.getState().showNotice(notice);
    }
    else {
        useNoticeStore.getState().clearNotice();
    }
};
// Helper function to create notice from error code
export var createNoticeFromErrorCode = function (errorCode, options) {
    if (options === void 0) { options = {}; }
    var gameName = options.gameName, roundId = options.roundId, minBet = options.minBet, maxBet = options.maxBet, onClose = options.onClose, _a = options.duration, duration = _a === void 0 ? 3 : _a, _b = options.isWarning, isWarning = _b === void 0 ? false : _b, hedgeBetGroup = options.hedgeBetGroup, _c = options.adjustBetNoticePosition, adjustBetNoticePosition = _c === void 0 ? false : _c;
    var message = GetLocalizedErrorMessage(errorCode);
    return {
        gameName: gameName,
        roundId: roundId,
        message: message,
        duration: duration,
        minBet: minBet,
        maxBet: maxBet,
        errorCode: errorCode,
        isWarning: isWarning,
        onClose: onClose,
        hedgeBetGroup: hedgeBetGroup,
        adjustBetNoticePosition: adjustBetNoticePosition,
    };
};
export var createOptionForHedgeBetGroup = function (hedgeBetGroup, tolgeeNamespace) {
    var option = {};
    hedgeBetGroup === null || hedgeBetGroup === void 0 ? void 0 : hedgeBetGroup.forEach(function (choice, index) {
        option["betChoice".concat(index + 1)] = getGlossaryTranslate(tolgeeNamespace, choice);
    });
    return option;
};
export var getGlossaryTranslate = function (ns, key) { return "".concat(ns, ".glossary_").concat(key); };
export var isKickOutError = function (errorCode) { return ["1001", "1002", "7000", "7001"].includes(String(errorCode)); };
export var getExtendMessageByErrorCode = function (errorCode) {
    var extendMessage = "";
    if (isKickOutError(errorCode)) {
        extendMessage = " (".concat(errorCode, ")");
    }
    return extendMessage;
};
export var getNotice = function (errorCode, adjustBetNoticePosition, gameName, betChoice1, betChoice2, args) {
    if (adjustBetNoticePosition === void 0) { adjustBetNoticePosition = false; }
    return __assign({ gameName: gameName, message: GetLocalizedErrorMessage(errorCode), duration: 2, errorCode: errorCode, betChoice1: betChoice1, betChoice2: betChoice2, adjustBetNoticePosition: adjustBetNoticePosition }, args);
};
