import { GameEventActionType } from "@shared/react-contexts/game-state-context/game-event-action";
import useGameStore from "@shared/stores/game-store/game-store";
import { RoundState } from "../type";
var GameRoundHistoryHandler = /** @class */ (function () {
    function GameRoundHistoryHandler(props) {
        this.props = props;
    }
    GameRoundHistoryHandler.prototype.handleRoundHistory = function (_a) {
        var _b, _c;
        var roundHistory = _a.roundHistory, roundId = _a.roundId, newRoundState = _a.newRoundState;
        var _d = this.props.gameStateContextModel(), roundState = _d.roundState, isUMInFirstLoad = _d.isUMInFirstLoad;
        var verifiedRoundState = roundState;
        if (verifiedRoundState === RoundState.None) {
            verifiedRoundState = newRoundState;
        }
        useGameStore.getState().setRoundHistory({
            roundHistory: roundHistory,
            roundId: [RoundState.DisplayResult].includes(newRoundState) || isUMInFirstLoad ? roundId - 1 : roundId,
            settlementResult: (_b = roundHistory[0]) === null || _b === void 0 ? void 0 : _b.settlementResult,
            isShowBlink: [RoundState.LockingBet].includes(verifiedRoundState),
        });
        this.props.dispatch({
            type: GameEventActionType.ROUND_HISTORY,
            payload: {
                roundHistory: roundHistory,
                roundId: [RoundState.DisplayResult].includes(newRoundState) || isUMInFirstLoad ? roundId - 1 : roundId,
                settlementResult: (_c = roundHistory[0]) === null || _c === void 0 ? void 0 : _c.settlementResult,
                isShowBlink: [RoundState.LockingBet].includes(verifiedRoundState),
            },
        });
    };
    return GameRoundHistoryHandler;
}());
export { GameRoundHistoryHandler };
