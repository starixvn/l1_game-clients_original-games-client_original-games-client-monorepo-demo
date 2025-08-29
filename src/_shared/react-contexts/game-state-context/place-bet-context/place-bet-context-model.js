export var initialPlaceBetContext = function () {
    return {
        ownBets: {},
        notConfirmOwnBets: {},
        showConfirmBet: false,
        showConfirmDialog: false,
        suggestBet: {
            currentBetChoice: "",
            sendOutstandingBet: null,
            suggestBetAmount: 0,
            isInsufficientFunds: null,
        },
    };
};
