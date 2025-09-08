import { useCallback, useEffect, useState } from "react";
import { useShallow } from "zustand/shallow";
import { useGameStore } from '@shared/stores/game-store/game-store";
import { RoundState } from '@shared/components/game-base/type";
import useBettingStore from '@shared/stores/betting-store/betting-store";
import { useRebet } from "./use-rebet";
export var useAutoRebet = function () {
    var _a = useBettingStore(useShallow(function (state) { return ({
        isAutoRebetActive: state.isAutoRebetActive,
        setIsAutoRebetActive: state.actions.setIsAutoRebetActive,
    }); })), isAutoRebetActive = _a.isAutoRebetActive, setIsAutoRebetActive = _a.setIsAutoRebetActive;
    var _b = useGameStore(useShallow(function (state) { return ({
        roundState: state.roundState,
        endBet: state.endBet,
    }); })), roundState = _b.roundState, endBet = _b.endBet;
    var _c = useRebet(), handleClickRebet = _c.handleClickRebet, isEnabled = _c.isEnabled;
    var _d = useState(0), remainingRounds = _d[0], setRemainingRounds = _d[1];
    var startAutoRebet = useCallback(function (rounds) {
        setRemainingRounds(rounds);
        setIsAutoRebetActive(true);
    }, [setIsAutoRebetActive]);
    var stopAutoRebet = useCallback(function () {
        setIsAutoRebetActive(false);
        setRemainingRounds(0);
    }, [setIsAutoRebetActive]);
    var rebet = useCallback(function () {
        if (remainingRounds === 1) {
            handleClickRebet();
            stopAutoRebet();
        }
        var isSuccess = false;
        if (remainingRounds > 1) {
            setRemainingRounds(function (prev) { return prev - 1; });
            isSuccess = handleClickRebet();
        }
        else {
            stopAutoRebet();
        }
        if (!isSuccess) {
            stopAutoRebet();
        }
    }, [remainingRounds, stopAutoRebet, handleClickRebet]);
    useEffect(function () {
        if (!isAutoRebetActive) {
            return;
        }
        if (roundState === RoundState.InRound) {
            rebet();
        }
    }, [roundState, isAutoRebetActive]);
    useEffect(function () {
        if (endBet < 0) {
            stopAutoRebet();
        }
    }, [endBet, stopAutoRebet]);
    return {
        isEnabled: isEnabled,
        isAutoRebetActive: isAutoRebetActive,
        remainingRounds: remainingRounds,
        startAutoRebet: startAutoRebet,
        stopAutoRebet: stopAutoRebet,
    };
};
