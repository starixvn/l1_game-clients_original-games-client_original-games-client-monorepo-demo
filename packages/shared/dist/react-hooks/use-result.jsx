import isEmpty from "lodash/isEmpty";
import { useEffect, useState } from "react";
import { messageEventType } from '@shared/components/game-base/handlers";
import { RoundState } from '@shared/components/game-base/type";
import { useGameContext } from "../react-contexts";
var useResult = function (props) {
    var result = props.result, roundState = props.roundState, roundHistory = props.roundHistory, wholeRound = props.wholeRound;
    var gameMessageHandler = useGameContext().gameMessageHandler;
    var _a = useState(null), currentResult = _a[0], setCurrentResult = _a[1];
    var _b = useState(true), isFirstJoinGame = _b[0], setIsFirstJoinGame = _b[1];
    var _c = useState(true), isFirstStartDisplayResultJoinGame = _c[0], setIsFirstStartDisplayResultJoinGame = _c[1];
    useEffect(function () {
        var handlerId = gameMessageHandler === null || gameMessageHandler === void 0 ? void 0 : gameMessageHandler.register(messageEventType.CLIENT_REMAINING_TIME, function (_a) {
            var clientRemainingTime = _a.clientRemainingTime;
            if (clientRemainingTime > 0 && clientRemainingTime !== wholeRound) {
                setIsFirstStartDisplayResultJoinGame(false);
            }
        });
        return function () {
            gameMessageHandler === null || gameMessageHandler === void 0 ? void 0 : gameMessageHandler.removeHandler(handlerId);
        };
    }, []);
    useEffect(function () {
        var _a;
        if (isEmpty(result) && roundState === RoundState.DisplayResult && isFirstJoinGame && !isFirstStartDisplayResultJoinGame) {
            setIsFirstJoinGame(false);
            setCurrentResult((_a = roundHistory[0]) === null || _a === void 0 ? void 0 : _a.result);
        }
        if (!isEmpty(result)) {
            setIsFirstJoinGame(false);
            setCurrentResult(result);
        }
    }, [roundState, roundHistory, result, isFirstStartDisplayResultJoinGame]);
    return currentResult;
};
export default useResult;
