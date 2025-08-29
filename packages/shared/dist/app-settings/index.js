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
import getConfig from "next/config";
var defaultAppSettings = getConfig().publicRuntimeConfig;
var mergedAppSettings;
export var getAppSettings = function () {
    if (mergedAppSettings) {
        return mergedAppSettings;
    }
    mergedAppSettings = defaultAppSettings;
    if (global.window) {
        defaultAppSettings.serverDomainMapper = undefined;
        mergedAppSettings = global.window["envConfig"] ? __assign(__assign({}, defaultAppSettings), global.window["envConfig"]) : defaultAppSettings;
        global.window["mergedAppSettings"] = mergedAppSettings;
    }
    return mergedAppSettings;
};
export var getGameSettings = function (gameId) {
    var gameSettings = getAppSettings().gameSettings;
    return gameSettings[gameId];
};
export var getGamesPath = function () {
    var gameSettings = getAppSettings().gameSettings;
    return Array.from(new Set(Object.values(gameSettings).map(function (item) { return item.gamePath; })));
};
export var getGameIdsSetting = function () {
    var gameSettings = getAppSettings().gameSettings;
    return Object.keys(gameSettings);
};
