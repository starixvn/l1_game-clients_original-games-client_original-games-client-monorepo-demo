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
import { useShallow } from "zustand/shallow";
import useBettingStore from "../stores/betting-store/betting-store";
import { useGameStore } from "../stores/game-store/game-store";
import { useCallback, useEffect, useRef, useState } from "react";
import { RoundState } from "../../components/game-base/type";
import { useClientSeedPF } from "./use-client-seed-pf";
import { usePlayerContext } from "../react-contexts";
import { useGlobalEventsStore } from "../stores/global-events-store/global-events-store";
import { NoticeErrorCode } from "../constants/error-code-dictionary";
import { broadcastNotice, getNotice } from "../helpers";
var RETRY_INTERVAL_MS = 3000;
export var useRebet = function (isDoubleBet) {
    if (isDoubleBet === void 0) { isDoubleBet = false; }
    var _a = useState(false), isEnabled = _a[0], setIsEnabled = _a[1];
    var _b = useState(true), hasPlacedPreviousBet = _b[0], setHasPlacedPreviousBet = _b[1];
    var _c = useState(false), isValidBet = _c[0], setIsValidBet = _c[1];
    var clientSeed = useClientSeedPF().clientSeed;
    var authorizeInfo = usePlayerContext().authorizeInfo;
    var userInfoRed = useGlobalEventsStore(function (state) { return state.userInfoRed; });
    var _d = useGameStore(useShallow(function (state) { return ({
        sendSocketEvent: state.sendSocketEvent,
        roundState: state.roundState,
        endBet: state.endBet,
    }); })), sendSocketEvent = _d.sendSocketEvent, roundState = _d.roundState, endBet = _d.endBet;
    var ownBets = useBettingStore(function (state) { return state.ownBets; });
    var retryIntervalRef = useRef();
    var clearRetryInterval = useCallback(function () {
        if (retryIntervalRef.current) {
            clearInterval(retryIntervalRef.current);
            retryIntervalRef.current = undefined;
        }
    }, []);
    var startRetryInterval = useCallback(function () {
        clearRetryInterval();
        retryIntervalRef.current = setInterval(function () {
            sendSocketEvent("retry", {});
        }, RETRY_INTERVAL_MS);
    }, [clearRetryInterval, sendSocketEvent]);
    var calculateBetChoices = useCallback(function () {
        if (!isDoubleBet) {
            return ownBets;
        }
        return Object.keys(ownBets).reduce(function (accumulator, betChoice) {
            var _a;
            return (__assign(__assign({}, accumulator), (_a = {}, _a[betChoice] = ownBets[betChoice] * 2, _a)));
        }, {});
    }, [ownBets, isDoubleBet]);
    var isEnoughBalance = useCallback(function () {
        var _a;
        var balance = userInfoRed !== null ? userInfoRed : ((_a = authorizeInfo === null || authorizeInfo === void 0 ? void 0 : authorizeInfo.user) === null || _a === void 0 ? void 0 : _a.red) || 0;
        var totalAmount = Object.values(calculateBetChoices()).reduce(function (acc, bet) { return acc + bet; }, 0);
        return balance >= totalAmount;
    }, [calculateBetChoices, userInfoRed, authorizeInfo]);
    var disable = useCallback(function () {
        setHasPlacedPreviousBet(false);
        setIsEnabled(false);
    }, []);
    var handleClickRebet = useCallback(function () {
        if (!isEnoughBalance()) {
            broadcastNotice(getNotice(NoticeErrorCode.notEnoughMoney, false));
            disable();
            setIsValidBet(false);
            return false;
        }
        startRetryInterval();
        var betChoices = calculateBetChoices();
        sendSocketEvent("rebet", { betChoices: betChoices, clientSeed: clientSeed });
        return true;
    }, [startRetryInterval, calculateBetChoices, sendSocketEvent, clientSeed, isEnoughBalance, disable]);
    useEffect(function () {
        clearRetryInterval();
        disable();
        endBet > 0 && setIsValidBet(true);
        return clearRetryInterval;
    }, [endBet, ownBets, clearRetryInterval, disable]);
    useEffect(function () {
        if (roundState !== RoundState.InRound) {
            clearRetryInterval();
        }
    }, [roundState, clearRetryInterval]);
    useEffect(function () {
        var hasBets = Object.keys(ownBets).length > 0;
        if (roundState === RoundState.InRound) {
            if (hasPlacedPreviousBet && hasBets && isValidBet) {
                setIsEnabled(true);
            }
        }
        else {
            setIsEnabled(false);
        }
        if (roundState === RoundState.DisplayResult) {
            hasBets && setHasPlacedPreviousBet(true);
        }
    }, [roundState, hasPlacedPreviousBet, isValidBet]);
    return { isEnabled: isEnabled, handleClickRebet: handleClickRebet };
};
