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
import { useTranslate } from "@tolgee/react";
import { ResourceTypes } from "../resources";
export function parseTranslationKey(input) {
    if (input.includes(".")) {
        var ns = input.split(".")[0];
        var key = input.split(".")[1];
        return { key: key, ns: ns };
    }
    else {
        return { key: input };
    }
}
export var useTranslator = function (gameNamespaces) {
    var defaultNamespaces = [ResourceTypes.SABA_NUMBER, ResourceTypes.COMMON];
    var ns = gameNamespaces ? gameNamespaces.concat(defaultNamespaces) : defaultNamespaces;
    var translator = useTranslate(ns);
    var t = function (key, params, opt) {
        var _a = parseTranslationKey(key), parsedKey = _a.key, ns = _a.ns;
        return translator.t(__assign({ key: parsedKey, ns: ns, params: params }, opt));
    };
    return { t: t };
};
export var useCommonTranslate = function () {
    return useTranslate(ResourceTypes.COMMON);
};
export var useSNTranslate = function () {
    return useTranslate(ResourceTypes.SABA_NUMBER);
};
export var useSedieMultiplayerTranslate = function () {
    return useTranslate(ResourceTypes.SEDIE_MULTIPLAYER);
};
