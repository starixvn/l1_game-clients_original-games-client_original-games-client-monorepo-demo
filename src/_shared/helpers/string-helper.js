String.prototype.replaceTolgeeFormat = function () {
    return this.replaceAll("%", "").replaceAll("(%", "(").replaceAll("#%", "#");
};
String.prototype.capitalizeFirstLetter = function () {
    var regex = /(^|\s)[a-z]/g;
    return this.toLowerCase().replace(regex, function (letter) { return letter.toUpperCase(); });
};
String.prototype.appendBuildVersion = function () {
    var _a;
    return "".concat(this, "?v=").concat(((_a = process === null || process === void 0 ? void 0 : process.env) === null || _a === void 0 ? void 0 : _a.buildVersion) || 111);
};
String.prototype.removeBuildVersion = function () {
    return this.replace(/\?v=[a-zA-Z0-9]*/, "");
};
