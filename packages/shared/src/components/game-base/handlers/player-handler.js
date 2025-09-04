import { broadcastNotice } from "@shared/helpers";
import { GameEventActionType } from "@shared/react-contexts/game-state-context/game-event-action";
import useGameStore from "@shared/stores/game-store/game-store";
import { ConnectFailedReasonKey } from "../../game-components/error-message/type";
import { messageEventType } from "./game-message-handler";
var Player = /** @class */ (function () {
    function Player() {
    }
    return Player;
}());
var UserStakeLevel = /** @class */ (function () {
    function UserStakeLevel() {
    }
    return UserStakeLevel;
}());
var PlayerHandler = /** @class */ (function () {
    function PlayerHandler(props) {
        var _this = this;
        this.props = props;
        this.registerEvents = function () {
            _this.props.gameMessageHandler.register(messageEventType.USER, function (_a) {
                var user = _a.user, gameConfigs = _a.gameConfigs;
                _this.handleUserData({ user: user, gameConfigs: gameConfigs });
            });
            _this.props.gameMessageHandler.register(messageEventType.USER_STAKE_LEVEL, _this.handleUserStakeLevel.bind(_this));
            _this.props.gameMessageHandler.register(messageEventType.NOT_PERMITTED_TO_PLAY, _this.handleRestrictPermission.bind(_this));
        };
        this.handleRestrictPermission = function (_a) {
            var _b;
            var notPermittedToPlay = _a.notPermittedToPlay, userStakeLevel = _a.userStakeLevel;
            if (notPermittedToPlay) {
                _this.props.gameMessageHandler.broadcastGameEvent((_b = {}, _b[messageEventType.GAME_DESTROY] = true, _b));
                _this.props.dispatch({
                    type: GameEventActionType.DISCONNECT_ERROR,
                    payload: { disconnectReason: ConnectFailedReasonKey.restrictPlayPermission },
                });
            }
            if (userStakeLevel) {
                _this.handleUserStakeLevel({ userStakeLevel: userStakeLevel });
            }
        };
    }
    PlayerHandler.prototype.handleUserStakeLevel = function (_a) {
        var userStakeLevel = _a.userStakeLevel, _b = _a.hasNotice, hasNotice = _b === void 0 ? true : _b;
        this.props.dispatch({
            type: GameEventActionType.USER_STAKE_LEVEL,
            payload: { userStakeLevel: userStakeLevel },
        });
        hasNotice &&
            broadcastNotice({
                message: "Common.message_bet_limit_change",
                duration: 3,
                isWarning: false,
            });
    };
    PlayerHandler.prototype.handleUserData = function (_a) {
        var user = _a.user, gameConfigs = _a.gameConfigs;
        if (gameConfigs) {
            useGameStore.getState().setRate({ rate: user.rate });
        }
    };
    return PlayerHandler;
}());
export { PlayerHandler };
