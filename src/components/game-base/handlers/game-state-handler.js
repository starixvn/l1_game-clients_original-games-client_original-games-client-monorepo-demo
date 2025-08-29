import { RoundState } from "../type";
var GameStateHandler = /** @class */ (function () {
    function GameStateHandler() {
    }
    GameStateHandler.prototype.getNextRoundState = function (_a) {
        var gameStateContextModel = _a.gameStateContextModel, nextRoundState = _a.nextRoundState, durations = _a.durations, defaultResult = _a.defaultResult, defaultSettlementResult = _a.defaultSettlementResult, remainingTime = _a.remainingTime;
        if (gameStateContextModel) {
            var result = gameStateContextModel.result, settlementResult = gameStateContextModel.settlementResult;
            var newStateDetector = [
                {
                    condition: nextRoundState === RoundState.InRound,
                    state: { betWin: 0 },
                },
                {
                    condition: [RoundState.SwitchRound, RoundState.BeforePlaceBet, RoundState.InRound].includes(nextRoundState),
                    state: {
                        showWinningAnimation: false,
                        isShowBlink: false,
                        playResultAnimation: false,
                        showResultInfo: false,
                    },
                },
                {
                    condition: [RoundState.SwitchRound].includes(nextRoundState),
                    state: { roundData: {} },
                },
                {
                    condition: nextRoundState === RoundState.LockingBet,
                    state: {
                        isShowBlink: true,
                        result: defaultResult !== null && defaultResult !== void 0 ? defaultResult : result,
                        settlementResult: defaultSettlementResult !== null && defaultSettlementResult !== void 0 ? defaultSettlementResult : settlementResult,
                    },
                },
            ];
            return newStateDetector.reduce(function (newState, stateDetector) {
                if (stateDetector.condition) {
                    newState = Object.assign(newState, stateDetector.state);
                }
                return newState;
            }, {
                remainingTime: this.getTimeCounter({
                    remainingTime: remainingTime,
                    durations: durations,
                    roundState: nextRoundState,
                }),
            });
        }
        // Return default state if gameStateContextModel is not available
        return {
            remainingTime: this.getTimeCounter({
                remainingTime: remainingTime,
                durations: durations,
                roundState: nextRoundState,
            }),
        };
    };
    GameStateHandler.prototype.getTimeCounter = function (_a) {
        var remainingTime = _a.remainingTime, durations = _a.durations, roundState = _a.roundState;
        switch (roundState) {
            case RoundState.InRound:
            case RoundState.LockingBet:
                return remainingTime;
            case RoundState.BeforePlaceBet:
                return durations.beforePlaceBet;
            default:
                return 0;
        }
    };
    return GameStateHandler;
}());
export { GameStateHandler };
