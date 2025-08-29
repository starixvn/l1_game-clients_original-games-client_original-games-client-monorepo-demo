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
export var finalHashToNumbers = function (finalHash, index) {
    return parseInt(finalHash.slice(index * 2, index * 2 + 2), 16);
};
var PfDrawBaseHelper = /** @class */ (function () {
    function PfDrawBaseHelper() {
    }
    PfDrawBaseHelper.buildRemainingBalls = function (_a) {
        var ballIndexes = _a.ballIndexes, remainingBalls = _a.remainingBalls;
        var results = [];
        var newRemainBalls = [remainingBalls];
        ballIndexes.forEach(function (index) {
            var result = remainingBalls[index - 1];
            results.push(result);
            remainingBalls = remainingBalls.filter(function (ballValue) { return ballValue !== result; });
            newRemainBalls.push(remainingBalls);
        });
        return { results: results, remainingBalls: newRemainBalls };
    };
    PfDrawBaseHelper.buildVerifyInfo = function (_a) {
        var pfResult = _a.pfResult, combinedHash = _a.combinedHash, ballsEachRound = _a.ballsEachRound;
        var rawDigits = combinedHash.match(/.{2}/g);
        var serverSeed = JSON.parse((pfResult === null || pfResult === void 0 ? void 0 : pfResult.serverSeed) || "{}");
        var randomNumbers = ((serverSeed === null || serverSeed === void 0 ? void 0 : serverSeed.random) || "").split(";").map(function (x) { return +x; });
        var remainingBalls = ((serverSeed === null || serverSeed === void 0 ? void 0 : serverSeed.remain) || "").split(":");
        var convertNumber = Array.from(Array(ballsEachRound), function (_, index) { return finalHashToNumbers(combinedHash, index); });
        var ballIndexes = randomNumbers.map(function (x, index) { return ((x + convertNumber[index]) % ((remainingBalls === null || remainingBalls === void 0 ? void 0 : remainingBalls.length) - index)) + 1; });
        return __assign({ rawDigits: rawDigits, randomNumbers: randomNumbers, convertNumber: convertNumber, ballIndexes: ballIndexes }, this.buildRemainingBalls({ ballIndexes: ballIndexes, remainingBalls: remainingBalls }));
    };
    return PfDrawBaseHelper;
}());
export default PfDrawBaseHelper;
