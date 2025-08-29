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
import isEmpty from "lodash/isEmpty";
import { createContext, useContext } from "react";
import { StorageHelper, localStorageKeys } from "../helpers/storage-helper";
import { GameIds } from "../constants";
import { AnalyticsHelper } from "../helpers/analytic-helper";
import { GameUtils } from "../helpers/base-64-helper";
import { broadcastBackToLobby } from "../helpers/global-events-helper";
export function parseContextFromURL() {
    var _a;
    // Fix: Handle HTML-encoded ampersands by decoding them first
    var rawSearch = ((_a = globalThis.location) === null || _a === void 0 ? void 0 : _a.search) || '';
    var decodedSearch = rawSearch.replace(/&amp;/g, '&');
    var params = new URLSearchParams(decodedSearch);
    // Reload page
    if (Array.from(params.values()).length === 0) {
        return;
    }
    var token = params.get("token");
    var language = params.get("lang");
    var gameIdParam = params.get("gameId");
    var gameId = Number(gameIdParam);
    if (!gameIdParam || Number.isNaN(gameId) || gameId <= 0) {
        gameId = GameIds.SeDieMultiplayer;
    }
    var redirectUrl = params.get("rurl");
    return { token: token, language: language, gameId: gameId, redirectUrl: redirectUrl };
}
export function loadURLContext() {
    var _a, _b, _c;
    var contextFromURL = parseContextFromURL();
    var contextFromLocalStorage = (StorageHelper === null || StorageHelper === void 0 ? void 0 : StorageHelper.get(localStorageKeys.url)) || null;
    if (!!contextFromURL) {
        var contextString = __assign(__assign({}, contextFromURL), { token: undefined });
        // Keep URL params during development to make debugging easier
        var isLocalhost = typeof window !== "undefined"
            && /^(localhost|127\.0\.0\.1)/.test(((_a = window.location) === null || _a === void 0 ? void 0 : _a.hostname) || "");
        var isNonProductionEnv = (typeof process !== "undefined" && (((_b = process.env) === null || _b === void 0 ? void 0 : _b.NODE_ENV) || "").toLowerCase() !== "production");
        if (!isLocalhost && !isNonProductionEnv) {
            globalThis.history.pushState(null, "", (_c = globalThis.location) === null || _c === void 0 ? void 0 : _c.href.split("?")[0]);
        }
        StorageHelper === null || StorageHelper === void 0 ? void 0 : StorageHelper.set(localStorageKeys.url, contextString);
        AnalyticsHelper === null || AnalyticsHelper === void 0 ? void 0 : AnalyticsHelper.login(contextFromURL);
        return contextFromURL;
    }
    return contextFromLocalStorage;
}
export var initialURLContextData = __assign(__assign({}, loadURLContext()), { backToRedirectUrl: function (redirectUrl) {
        if (!isEmpty(redirectUrl)) {
            var decodedUrl = GameUtils.base64Decode(redirectUrl);
            globalThis.location.href = decodedUrl;
        }
        else {
            updateURLContext({ backToLobby: true, gameId: 0 });
            broadcastBackToLobby();
        }
    } });
export var URLContext = createContext(initialURLContextData);
export var useURLContext = function () { return useContext(URLContext); };
export function updateURLContext(context) {
    var contextFromLocalStorage = StorageHelper.get(localStorageKeys.url) || {};
    // latestGameId persistence removed due to one-game-per-session behavior
    var updatedContext = __assign(__assign({}, contextFromLocalStorage), context);
    StorageHelper.set(localStorageKeys.url, updatedContext);
}
export function getURLContext() {
    return StorageHelper.get(localStorageKeys.url) || {};
}
