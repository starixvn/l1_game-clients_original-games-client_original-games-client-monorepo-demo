var __spreadArray = (this && this.__spreadArray) || function (to, from, pack) {
    if (pack || arguments.length === 2) for (var i = 0, l = from.length, ar; i < l; i++) {
        if (ar || !(i in from)) {
            if (!ar) ar = Array.prototype.slice.call(from, 0, i);
            ar[i] = from[i];
        }
    }
    return to.concat(ar || Array.prototype.slice.call(from));
};
import { getGameSettings } from "@shared/app-settings";
import { GameEventActionType } from "@shared/react-contexts/game-state-context/game-event-action";
import { messageEventType } from "./";
import useGameStore from "@shared/stores/game-store/game-store";
var GameFinishHandler = /** @class */ (function () {
    function GameFinishHandler(props) {
        var _this = this;
        this.props = props;
        this._betWin = 0;
        this.registerEvents = function () {
            _this.props.gameMessageHandler.register(messageEventType.FINISH, _this.handleFinishHandler.bind(_this));
            _this.props.gameMessageHandler.register(messageEventType.STATUS, _this.handleStatus);
            _this.props.gameMessageHandler.register(messageEventType.ROUND_HISTORY, _this.handleRoundHistoryHandler.bind(_this));
        };
        this.handleStatus = function (_a) {
            var status = _a.status;
            var win = status.win, bet = status.bet;
            win &&
                _this.props.dispatch({
                    type: GameEventActionType.WIN_STATUS,
                    payload: { status: status },
                });
            _this._betWin = win ? bet : 0;
        };
        this.handleFinish = function (_a) {
            var finish = _a.finish;
            if (!finish) {
                return;
            }
            var result = finish.result, settlementResult = finish.settlementResult, roundId = finish.roundId;
            var _b = _this.props, dispatch = _b.dispatch, gameMessageHandler = _b.gameMessageHandler, gameRoundDataHandler = _b.gameRoundDataHandler, gameStateContextModel = _b.gameStateContextModel;
            var durations = _this.props.durations;
            _this._finish = finish;
            var roundData = gameRoundDataHandler.buildGameRoundDataAfterReceiveFinishEvent(gameStateContextModel().roundData, result, roundId);
            dispatch({
                type: GameEventActionType.FINISH,
                payload: {
                    playResultAnimation: true,
                    result: result,
                    settlementResult: settlementResult,
                    roundId: roundId,
                    roundData: roundData,
                },
            });
            var animationDuration = durations.resultAnimation * 1000;
            _this.showResultInfoTimeout = setTimeout(function () {
                _this.handleRoundHistory();
            }, animationDuration);
            _this.showWinningAnimationTimeout = setTimeout(function () {
                var _a;
                dispatch({
                    type: GameEventActionType.SHOW_WINNING_ANIMATION,
                    payload: {
                        showWinningAnimation: true,
                    },
                });
                _this._betWin > 0 && gameMessageHandler.broadcastGameEvent((_a = {}, _a[messageEventType.UPDATE_PLAYER_BALANCE] = true, _a));
            }, durations.showResult * 1000);
        };
        this.handleRoundHistory = function () {
            var roundHistoryClone = __spreadArray([], _this._roundHistory, true);
            var gameSettings = getGameSettings(_this.props.gameId);
            _this._finish && (roundHistoryClone === null || roundHistoryClone === void 0 ? void 0 : roundHistoryClone.unshift(_this._finish));
            if (roundHistoryClone.length > gameSettings.numberOfRoundHistory) {
                roundHistoryClone.pop();
            }
            _this._roundHistory = roundHistoryClone;
            useGameStore.getState().showResultInfoTimeOut({ roundHistory: roundHistoryClone, isShowBlink: false, showResultInfo: true });
            _this.props.dispatch({
                type: GameEventActionType.SHOW_RESULT_INFO_TIME_OUT,
                payload: {
                    showResultInfo: true,
                    isShowBlink: false,
                    roundHistory: roundHistoryClone,
                },
            });
        };
        this.clearTimeout = function () {
            _this.showResultInfoTimeout && clearTimeout(_this.showResultInfoTimeout);
            _this.showWinningAnimationTimeout && clearTimeout(_this.showWinningAnimationTimeout);
        };
    }
    Object.defineProperty(GameFinishHandler.prototype, "betWin", {
        set: function (betWin) {
            this._betWin = betWin;
        },
        enumerable: false,
        configurable: true
    });
    GameFinishHandler.prototype.handleFinishHandler = function (finish) {
        var _a, _b;
        this.handleFinish(finish);
        (_b = (_a = this.props).runGame) === null || _b === void 0 ? void 0 : _b.call(_a, this.props.roundStateHandler.getWholeRoundDuration({ durations: this.props.durations }));
    };
    GameFinishHandler.prototype.handleRoundHistoryHandler = function (history) {
        var roundHistory = history.roundHistory;
        if (roundHistory) {
            this._roundHistory = roundHistory;
        }
    };
    return GameFinishHandler;
}());
export { GameFinishHandler };
