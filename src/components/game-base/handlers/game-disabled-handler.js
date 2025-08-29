import { updateURLContext } from "../../../_shared/react-contexts";
import { GameEventActionType } from "../../../_shared/react-contexts/game-state-context/game-event-action";
import { RoundState } from "../type";
import { messageEventType } from "./game-message-handler";
import useGameStore from "../../../_shared/stores/game-store/game-store";
var GameDisableHandler = /** @class */ (function () {
    function GameDisableHandler(props) {
        this.props = props;
    }
    GameDisableHandler.prototype.handleUM = function (_a, timeCounter) {
        var _b;
        var um = _a.um, um_message = _a.um_message, remainingTime = _a.remainingTime;
        var _c = this.props, durations = _c.durations, gameStateContextModel = _c.gameStateContextModel;
        var wholeRound = this.props.roundStateHandler.getWholeRoundDuration({ durations: durations });
        this.props.dispatch({
            type: GameEventActionType.SET_UM_FIRST_LOADING,
            payload: { isUMInFirstLoad: um && remainingTime && remainingTime + 1 === wholeRound },
        });
        if (um &&
            (timeCounter <= durations.placingBets + durations.beforePlaceBet + 1 ||
                remainingTime + 1 === wholeRound ||
                gameStateContextModel().roundState === RoundState.None ||
                gameStateContextModel().roundState === RoundState.ConnectFailed)) {
            this.props.gameMessageHandler.broadcastGameEvent((_b = {},
                _b[messageEventType.CLEAR_GAME_TIMEOUT_AND_INTERVAL] = true,
                _b));
            this.props.dispatch({
                type: GameEventActionType.UM,
                payload: {
                    um_message: um_message,
                },
            });
            useGameStore.getState().setRoundState(RoundState.Disabled);
            useGameStore.getState().setUMMessage(um_message);
            useGameStore.getState().setShowResultInfo(false);
            updateURLContext({ gameId: 0 });
        }
    };
    return GameDisableHandler;
}());
export { GameDisableHandler };
