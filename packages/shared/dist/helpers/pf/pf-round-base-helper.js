export var finalHashToNumbers = function (finalHash, index) {
    return parseInt(finalHash.slice(index * 2, index * 2 + 2), 16);
};
var PfRoundBaseHelper = /** @class */ (function () {
    function PfRoundBaseHelper() {
    }
    PfRoundBaseHelper.buildVerifyInfo = function (_a) {
        var pfResult = _a.pfResult, combinedHash = _a.combinedHash, dicesEachRound = _a.dicesEachRound;
        var serverSeed = JSON.parse((pfResult === null || pfResult === void 0 ? void 0 : pfResult.serverSeed) || "{}");
        var randomNumbers = ((serverSeed === null || serverSeed === void 0 ? void 0 : serverSeed.random) || "").split(";").map(function (x) { return +x; });
        var rawDigits = combinedHash.match(/.{2}/g);
        var convertNumber = Array.from(Array(dicesEachRound), function (_, index) { return finalHashToNumbers(combinedHash, index); });
        var diceIndexes = randomNumbers.map(function (x, index) { return (x + convertNumber[index]) % 2; });
        var severSeedRemain = ((serverSeed === null || serverSeed === void 0 ? void 0 : serverSeed.remain) || "2;2").split(";");
        return {
            randomNumbers: randomNumbers,
            rawDigits: rawDigits,
            convertNumber: convertNumber,
            diceIndexes: diceIndexes,
            severSeedRemain: severSeedRemain,
        };
    };
    return PfRoundBaseHelper;
}());
export default PfRoundBaseHelper;
