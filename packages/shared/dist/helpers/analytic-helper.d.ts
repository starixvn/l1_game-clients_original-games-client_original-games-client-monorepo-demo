import { SSOResponse } from "sc-user-service-client/dist/auth";
import { URLContextModel } from "../react-contexts";
export declare enum TrackingEvent {
    Function = "function_event",
    SSO = "sso_event"
}
export declare enum TrackingAction {
    ToggleOn = "ToggleOn",
    ToggleOff = "ToggleOff",
    Click = "Click",
    Show = "Show",
    Select = "Select",
    Open = "Open",
    Close = "Close",
    Change = "Change",
    Swipe = "Swipe",
    Create = "Create",
    GenerateRandom = "GenerateRandom"
}
export declare enum TrackingFunction {
    Music = "Music",
    Sound = "Sound",
    PFSetting = "PFSetting",
    PFGuide = "PFGuide",
    BetHistory = "BetHistory",
    BetDetails = "BetDetails",
    GameGuide = "GameGuide",
    PFBetHistory = "PFBetHistory",
    PFClientSeeds = "PFClientSeeds",
    PFVerify = "PFVerify",
    PFExportClientSeeds = "PFExportClientSeeds",
    SelectChip = "SelectChip",
    Banner = "Banner",
    Avatar = "Avatar",
    JoinGame = "JoinGame",
    Nickname = "Nickname",
    Lobby = "Lobby",
    SwitchGame = "SwitchGame"
}
export interface TrackingParameter {
    function: string;
    action?: string;
    page?: string;
    playerId?: string;
}
export declare class AnalyticsHelper {
    private static readonly playerContext;
    private static ssoContext;
    static setPlayerSession(playerSession: SSOResponse): void;
    static injectPlayerInfo(analyticParams: any, propertyName: any): void;
    static trackEvent(event: string, params: TrackingParameter): void;
    static login(urlContext: URLContextModel): void;
    static trackFunction(params: TrackingParameter): void;
    static trackPage(params: {
        page_title: string;
        language?: string;
    }): void;
    static trackLobby(): void;
    static setUser(playerId: string, tagId?: string): void;
    static send(command: string, event: string, params: any): void;
}
