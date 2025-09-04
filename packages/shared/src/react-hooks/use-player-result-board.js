import { useMemo, useState, useEffect } from "react";
import { RoundState } from "@shared/components/game-base/type";
import useGameStore from "../stores/game-store/game-store";
import { useGameStateContext } from "../react-contexts/game-state-context/game-state-context";
import { useGameContext } from "../react-contexts";
var calculateAmountByRate = function (amount, rate) {
    if (amount) {
        var total = amount / rate;
        var options = { maximumFractionDigits: 2 };
        var locale = "en-US";
        if (total < 0.1) {
            return "0";
        }
        return total.toLocaleString(locale, options);
    }
    return "";
};
var DELAY = 1000;
export var usePlayerResultBoard = function () {
    var _a;
    var playerResultBoard = useGameStore(function (state) { return state.playerResultBoard; });
    var rate = useGameStore(function (state) { return state.rate; });
    var roundState = useGameStateContext().roundState;
    var durations = useGameContext().durations;
    var _b = useState(false), shouldShowResults = _b[0], setShouldShowResults = _b[1];
    var _c = useState(false), isDisplayingResults = _c[0], setIsDisplayingResults = _c[1];
    useEffect(function () {
        var timeoutDisplayResult;
        var timeoutHideResults;
        switch (roundState) {
            case RoundState.DisplayResult:
                timeoutDisplayResult = setTimeout(function () {
                    setShouldShowResults(true);
                    setIsDisplayingResults(true);
                    timeoutHideResults = setTimeout(function () {
                        setShouldShowResults(false);
                        setIsDisplayingResults(false);
                    }, durations.showResult * 1000);
                }, DELAY);
                break;
            case RoundState.BeforePlaceBet:
            case RoundState.InRound:
            case RoundState.LockingBet:
                setShouldShowResults(false);
                setIsDisplayingResults(false);
                break;
            default:
                break;
        }
        return function () {
            timeoutDisplayResult && clearTimeout(timeoutDisplayResult);
            timeoutHideResults && clearTimeout(timeoutHideResults);
        };
    }, [roundState, durations.showResult]);
    var tableData = useMemo(function () {
        var _a;
        if (!((_a = playerResultBoard === null || playerResultBoard === void 0 ? void 0 : playerResultBoard.players) === null || _a === void 0 ? void 0 : _a.length)) {
            return [];
        }
        return playerResultBoard.players.map(function (player) {
            var formattedWinAmount = function () {
                if (!shouldShowResults) {
                    return "-";
                }
                if (player.winAmount === null) {
                    return "-";
                }
                return calculateAmountByRate(player.winAmount, rate !== null && rate !== void 0 ? rate : 1) || "0";
            };
            return {
                playerName: player.name,
                betAmount: calculateAmountByRate(player.betAmount, rate !== null && rate !== void 0 ? rate : 1),
                win: formattedWinAmount(),
            };
        });
    }, [playerResultBoard, rate, shouldShowResults]);
    return {
        totalPlayers: (playerResultBoard === null || playerResultBoard === void 0 ? void 0 : playerResultBoard.totalPlayers) || 0,
        roundId: ((_a = playerResultBoard === null || playerResultBoard === void 0 ? void 0 : playerResultBoard.roundId) === null || _a === void 0 ? void 0 : _a.toString()) || "",
        tableData: tableData,
        shouldShowResults: shouldShowResults,
        isDisplayingResults: isDisplayingResults,
    };
};
