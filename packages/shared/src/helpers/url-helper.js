import { getAppSettings } from "../app-settings";
export var buildUrl = function (subDomain, path) {
    var _a;
    if (subDomain === void 0) { subDomain = (_a = getAppSettings().proxy) === null || _a === void 0 ? void 0 : _a.subDomain; }
    if (path === void 0) { path = "/"; }
    var proxy = getAppSettings().proxy;
    var domain = getRootDomain();
    var subDomainText = "".concat(subDomain, ".");
    return "".concat(proxy.ssl ? "https" : "http", "://").concat(subDomain === "" ? "" : subDomainText).concat(domain).concat(path);
};
export var getRootDomain = function () {
    if (typeof window !== "undefined" && window.location && window.location.hostname) {
        var hostName = window.location.hostname;
        return ((!!getAppSettings().serverDomainMapper && getAppSettings().serverDomainMapper[hostName]) || extractDomainFromHostName(hostName));
    }
    return "";
};
export var extractDomainFromHostName = function (hostName) {
    var domainParts = hostName.split(".").reverse();
    return "".concat(domainParts[1], ".").concat(domainParts[0]);
};
export var buildGameGuideUrl = function () {
    return buildUrl(getAppSettings().subGuideDomain, "");
};
export var buildServerUrl = function (path) {
    var pathStr = "/user/".concat(path);
    return buildUrlWithPath(pathStr);
};
export var buildUrlWithPath = function (path) {
    var _a;
    return buildUrl((_a = getAppSettings().proxy) === null || _a === void 0 ? void 0 : _a.subDomain, path);
};
