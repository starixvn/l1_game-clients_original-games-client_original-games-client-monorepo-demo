var __spreadArray = (this && this.__spreadArray) || function (to, from, pack) {
    if (pack || arguments.length === 2) for (var i = 0, l = from.length, ar; i < l; i++) {
        if (ar || !(i in from)) {
            if (!ar) ar = Array.prototype.slice.call(from, 0, i);
            ar[i] = from[i];
        }
    }
    return to.concat(ar || Array.prototype.slice.call(from));
};
import { FormatIcu } from "@tolgee/format-icu";
import { BackendFetch, Tolgee } from "@tolgee/react";
import { getAppSettings } from "./app-settings";
import { buildVersion, locales } from "./constants";
var tolgeeNamespaceByGameSetting = Object.values(getAppSettings().gameSettings)
    .map(function (setting) { return setting.tolgeeNamespace; })
    .filter(function (ns) { return ns; });
var namespaces = __spreadArray(["SabaNumber", "Common"], tolgeeNamespaceByGameSetting, true).filter(function (value, index, arr) { return arr.indexOf(value) === index; });
var trimSlashes = function (path) {
    if (path.endsWith("/")) {
        return path.slice(0, -1);
    }
    return path;
};
var getPath = function (_a) {
    var namespace = _a.namespace, language = _a.language, prefix = _a.prefix;
    var basePath = trimSlashes(prefix);
    return namespace ? "".concat(basePath, "/").concat(namespace, "/").concat(language, ".json?v=").concat(buildVersion) : "".concat(basePath, "/").concat(language, ".json?v=").concat(buildVersion);
};
export var tolgee = Tolgee().use(FormatIcu()).use(BackendFetch({ getPath: getPath })).init({
    fallbackLanguage: "en",
    defaultLanguage: "en",
    availableLanguages: Object.values(locales),
    projectId: "5",
    ns: namespaces,
    defaultNs: "SabaNumber",
});
