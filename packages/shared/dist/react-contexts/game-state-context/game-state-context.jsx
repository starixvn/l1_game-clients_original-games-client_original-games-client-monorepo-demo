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
import { useTranslate } from "@tolgee/react";
import { createContext, useContext, useReducer } from "react";
import { RoundState } from "../../../components/game-base/type";
import { LanguageLocaleMapper } from "../../constants";
import { tolgee } from "../../tolgee";
import { GameEventActionType } from "./game-event-action";
import { initialGameStateContextModel } from "./game-state-context-model";
export var GameStateContext = createContext({ rate: 1 });
var GameStateDispatchContext = createContext(null);
var GameTranslateContext = createContext(null);
export function GameStateProvider(_a) {
    var children = _a.children;
    var _b = useReducer(gameStateReducer, initialGameStateContextModel()), gameStateContextModel = _b[0], dispatch = _b[1];
    return (<GameStateContext.Provider value={gameStateContextModel}>
            <GameStateDispatchContext.Provider value={dispatch}>
                <GameTranslateContext.Provider value={useTranslate}>{children}</GameTranslateContext.Provider>
            </GameStateDispatchContext.Provider>
        </GameStateContext.Provider>);
}
export var useGameStateContext = function () {
    return useContext(GameStateContext);
};
export function useGameStatesDispatch() {
    return useContext(GameStateDispatchContext);
}
export function useGameTranslateContext() {
    return useContext(GameTranslateContext);
}
// Helper functions to handle different action types
function handleConnectAction(state) {
    return __assign(__assign({}, state), { isConnect: true, roundData: {} });
}
function handleDisconnectAction(state) {
    return __assign(__assign({}, state), { isConnect: false, playResultAnimation: false });
}
function handleSignInAction(state) {
    return __assign(__assign({}, state), { signedIn: true, availableInGameData: false });
}
function handleSignOutAction(state) {
    return __assign(__assign({}, state), { signedIn: false, showResultInfo: false });
}
function handleUMAction(state, umMessage) {
    return __assign(__assign({}, state), { roundState: RoundState.Disabled, disabledMessage: umMessage[LanguageLocaleMapper[tolgee.getLanguage() || "en"]], showResultInfo: false });
}
function handleGameConfigsAction(state, gameConfigs) {
    return __assign(__assign({}, state), { gameConfigs: gameConfigs, availableInGameData: true });
}
function handleRoundDataAction(state, roundData) {
    return __assign(__assign({}, state), { roundData: state.roundState === RoundState.SwitchRound ? {} : roundData });
}
function handleRoundHistoryAction(state, payload) {
    var roundHistory = payload.roundHistory, roundId = payload.roundId, result = payload.result, settlementResult = payload.settlementResult, isShowBlink = payload.isShowBlink;
    return __assign(__assign({}, state), { roundHistory: roundHistory, roundId: roundId, result: result, settlementResult: settlementResult, isShowBlink: isShowBlink, playResultAnimation: false, showResultInfo: true });
}
function handleFinishAction(state, payload) {
    var playResultAnimation = payload.playResultAnimation, result = payload.result, settlementResult = payload.settlementResult, roundId = payload.roundId, roundData = payload.roundData;
    return __assign(__assign({}, state), { playResultAnimation: playResultAnimation, result: result, settlementResult: settlementResult, roundId: roundId, roundData: roundData, showResultInfo: false });
}
function handleWinStatusAction(state, status) {
    return __assign(__assign({}, state), { betWin: status.bet });
}
function handleDisconnectErrorAction(state, disconnectReason) {
    return __assign(__assign({}, state), { roundState: RoundState.ConnectFailed, signedIn: false, disconnectReason: disconnectReason });
}
function handleUserStakeLevelAction(state, userStakeLevel) {
    return __assign(__assign({}, state), { userStakeLevel: userStakeLevel });
}
function handleOddsAction(state, odds) {
    return __assign(__assign({}, state), { gameConfigs: __assign(__assign({}, state.gameConfigs), { odds: odds }) });
}
// drawId removed from state; legacy action intentionally not supported anymore
function handleSetNewGameStateAction(state, newGameState) {
    return __assign(__assign({}, state), newGameState);
}
function handleShowWinningAnimationAction(state, showWinningAnimation) {
    return __assign(__assign({}, state), { showWinningAnimation: showWinningAnimation });
}
function handleActiveScoreBoardAction(state, activeScoreboardTab) {
    return __assign(__assign({}, state), { activeScoreboardTab: activeScoreboardTab });
}
function handlePlayResultAnimationAction(state, playResultAnimation) {
    return __assign(__assign({}, state), { playResultAnimation: playResultAnimation });
}
function handleShowResultInfoTimeOutAction(state, payload) {
    var showResultInfo = payload.showResultInfo, isShowBlink = payload.isShowBlink, roundHistory = payload.roundHistory, playResultAnimation = payload.playResultAnimation;
    var stateUpdate = {
        showResultInfo: showResultInfo,
        isShowBlink: isShowBlink,
        roundHistory: roundHistory,
    };
    if (playResultAnimation) {
        stateUpdate["playResultAnimation"] = playResultAnimation;
    }
    return __assign(__assign({}, state), stateUpdate);
}
function handleSetUMFirstLoadingAction(state, isUMInFirstLoad) {
    return __assign(__assign({}, state), { isUMInFirstLoad: isUMInFirstLoad });
}
function handleToggleBetHistoryAction(state, isShowBetHistory) {
    return __assign(__assign({}, state), { isShowBetHistory: isShowBetHistory });
}
function handleToggleBetDetailAction(state, isShowBetDetail) {
    return __assign(__assign({}, state), { isShowBetDetail: isShowBetDetail });
}
function handleToggleGameGuideAction(state, isShowGameGuide) {
    return __assign(__assign({}, state), { isShowGameGuide: isShowGameGuide });
}
function handleUpdateBetDetailAction(state, betDetailModalData) {
    return __assign(__assign({}, state), { betDetailModalData: betDetailModalData });
}
function handleStartNewRoundAnimAction(state, isPlayStartRoundAnimation) {
    return __assign(__assign({}, state), { isPlayStartRoundAnimation: isPlayStartRoundAnimation });
}
function handleRoundIdAction(state, roundId) {
    return __assign(__assign({}, state), { roundId: roundId });
}
function handleActiveScoreBoardTabAction(state, isScoreboardTab) {
    return __assign(__assign({}, state), { isScoreboardTab: isScoreboardTab });
}
function gameStateReducer(state, action) {
    var type = action.type, payload = action.payload;
    switch (type) {
        case GameEventActionType.CONNECT:
            return handleConnectAction(state);
        case GameEventActionType.DISCONNECT:
            return handleDisconnectAction(state);
        case GameEventActionType.SIGN_IN:
            return handleSignInAction(state);
        case GameEventActionType.SIGN_OUT:
            return handleSignOutAction(state);
        case GameEventActionType.UM:
            return handleUMAction(state, payload.um_message);
        case GameEventActionType.GAME_CONFIGS:
            return handleGameConfigsAction(state, payload.gameConfigs);
        case GameEventActionType.ROUND_DATA:
            return handleRoundDataAction(state, payload.roundData);
        case GameEventActionType.ROUND_HISTORY:
            return handleRoundHistoryAction(state, payload);
        case GameEventActionType.FINISH:
            return handleFinishAction(state, payload);
        case GameEventActionType.WIN_STATUS:
            return handleWinStatusAction(state, payload.status);
        case GameEventActionType.DISCONNECT_ERROR:
            return handleDisconnectErrorAction(state, payload.disconnectReason);
        case GameEventActionType.USER_STAKE_LEVEL:
            return handleUserStakeLevelAction(state, payload.userStakeLevel);
        case GameEventActionType.ODDS:
            return handleOddsAction(state, payload.odds);
        case GameEventActionType.SET_NEW_GAME_STATE:
            return handleSetNewGameStateAction(state, payload.newGameState);
        case GameEventActionType.SHOW_WINNING_ANIMATION:
            return handleShowWinningAnimationAction(state, payload.showWinningAnimation);
        case GameEventActionType.ACTIVE_SCORE_BOARD:
            return handleActiveScoreBoardAction(state, payload.activeScoreboardTab);
        case GameEventActionType.PLAY_RESULT_ANIMATION:
            return handlePlayResultAnimationAction(state, payload.playResultAnimation);
        case GameEventActionType.SHOW_RESULT_INFO_TIME_OUT:
            return handleShowResultInfoTimeOutAction(state, payload);
        case GameEventActionType.SET_UM_FIRST_LOADING:
            return handleSetUMFirstLoadingAction(state, payload.isUMInFirstLoad);
        case GameEventActionType.TOGGLE_BET_HISTORY:
            return handleToggleBetHistoryAction(state, payload.isShowBetHistory);
        case GameEventActionType.TOGGLE_BET_DETAIL:
            return handleToggleBetDetailAction(state, payload.isShowBetDetail);
        case GameEventActionType.TOGGLE_GAME_GUIDE:
            return handleToggleGameGuideAction(state, payload.isShowGameGuide);
        case GameEventActionType.UPDATE_BET_DETAIL:
            return handleUpdateBetDetailAction(state, payload.betDetailModalData);
        case GameEventActionType.START_NEW_ROUND_ANIM:
            return handleStartNewRoundAnimAction(state, payload.isPlayStartRoundAnimation);
        case GameEventActionType.ROUND_ID:
            return handleRoundIdAction(state, payload.roundId);
        case GameEventActionType.ACTIVE_SCORE_BOARD_TAB:
            return handleActiveScoreBoardTabAction(state, payload.isScoreboardTab);
        default: {
            console.warn(JSON.stringify(action));
            throw Error("Unknown action: " + action.type);
        }
    }
}
