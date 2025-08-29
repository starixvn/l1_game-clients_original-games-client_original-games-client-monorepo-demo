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
import { getAppSettings, getGameSettings } from "../app-settings";
export var TrackingEvent;
(function (TrackingEvent) {
    TrackingEvent["Function"] = "function_event";
    TrackingEvent["SSO"] = "sso_event";
})(TrackingEvent || (TrackingEvent = {}));
export var TrackingAction;
(function (TrackingAction) {
    TrackingAction["ToggleOn"] = "ToggleOn";
    TrackingAction["ToggleOff"] = "ToggleOff";
    TrackingAction["Click"] = "Click";
    TrackingAction["Show"] = "Show";
    TrackingAction["Select"] = "Select";
    TrackingAction["Open"] = "Open";
    TrackingAction["Close"] = "Close";
    TrackingAction["Change"] = "Change";
    TrackingAction["Swipe"] = "Swipe";
    TrackingAction["Create"] = "Create";
    TrackingAction["GenerateRandom"] = "GenerateRandom";
})(TrackingAction || (TrackingAction = {}));
export var TrackingFunction;
(function (TrackingFunction) {
    TrackingFunction["Music"] = "Music";
    TrackingFunction["Sound"] = "Sound";
    TrackingFunction["PFSetting"] = "PFSetting";
    TrackingFunction["PFGuide"] = "PFGuide";
    TrackingFunction["BetHistory"] = "BetHistory";
    TrackingFunction["BetDetails"] = "BetDetails";
    TrackingFunction["GameGuide"] = "GameGuide";
    TrackingFunction["PFBetHistory"] = "PFBetHistory";
    TrackingFunction["PFClientSeeds"] = "PFClientSeeds";
    TrackingFunction["PFVerify"] = "PFVerify";
    TrackingFunction["PFExportClientSeeds"] = "PFExportClientSeeds";
    TrackingFunction["SelectChip"] = "SelectChip";
    TrackingFunction["Banner"] = "Banner";
    TrackingFunction["Avatar"] = "Avatar";
    TrackingFunction["JoinGame"] = "JoinGame";
    TrackingFunction["Nickname"] = "Nickname";
    TrackingFunction["Lobby"] = "Lobby";
    TrackingFunction["SwitchGame"] = "SwitchGame";
})(TrackingFunction || (TrackingFunction = {}));
var eventNames = { page_view: "page_view", login: "login_type" };
var commandNames = { event: "event", config: "config" };
var AnalyticsHelper = /** @class */ (function () {
    function AnalyticsHelper() {
    }
    AnalyticsHelper.setPlayerSession = function (playerSession) {
        AnalyticsHelper.playerContext.playerId = playerSession === null || playerSession === void 0 ? void 0 : playerSession.username;
    };
    AnalyticsHelper.injectPlayerInfo = function (analyticParams, propertyName) {
        var _a, _b;
        if ((_a = AnalyticsHelper.playerContext) === null || _a === void 0 ? void 0 : _a.playerId) {
            analyticParams[propertyName] = (_b = AnalyticsHelper.playerContext) === null || _b === void 0 ? void 0 : _b.playerId;
        }
    };
    AnalyticsHelper.trackEvent = function (event, params) {
        AnalyticsHelper.send(commandNames.event, event, params);
    };
    AnalyticsHelper.login = function (urlContext) {
        var _a;
        try {
            var ssoMethod = "SSO_To_Lobby";
            if (urlContext === null || urlContext === void 0 ? void 0 : urlContext.gameId) {
                ssoMethod = "SSO_To_Game";
            }
            AnalyticsHelper.ssoContext = {
                ssoMethod: ssoMethod,
                gameId: urlContext === null || urlContext === void 0 ? void 0 : urlContext.gameId,
                language: urlContext.language,
            };
            if ((urlContext === null || urlContext === void 0 ? void 0 : urlContext.gameId) > 0) {
                AnalyticsHelper.ssoContext.gameName = (_a = getGameSettings(urlContext === null || urlContext === void 0 ? void 0 : urlContext.gameId)) === null || _a === void 0 ? void 0 : _a.gameName;
            }
        }
        catch (e) {
            console.error("[AnalyticsHelper] login error:", e);
        }
    };
    AnalyticsHelper.trackFunction = function (params) {
        try {
            params.page = AnalyticsHelper.playerContext.page;
            params.playerId = AnalyticsHelper.playerContext.playerId;
            AnalyticsHelper.send(commandNames.event, TrackingEvent.Function, params);
        }
        catch (e) {
            console.error("[AnalyticsHelper] trackFunction error:", e);
        }
    };
    AnalyticsHelper.trackPage = function (params) {
        AnalyticsHelper.injectPlayerInfo(params, "client_id");
        AnalyticsHelper.playerContext.page = params === null || params === void 0 ? void 0 : params.page_title;
        AnalyticsHelper.playerContext.language = params === null || params === void 0 ? void 0 : params.language;
        (params === null || params === void 0 ? void 0 : params.page_title) && AnalyticsHelper.send(commandNames.event, eventNames.page_view, params);
        if (params.page_title !== TrackingFunction.Lobby) {
            AnalyticsHelper.trackFunction({ function: TrackingFunction.JoinGame, action: TrackingAction.Show });
        }
    };
    AnalyticsHelper.trackLobby = function () {
        AnalyticsHelper.trackPage({ page_title: TrackingFunction.Lobby });
    };
    AnalyticsHelper.setUser = function (playerId, tagId) {
        if (!tagId) {
            tagId = getAppSettings().googleAnalyticId;
        }
        AnalyticsHelper.send(commandNames.config, tagId, {
            user_id: playerId,
        });
        AnalyticsHelper.send(commandNames.event, TrackingEvent.SSO, __assign(__assign({}, AnalyticsHelper.ssoContext), { playerId: playerId }));
    };
    AnalyticsHelper.send = function (command, event, params) {
        try {
            globalThis.gtag && globalThis.gtag(command, event, params);
        }
        catch (e) {
            console.error("[AnalyticsHelper] send error:", e);
        }
    };
    AnalyticsHelper.playerContext = { playerId: "", page: "", language: "" };
    return AnalyticsHelper;
}());
export { AnalyticsHelper };
