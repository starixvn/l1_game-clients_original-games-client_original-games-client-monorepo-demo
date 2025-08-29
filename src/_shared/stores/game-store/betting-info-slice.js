var EVENT_TYPE = {
    OWN_BETS: "ownBets",
    TOTAL_BETS: "totalBets",
    BET_PERCENTAGE: "betPercentage",
    PLAYER_BET_COUNT: "playerBetCount",
    END_BET: "endBet",
};
export var createBettingInfoSlice = function (set, get, store) { return ({
    totalBets: {},
    betPercentage: {},
    playerBetCount: {},
    ownBets: {},
    endBet: 0,
    setTotalBets: function (totalBets) { return set({ totalBets: totalBets }); },
    setBetPercentage: function (betPercentage) { return set({ betPercentage: betPercentage }); },
    setPlayerBetCount: function (playerBetCount) { return set({ playerBetCount: playerBetCount }); },
    setOwnBets: function (ownBets) { return set({ ownBets: ownBets }); },
    setEndBet: function (endBet) { return set({ endBet: endBet }); },
    registerBettingInfoEvent: function (message) {
        Object.values(EVENT_TYPE).forEach(function (event) {
            var _a;
            if (message[event] !== undefined) {
                set((_a = {}, _a[event] = message[event], _a));
            }
        });
    },
    resetBettingInfo: function () { return set({ totalBets: {}, betPercentage: {}, playerBetCount: {}, ownBets: {}, endBet: 0 }); },
}); };
