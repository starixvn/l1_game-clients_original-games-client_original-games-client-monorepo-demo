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
import { messageEventType } from "..";
import { NoticeErrorCode } from "../../../../_shared/constants/error-code-dictionary";
import { GetLocalizedErrorMessage, StorageHelper, getGlossaryTranslate, localStorageKeys, broadcastNotice } from "../../../../_shared/helpers";
import { findHedgeBetGroup, getAccountBalance, isBalanceUnavailable, isHedgeBet, isInPhasePreventBet } from "../../../../_shared/helpers/validate-bet-helper";
import { PlaceBetEventActionType } from "../../../../_shared/react-contexts/game-state-context/place-bet-context/place-bet-action";
import { RoundState } from "../../type";
import { broadcastCloseDialog } from "../../../../_shared/helpers/global-events-helper";
var PlaceBetHandler = /** @class */ (function () {
    function PlaceBetHandler(props) {
        var _this = this;
        this.props = props;
        this.roundState = RoundState.None;
        this.isFirstOwnBetHandler = false;
        this.setPlaceBetDispatch = function (dispatch) {
            _this.placeBetDispatch = dispatch;
        };
        this.getPlaceBetDispatch = function () {
            return _this.placeBetDispatch;
        };
        this.registerEvents = function (signOut, placeBetContext) {
            _this.placeBetContext = placeBetContext;
            _this.isFirstOwnBetHandler = true;
            _this.roundState = RoundState.None;
            _this.endBetHandlerId = _this.props.gameMessageHandler.register(messageEventType.END_BET, function (gameMessage) {
                _this.handleEndBet(gameMessage, signOut, placeBetContext);
            });
            _this.ownBetsHandlerId = _this.props.gameMessageHandler.register(messageEventType.OWN_BETS, _this.handleOwnBets);
            _this.finishHandlerId = _this.props.gameMessageHandler.register(messageEventType.FINISH, function () {
                _this.clearRetryInterval();
                _this.isProcessingBet = false;
            });
            _this.roundStateHandlerId = _this.props.gameMessageHandler.register(messageEventType.ROUND_STATE, _this.handleRoundState.bind(_this));
            _this.endPlaceBetHandlerId = _this.props.gameMessageHandler.register(messageEventType.END_PLACE_BET, _this.handleEndPlaceBet);
        };
        this.handleRoundState = function (_a) {
            var roundState = _a.roundState;
            _this.roundState = roundState;
        };
        this.unregisterEvents = function () {
            _this.props.gameMessageHandler.removeHandler(_this.endBetHandlerId);
            _this.props.gameMessageHandler.removeHandler(_this.ownBetsHandlerId);
            _this.props.gameMessageHandler.removeHandler(_this.finishHandlerId);
            _this.props.gameMessageHandler.removeHandler(_this.roundStateHandlerId);
            _this.props.gameMessageHandler.removeHandler(_this.endPlaceBetHandlerId);
        };
        this.broadcastNotice = function (notice) {
            broadcastNotice(notice);
        };
        this.clearNotice = function () {
            broadcastNotice(null);
        };
        this.handleEndPlaceBet = function () {
            _this.clearNotice();
            broadcastCloseDialog();
        };
        this.handleOwnBets = function (_a) {
            var _b;
            var ownBets = _a.ownBets;
            _this.props.gameMessageHandler.broadcastGameEvent((_b = {}, _b[messageEventType.SYNC_OWN_BETS_TO_PF] = ownBets, _b));
            if (_this.isFirstOwnBetHandler && [RoundState.None, RoundState.SwitchRound, RoundState.BeforePlaceBet].includes(_this.roundState)) {
                _this.isFirstOwnBetHandler = false;
                return;
            }
            _this.placeBetDispatch({ type: PlaceBetEventActionType.OWN_BETS, payload: { ownBets: ownBets } });
        };
        this.handleBetFailed = function (_a, signOut) {
            var notice = _a.notice, kickedOut = _a.kickedOut;
            var isDisabledAccount = kickedOut === null || kickedOut === void 0 ? void 0 : kickedOut.isDisabledAccount;
            var noticePayload = _this.getNoticePayloadBetFailed(notice, kickedOut);
            noticePayload.gameName = _this.props.gameName;
            if (isDisabledAccount) {
                noticePayload.onClose = signOut;
                noticePayload.duration = 10;
                noticePayload.roundId = 0;
            }
            else {
                noticePayload.duration = 3;
                noticePayload.minBet = notice === null || notice === void 0 ? void 0 : notice.minBet;
                noticePayload.maxBet = notice === null || notice === void 0 ? void 0 : notice.maxBet;
                noticePayload.roundId = notice === null || notice === void 0 ? void 0 : notice.gameRoundId;
            }
            broadcastNotice(noticePayload);
        };
        this.getNoticePayloadBetFailed = function (notice, kickedOut) {
            var errorCode = (kickedOut === null || kickedOut === void 0 ? void 0 : kickedOut.isDisabledAccount) ? kickedOut.errorCode : notice.errorCode;
            var hedgeBetGroup = notice === null || notice === void 0 ? void 0 : notice.hedgeBetGroup;
            var betChoice = hedgeBetGroup ? hedgeBetGroup[0] : undefined;
            return _this.getNotice(errorCode, false, betChoice, notice);
        };
        this.handleEndBet = function (_a, signOut, placeBetContext) {
            var _b;
            var _c;
            var endBet = _a.endBet, ownBets = _a.ownBets, notice = _a.notice, kickedOut = _a.kickedOut, apiError = _a.apiError;
            var _d = _this.props, playPlaceBetSound = _d.playPlaceBetSound, gameMessageHandler = _d.gameMessageHandler;
            var enableSound = (_c = StorageHelper.get(localStorageKeys.enableSound)) !== null && _c !== void 0 ? _c : true;
            _this.isProcessingBet = false;
            _this.clearRetryInterval();
            if (endBet === -1) {
                !apiError && _this.handleBetFailed({ notice: notice, kickedOut: kickedOut }, signOut);
            }
            else {
                enableSound && playPlaceBetSound();
                _this.placeBetDispatch({
                    type: PlaceBetEventActionType.OWN_BETS,
                    payload: { ownBets: ownBets },
                });
                gameMessageHandler.broadcastGameEvent((_b = {}, _b[messageEventType.UPDATE_PLAYER_BALANCE] = {}, _b));
            }
            _this.placeBetDispatch({
                type: PlaceBetEventActionType.SHOW_CONFIRM_BET,
                payload: { showConfirmBet: false },
            });
            _this.placeBetDispatch({
                type: PlaceBetEventActionType.NOT_CONFIRM_OWN_BETS,
                payload: { notConfirmOwnBets: {} },
            });
        };
        this.placeBet = function (betChoice, amount, enabledQuickBet, gameStateContext, systemContext) {
            var _a, _b;
            if (isInPhasePreventBet(gameStateContext.roundState)) {
                _this.handlePreventBet(gameStateContext.roundState);
                return;
            }
            if (_this.isProcessingBet) {
                _this.handleProcessingBet();
                return;
            }
            if (isBalanceUnavailable(getAccountBalance(_this.props.getPlayerBalance()), amount, gameStateContext, _this.placeBetContext.notConfirmOwnBets, enabledQuickBet)) {
                _this.broadcastNotice(_this.getNotice(NoticeErrorCode.notEnoughMoney));
                return;
            }
            if (isHedgeBet(findHedgeBetGroup((_a = _this.props) === null || _a === void 0 ? void 0 : _a.hedgeBetGroups, betChoice), betChoice, amount, (_b = _this.placeBetContext) === null || _b === void 0 ? void 0 : _b.ownBets)) {
                _this.broadcastNotice(_this.getNotice(NoticeErrorCode.hedgeBet, true, betChoice));
                return;
            }
            _this.handleValidBetChoice(amount, betChoice);
        };
        this.handleValidBetChoice = function (amount, betChoice) {
            if (amount > 0) {
                _this.setRetryInterval();
                _this.sendBetMessage(betChoice, amount);
            }
        };
        this.handleProcessingBet = function () {
            _this.broadcastNotice({ message: "Common.message_processing_action", duration: 2, adjustBetNoticePosition: true });
        };
        this.handlePreventBet = function (roundState) {
            var isStartingRound = roundState === RoundState.BeforePlaceBet;
            var errorCodeDuringSettlement = NoticeErrorCode.placeBetNextRound;
            var notice = isStartingRound ? _this.getNotice(NoticeErrorCode.cannotBet, true) : _this.getNotice(errorCodeDuringSettlement, true);
            _this.broadcastNotice(notice);
        };
        this.getNotice = function (errorCode, adjustBetNoticePosition, betChoice, args) {
            if (adjustBetNoticePosition === void 0) { adjustBetNoticePosition = false; }
            var betChoice1 = "";
            var betChoice2 = "";
            var hedgeBetGroup = _this.props.hedgeBetGroups.find(function (group) { return group.includes(betChoice); });
            if (betChoice && hedgeBetGroup) {
                betChoice1 = _this.props.translate(getGlossaryTranslate(_this.props.tolgeeNamespace, hedgeBetGroup[0]));
                betChoice2 = _this.props.translate(getGlossaryTranslate(_this.props.tolgeeNamespace, hedgeBetGroup[1]));
            }
            var gameErrorCode = _this.isReachRoundMaxBet(errorCode) ? NoticeErrorCode.roundMaxBet : errorCode;
            return __assign({ gameName: _this.props.gameName, message: GetLocalizedErrorMessage(gameErrorCode), duration: 2, errorCode: gameErrorCode, betChoice1: betChoice1, betChoice2: betChoice2, adjustBetNoticePosition: adjustBetNoticePosition }, args);
        };
        this.setRetryInterval = function () {
            _this.clearRetryInterval();
            _this.retryInterval = setInterval(function () {
                var _a;
                _this.props.gameMessageHandler.broadcastGameEvent((_a = {}, _a[messageEventType.SEND_SOCKET_MESSAGE] = { event: "retry" }, _a));
            }, 3 * 1000);
        };
        this.clearRetryInterval = function () {
            clearInterval(_this.retryInterval);
        };
        this.isProcessingBet = false;
    }
    PlaceBetHandler.prototype.sendOutstandingBet = function (betChoice, suggestAmount) {
        this.sendBetMessage(betChoice, suggestAmount);
    };
    PlaceBetHandler.prototype.isReachRoundMaxBet = function (errorCode) {
        return errorCode === NoticeErrorCode.drawMaxBet;
    };
    PlaceBetHandler.prototype.sendBetMessage = function (betChoice, amount) {
        var _a, _b, _c;
        var _d;
        this.isProcessingBet = true;
        if (((_d = this.props.betPayloadFormat) !== null && _d !== void 0 ? _d : "map") === "single") {
            this.props.gameMessageHandler.broadcastGameEvent((_a = {},
                _a[messageEventType.SEND_SOCKET_MESSAGE_WITH_CLIENT_SEED] = {
                    event: "bet",
                    data: { amount: amount, betChoice: betChoice.toLowerCase(), __pfMode: "clientSeedOnly" },
                },
                _a));
        }
        else {
            this.props.gameMessageHandler.broadcastGameEvent((_b = {},
                _b[messageEventType.SEND_SOCKET_MESSAGE_WITH_CLIENT_SEED] = {
                    event: "bet",
                    data: { betChoices: (_c = {}, _c[betChoice.toLowerCase()] = amount, _c) },
                },
                _b));
        }
    };
    return PlaceBetHandler;
}());
export { PlaceBetHandler };
