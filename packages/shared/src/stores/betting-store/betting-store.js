import { create } from "zustand";
var EVENT_TYPE = {
    OWN_BETS: "ownBets",
};
export var useBettingStore = create()(function (set) {
    var a = [];
    for (var _i = 1; _i < arguments.length; _i++) {
        a[_i - 1] = arguments[_i];
    }
    return {
        selectedChip: 1,
        ownBets: {},
        isAutoRebetActive: false,
        actions: {
            setSelectedChip: function (selectedChip) { return set({ selectedChip: selectedChip }); },
            setIsAutoRebetActive: function (isAutoRebetActive) { return set({ isAutoRebetActive: isAutoRebetActive }); },
            setOwnBets: function (ownBets) { return set({ ownBets: ownBets }); },
        },
        registerEvent: function (message) {
            Object.values(EVENT_TYPE).forEach(function (event) {
                var _a;
                if (message[event] !== undefined) {
                    set((_a = {}, _a[event] = message[event], _a));
                }
            });
        },
    };
});
export default useBettingStore;
