import { RoundState } from "../game-base/type";
var RoundStateHandler = /** @class */ (function () {
    function RoundStateHandler() {
    }
    RoundStateHandler.prototype.determineRoundBaseState = function (_a) {
        var roundRemainingTime = _a.roundRemainingTime, wholeRound = _a.wholeRound, remainingTime = _a.remainingTime, durations = _a.durations;
        var showResult = durations.showResult, beforePlaceBet = durations.beforePlaceBet, placingBets = durations.placingBets, lockingBet = durations.lockingBet;
        if (remainingTime > wholeRound - showResult) {
            return RoundState.DisplayResult;
        }
        if (beforePlaceBet > 0 && remainingTime > placingBets) {
            return RoundState.BeforePlaceBet;
        }
        if (remainingTime <= placingBets && remainingTime > lockingBet) {
            return RoundState.InRound;
        }
        if (remainingTime <= lockingBet && remainingTime >= 0) {
            return RoundState.LockingBet;
        }
        return RoundState.None;
    };
    RoundStateHandler.prototype.getRemainingTime = function (_a) {
        var remainingTime = _a.remainingTime, durations = _a.durations;
        return remainingTime;
    };
    RoundStateHandler.prototype.getWholeRoundDuration = function (_a) {
        var durations = _a.durations;
        return durations.wholeRound;
    };
    return RoundStateHandler;
}());
export { RoundStateHandler };
