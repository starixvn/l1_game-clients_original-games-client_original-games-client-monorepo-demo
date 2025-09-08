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
import { RoundState } from '@shared/components/game-base/type";
import { confirmBet } from "../constants";
import { NoticeErrorCode } from '@shared/constants/error-code-dictionary";
var SuggestBetMode;
(function (SuggestBetMode) {
    SuggestBetMode["ReachMaxBet"] = "ReachMaxBet";
    SuggestBetMode["SuggestBet"] = "SuggestBet";
    SuggestBetMode["MinBet"] = "MinBet";
    SuggestBetMode["MaxBetRound"] = "MaxBetRound";
})(SuggestBetMode || (SuggestBetMode = {}));
export var validateHedgeBet = function (hedgeBetGroup, ownBets, betChoice, amount) {
    var _a;
    var betTracks = __assign({}, ownBets);
    betTracks[betChoice] = ((_a = betTracks[betChoice]) !== null && _a !== void 0 ? _a : 0) + amount;
    return (hedgeBetGroup &&
        Object.keys(betTracks).some(function (betKey) { return betTracks[betKey] && hedgeBetGroup.includes(betKey) && hedgeBetGroup.includes(betChoice) && betKey !== betChoice; }));
};
export var getRoundMinBet = function (gameConfigs, userMinBet) {
    return Math.max(userMinBet, gameConfigs.minBet);
};
export var getRoundMaxBet = function (gameConfigs, userMaxBet) {
    return Math.min(userMaxBet, gameConfigs.maxBet);
};
export var getMaxBetPerChoice = function (gameConfigs, betChoice) {
    return gameConfigs.maxBetPerChoices[betChoice] || Infinity;
};
export var getCurrentAmountOfChoice = function (ownBets, notConfirmOwnBets, betChoice) {
    return (ownBets[betChoice] || 0) + (notConfirmOwnBets[betChoice] || 0);
};
export var isInsufficientFunds = function (amount, accountBalance, totalBetNotConfirmAmount, enabledQuickBet) {
    if (enabledQuickBet) {
        return amount > accountBalance;
    }
    return totalBetNotConfirmAmount + amount > accountBalance;
};
export var isOptionReachMaxBet = function (currentTotalAmountOfChoice, maxBetPerChoice) {
    return currentTotalAmountOfChoice > maxBetPerChoice;
};
export var isMinBet = function (amount, roundMinBet, suggestAmount) {
    if (suggestAmount > 0) {
        return suggestAmount < roundMinBet;
    }
    return amount > 0 && amount < roundMinBet;
};
export var isMaxBetRound = function (amount, roundMaxBet, totalBetAmount) {
    return amount + totalBetAmount > roundMaxBet || totalBetAmount > roundMaxBet;
};
export var isInPhasePreventBet = function (roundState) {
    return roundState !== RoundState.InRound;
};
export var isBalanceUnavailable = function (availableBalance, amount, gameStateContext, notConfirmOwnBets, enabledQuickBet) {
    var _a;
    if (enabledQuickBet && availableBalance === 0) {
        return true;
    }
    var gameConfigs = gameStateContext.gameConfigs, userStakeLevel = gameStateContext.userStakeLevel;
    var minBet = (_a = getRoundMinBet(gameConfigs, (userStakeLevel === null || userStakeLevel === void 0 ? void 0 : userStakeLevel.minBet) || 0)) !== null && _a !== void 0 ? _a : 0;
    var totalBetAmount = getTotalNotConfirmBet(notConfirmOwnBets);
    return amount > 0 && (availableBalance - totalBetAmount === 0 || availableBalance < minBet);
};
export var isHedgeBet = function (hedgeBetGroups, betChoice, amount, ownBets) {
    return validateHedgeBet(hedgeBetGroups, ownBets, betChoice, amount);
};
export var findHedgeBetGroup = function (hedgeBetGroups, betChoice) {
    var _a;
    return (_a = hedgeBetGroups === null || hedgeBetGroups === void 0 ? void 0 : hedgeBetGroups.find(function (group) { return group.includes(betChoice); })) !== null && _a !== void 0 ? _a : [];
};
export var getAccountBalance = function (balance) {
    return Math.trunc(balance || 0);
};
export var getMaxAvailableAmountOfChoice = function (maxBetPerChoice, currentAmountOfChoice, roundMaxBet, totalBetNotConfirmAmount, totalBeAmount, accountBalance, enabledQuickBet) {
    if (totalBeAmount === roundMaxBet) {
        return 0;
    }
    if (totalBetNotConfirmAmount > accountBalance) {
        return 0;
    }
    var remainAmount = maxBetPerChoice - currentAmountOfChoice;
    if (remainAmount + totalBeAmount >= roundMaxBet) {
        remainAmount = roundMaxBet - totalBeAmount;
    }
    if (!enabledQuickBet && totalBetNotConfirmAmount + remainAmount > accountBalance) {
        remainAmount = accountBalance - totalBetNotConfirmAmount;
    }
    return remainAmount > 0 ? remainAmount : 0;
};
export var getCriteriaValidateBet = function (gameStateContext, placeBetContext, betChoice, amount, accountBalance, enabledQuickBet) {
    if (betChoice !== confirmBet) {
        var criteria = composeValidationCriteria(amount, accountBalance, gameStateContext, placeBetContext, betChoice, enabledQuickBet);
        if ((criteria === null || criteria === void 0 ? void 0 : criteria.suggestAmount) > 0 && (criteria === null || criteria === void 0 ? void 0 : criteria.isSuggestBet)) {
            return { errorCode: NoticeErrorCode.suggestBet, args: criteria };
        }
        if (criteria === null || criteria === void 0 ? void 0 : criteria.errorCode) {
            return { errorCode: criteria === null || criteria === void 0 ? void 0 : criteria.errorCode, args: criteria === null || criteria === void 0 ? void 0 : criteria.args };
        }
    }
    return { errorCode: NoticeErrorCode.validBet };
};
var composeValidationCriteria = function (amount, accountBalance, context, placeBetContext, betChoice, enabledQuickBet) {
    var gameConfigs = context.gameConfigs, userStakeLevel = context.userStakeLevel;
    var notConfirmOwnBets = placeBetContext.notConfirmOwnBets, ownBets = placeBetContext.ownBets;
    var userMinBet = userStakeLevel.minBet, userMaxBet = userStakeLevel.maxBet;
    var totalBetNotConfirmAmount = getTotalNotConfirmBet(notConfirmOwnBets);
    var totalBeAmount = getTotalBetAmount(placeBetContext);
    var roundMaxBet = getRoundMaxBet(gameConfigs, userMaxBet);
    var maxBetPerChoice = getMaxBetPerChoice(gameConfigs, betChoice);
    var currentAmountOfChoice = getCurrentAmountOfChoice(ownBets, notConfirmOwnBets, betChoice);
    var maxAvailableAmountOfChoice = getMaxAvailableAmountOfChoice(maxBetPerChoice, currentAmountOfChoice, roundMaxBet, totalBetNotConfirmAmount, totalBeAmount, accountBalance, enabledQuickBet);
    var suggestAmount = Math.min(accountBalance, maxAvailableAmountOfChoice);
    return determineBetMode({
        suggestAmount: suggestAmount,
        isInsufficientFunds: isInsufficientFunds(amount, accountBalance, totalBetNotConfirmAmount, enabledQuickBet),
        isOptionReachMaxBet: isOptionReachMaxBet(currentAmountOfChoice + amount, maxBetPerChoice),
        isMaxBetRound: isMaxBetRound(amount, roundMaxBet, totalBeAmount),
        maxBetPerChoice: maxBetPerChoice,
        roundMaxBet: roundMaxBet,
        roundMinBet: getRoundMinBet(gameConfigs, userMinBet),
        currentAmountOfChoice: currentAmountOfChoice,
    });
};
var determineBetMode = function (_a) {
    var suggestAmount = _a.suggestAmount, isInsufficientFunds = _a.isInsufficientFunds, isOptionReachMaxBet = _a.isOptionReachMaxBet, isMaxBetRound = _a.isMaxBetRound, maxBetPerChoice = _a.maxBetPerChoice, roundMaxBet = _a.roundMaxBet, roundMinBet = _a.roundMinBet, currentAmountOfChoice = _a.currentAmountOfChoice;
    if (suggestAmount === 0) {
        if (isMaxBetRound) {
            return getMaxBetRoundMode(roundMaxBet, maxBetPerChoice);
        }
        if (isOptionReachMaxBet) {
            return getReachMaxBetMode(maxBetPerChoice);
        }
    }
    var isSuggestBet = isSuggestBetAvailable(suggestAmount, currentAmountOfChoice, roundMinBet, roundMaxBet, isInsufficientFunds, isOptionReachMaxBet, isMaxBetRound);
    return {
        suggestAmount: suggestAmount,
        isInsufficientFunds: isInsufficientFunds,
        isSuggestBet: isSuggestBet,
        mode: SuggestBetMode.SuggestBet,
    };
};
var getReachMaxBetMode = function (maxBetPerChoice) {
    return {
        mode: SuggestBetMode.ReachMaxBet,
        errorCode: NoticeErrorCode.optionMaxBet,
        args: { maxBet: maxBetPerChoice },
    };
};
var getMaxBetRoundMode = function (roundMaxBet, maxBetPerChoice) {
    return {
        mode: SuggestBetMode.MaxBetRound,
        maxBetPerChoice: maxBetPerChoice,
        errorCode: NoticeErrorCode.drawMaxBet,
        args: { maxBet: roundMaxBet },
    };
};
var isSuggestBetAvailable = function (suggestAmount, currentAmountOfChoice, roundMinBet, roundMaxBet, isInsufficientFunds, isOptionReachMaxBet, isMaxBetRoundResult) {
    return ((suggestAmount + currentAmountOfChoice >= roundMinBet || suggestAmount + currentAmountOfChoice <= roundMaxBet) &&
        (isInsufficientFunds || isOptionReachMaxBet || isMaxBetRoundResult));
};
export var getTotalNotConfirmBet = function (notConfirmOwnBets) {
    return Object.values(notConfirmOwnBets).reduce(function (a, b) { return a + b; }, 0);
};
export var getTotalBetAmount = function (placeBetContext) {
    return (Object.values(placeBetContext.notConfirmOwnBets).reduce(function (a, b) { return a + b; }, 0) +
        Object.values(placeBetContext.ownBets).reduce(function (a, b) { return a + b; }, 0));
};
