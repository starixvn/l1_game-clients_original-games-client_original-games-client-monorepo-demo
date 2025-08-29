import { RoundState } from "../../components/game-base/type";
export function isHighLightWinningResult(_a) {
    var betChoice = _a.betChoice, roundState = _a.roundState, settlementResult = _a.settlementResult, showResultInfo = _a.showResultInfo;
    return roundState === RoundState.DisplayResult && showResultInfo && (settlementResult === null || settlementResult === void 0 ? void 0 : settlementResult[betChoice]);
}
export function isShowHighlightPrevResult(_a) {
    var betChoice = _a.betChoice, roundState = _a.roundState, roundHistory = _a.roundHistory;
    if (roundHistory[0]) {
        return ([RoundState.SwitchRound, RoundState.BeforePlaceBet, RoundState.InRound].includes(roundState) &&
            roundHistory[0].settlementResult[betChoice]);
    }
    return false;
}
