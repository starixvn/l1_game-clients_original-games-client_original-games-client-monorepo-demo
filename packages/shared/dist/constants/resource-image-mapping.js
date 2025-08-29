var __spreadArray = (this && this.__spreadArray) || function (to, from, pack) {
    if (pack || arguments.length === 2) for (var i = 0, l = from.length, ar; i < l; i++) {
        if (ar || !(i in from)) {
            if (!ar) ar = Array.prototype.slice.call(from, 0, i);
            ar[i] = from[i];
        }
    }
    return to.concat(ar || Array.prototype.slice.call(from));
};
import { getGameSettings } from "../app-settings";
export var getDevicePixelRatio = function () {
    return (typeof window !== "undefined" && (window === null || window === void 0 ? void 0 : window.devicePixelRatio)) || 0;
};
export var getPathImageGameId = function (gameId) {
    var _a, _b;
    var gameSettings = getGameSettings(gameId);
    var gameImagePath = ((_a = gameSettings === null || gameSettings === void 0 ? void 0 : gameSettings.gameResourceConfigs) === null || _a === void 0 ? void 0 : _a.path) || "";
    var optionalGamePaths = ((_b = gameSettings === null || gameSettings === void 0 ? void 0 : gameSettings.gameResourceConfigs) === null || _b === void 0 ? void 0 : _b.optionalPaths) || [];
    if (!gameImagePath) {
        return [];
    }
    var devicePixelRatioSuffix = getDevicePixelRatio() > 1 ? "/2x" : "/1x";
    return __spreadArray([gameImagePath, "".concat(gameImagePath).concat(devicePixelRatioSuffix)], optionalGamePaths, true);
};
export var getPathBanner = function (locale, gameId) {
    if (!gameId) {
        return [];
    }
    return ["lobby/banners/".concat(gameId, "/").concat(gameId, "_").concat(locale, ".gif")];
};
export var getPathIconGames = function (gameIds) {
    if ((gameIds === null || gameIds === void 0 ? void 0 : gameIds.length) < 0) {
        return [];
    }
    var bgIcons = ["lobby/game-board-detail/bg-game-board-2x.webp", "lobby/game-board-detail/bg-game-board.webp"];
    return __spreadArray(__spreadArray([], gameIds.map(function (gameId) { return "lobby/game-board-detail/".concat(gameId); }), true), bgIcons, true);
};
export var pathImageMapping = {
    lobby: [],
    game: [],
};
