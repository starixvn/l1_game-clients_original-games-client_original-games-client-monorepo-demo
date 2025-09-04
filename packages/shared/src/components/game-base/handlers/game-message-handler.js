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
import MessageTransmitter from "@shared/helpers/message-transmitter";
import { GameEventActionType } from "@shared/react-contexts/game-state-context/game-event-action";
export var messageEventType = {
    GAME_CONFIG: "gameConfigs",
    ROUND_HISTORY: "roundHistory",
    REMAINING_TIME: "remainingTime",
    CLIENT_REMAINING_TIME: "clientRemainingTime",
    FINISH: "finish",
    STATUS: "status",
    USER: "user",
    OWN_BETS: "ownBets",
    END_BET: "endBet",
    API_ERROR: "apiError",
    ERROR_CODE: "errorCode",
    USER_STAKE_LEVEL: "userStakeLevel",
    TOTAL_BETS: "totalBets",
    ODDS: "odds",
    UNDER_MAINTENANCE: "um",
    ROUND_STATE: "roundState",
    SOCKET_CONNECT_ERROR: "connect_error",
    SOCKET_CONNECTED: "connect",
    SOCKET_DISCONNECTED: "disconnect",
    ROUND_DATA: "roundData",
    SIGNED_IN: "signedIn",
    NOT_PERMITTED_TO_PLAY: "notPermittedToPlay",
    BET_PERCENTAGE: "betPercentage",
    PLAYER_BET_COUNT: "playerBetCount",
    GAME_DESTROY: "gameDestroy",
    SEND_SOCKET_MESSAGE: "sendSocketMessage",
    TOGGLE_BETHISTORY: "toggleBetHistory",
    BET_HISTORY: "history",
    UPDATE_PLAYER_BALANCE: "updatePlayerBalance",
    CLEAR_GAME_TIMEOUT_AND_INTERVAL: "clearGameTimeoutAndInterval",
    SEND_SOCKET_MESSAGE_WITH_CLIENT_SEED: "sendSocketMessageWithClientSeed",
    ROUND_ID: "roundId",
    CLIENT_SEED_DETAIL: "clientSeedDetail",
    SAVE_PF_SETTING: "savePFSetting",
    SAVE_PF_SETTING_FROM_TURN_ID_HANLDER: "savePFSettingFromTurnIdHandler",
    SYNC_OWN_BETS_TO_PF: "syncOwnBetsToPF",
    START_PLACE_BET: "spb",
    PLAYER_RESULT_BOARD: "playerResultBoard",
    PF: "pf",
    END_PLACE_BET: "epb",
};
var GameMessageHandler = /** @class */ (function () {
    function GameMessageHandler(dispatch, messageTransmitter) {
        var _this = this;
        this.dispatch = dispatch;
        this.messageTransmitter = messageTransmitter;
        this.registerSocketEvents = function () {
            _this.register(messageEventType.GAME_CONFIG, _this.handleGameConfigs);
            _this.register(messageEventType.ODDS, _this.handleOdds);
            _this.register(messageEventType.ROUND_DATA, _this.handleRoundData);
            _this.register(messageEventType.SIGNED_IN, _this.handleSignedIn);
            _this.register(messageEventType.CLIENT_SEED_DETAIL, _this.handleClientSeedDetail);
        };
        this.register = function (eventType, handler) {
            return _this.messageTransmitter.register(eventType, handler);
        };
        this.removeHandler = function (handlerId) {
            return _this.messageTransmitter.unsubscribe(handlerId);
        };
        this.broadcastGameMessage = function (message) {
            if (message[messageEventType.USER_STAKE_LEVEL]) {
                _this.messageTransmitter.broadcast(__assign(__assign({}, message), { hasNotice: false }));
            }
            else {
                _this.messageTransmitter.broadcast(message);
            }
        };
        this.broadcastGameEvent = function (message) {
            _this.messageTransmitter.broadcast(message);
        };
        this.handleGameConfigs = function (_a) {
            var gameConfigs = _a.gameConfigs;
            _this.dispatch({
                type: GameEventActionType.GAME_CONFIGS,
                payload: {
                    gameConfigs: gameConfigs,
                },
            });
        };
        this.handleOdds = function (_a) {
            var odds = _a.odds;
            _this.dispatch({
                type: GameEventActionType.ODDS,
                payload: {
                    odds: odds,
                },
            });
        };
        this.handleSignedIn = function () {
            _this.dispatch({
                type: GameEventActionType.SIGN_IN,
                payload: {},
            });
        };
        this.handleRoundData = function (_a) {
            var roundData = _a.roundData;
            _this.dispatch({
                type: GameEventActionType.ROUND_DATA,
                payload: {
                    roundData: roundData,
                },
            });
        };
        this.handleClientSeedDetail = function (_a) {
            var _b;
            var clientSeedDetail = _a.clientSeedDetail;
            _this.broadcastGameEvent((_b = {},
                _b[messageEventType.SAVE_PF_SETTING] = {
                    pfClientSeedSetting: __assign({}, clientSeedDetail),
                },
                _b));
        };
        this.clearAllHandlers = function () {
            _this.messageTransmitter.clearAllListener();
        };
        this.messageTransmitter = messageTransmitter !== null && messageTransmitter !== void 0 ? messageTransmitter : MessageTransmitter();
    }
    GameMessageHandler.prototype.getMessageTransmitter = function () {
        return this.messageTransmitter;
    };
    return GameMessageHandler;
}());
export { GameMessageHandler };
