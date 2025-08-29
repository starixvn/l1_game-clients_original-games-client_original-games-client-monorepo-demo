var numberRoundDownWithCommas = function (number, toFixed) {
    if (toFixed === void 0) { toFixed = 2; }
    var result = Math.floor(number * Math.pow(10, toFixed)) / Math.pow(10, toFixed);
    return numberWithCommas(result, toFixed);
};
var numberWithCommas = function (number, toFixed, minimumFractionDigits) {
    if (toFixed === void 0) { toFixed = 2; }
    if (minimumFractionDigits === void 0) { minimumFractionDigits = 0; }
    var options = { maximumFractionDigits: toFixed };
    if (number % parseInt(number.toString()) !== 0) {
        options.minimumFractionDigits = minimumFractionDigits;
    }
    return number.toLocaleString("en-US", options);
};
var randomInteger = function (min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
};
var randomNumberSeries = function (length) {
    return Array.from({ length: length }, function () { return randomInteger(0, 9); }).join("");
};
var sumArray = function (numbers) { return numbers.reduce(function (number, sum) { return number + sum; }, 0); };
var formatOdds = function (value, isFractionalFormat, decimalPlaces) {
    if (isFractionalFormat === void 0) { isFractionalFormat = false; }
    if (decimalPlaces === void 0) { decimalPlaces = 2; }
    return isFractionalFormat ? "".concat(numberWithCommas(+value - 1, 2, decimalPlaces), ":1") : "1:".concat(numberWithCommas(+value, 2, decimalPlaces));
};
var initIntegerArray = function (from, to) {
    var integerArray = [];
    for (var i = from; i <= to; i++) {
        integerArray.push(i);
    }
    return integerArray;
};
var formatVolume = function (value) {
    return +value / 100;
};
var calculateWinAmount = function (isWin, amount, odds) { return (isWin ? amount * odds : 0); };
export { formatOdds, formatVolume, initIntegerArray, numberRoundDownWithCommas, numberWithCommas, randomInteger, randomNumberSeries, sumArray, calculateWinAmount, };
