import { useGlobalEventsStore } from "../stores/global-events-store/global-events-store";
// Legacy event types for backward compatibility
export var GlobalTransmitterEvent;
(function (GlobalTransmitterEvent) {
    GlobalTransmitterEvent["BACK_TO_LOBBY"] = "backToLobby";
    GlobalTransmitterEvent["OPEN_GAME_ID"] = "openingGameId";
    GlobalTransmitterEvent["NOTICE"] = "notice";
    GlobalTransmitterEvent["USER_INFO_RED"] = "userInfoRed";
    GlobalTransmitterEvent["CHANGE_AVATAR_ID"] = "avatarId";
    GlobalTransmitterEvent["CLOSE_DIALOG"] = "closeDialog";
})(GlobalTransmitterEvent || (GlobalTransmitterEvent = {}));
// Replacement for GlobalMessageTransmitter.broadcast
export var broadcastGlobalEvent = function (event) {
    useGlobalEventsStore.getState().broadcast(event);
};
// Specific helper functions for common events
export var broadcastBackToLobby = function () {
    useGlobalEventsStore.getState().setBackToLobby(true);
};
export var broadcastOpeningGameId = function (gameId) {
    useGlobalEventsStore.getState().setOpeningGameId(gameId);
};
export var broadcastCloseDialog = function () {
    useGlobalEventsStore.getState().setCloseDialog(true);
};
export var broadcastUserInfoRed = function (userInfo) {
    useGlobalEventsStore.getState().setUserInfoRed(userInfo);
};
export var broadcastAvatarId = function (avatarId) {
    useGlobalEventsStore.getState().setAvatarId(avatarId);
};
// Legacy compatibility function
export var GlobalMessageTransmitter = {
    broadcast: broadcastGlobalEvent,
};
