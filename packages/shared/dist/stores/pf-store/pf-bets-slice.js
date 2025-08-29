var EVENT_TYPE = {
    OWN_BETS: "ownBets",
};
export var createPFBetsSlice = function (set) { return ({
    // Initial state
    ownBets: {},
    // Actions
    setOwnBets: function (bets) { return set({ ownBets: bets }); },
    setNewGameState: function () { return set({ ownBets: {} }); },
    registerPFBetsEvent: function (message) {
        Object.values(EVENT_TYPE).forEach(function (event) {
            var _a;
            if (message[event] !== undefined) {
                set((_a = {}, _a[event] = message[event], _a));
            }
        });
    },
}); };
