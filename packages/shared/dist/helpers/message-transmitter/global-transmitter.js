import messageTransmitter from ".";
export var GlobalMessageTransmitter = messageTransmitter();
export var GlobalTransmitterEvent;
(function (GlobalTransmitterEvent) {
    GlobalTransmitterEvent["BACK_TO_LOBBY"] = "backToLobby";
    GlobalTransmitterEvent["OPEN_GAME_ID"] = "openingGameId";
    GlobalTransmitterEvent["NOTICE"] = "notice";
    GlobalTransmitterEvent["USER_INFO_RED"] = "userInfoRed";
    GlobalTransmitterEvent["CHANGE_AVATAR_ID"] = "avatarId";
    GlobalTransmitterEvent["CLOSE_DIALOG"] = "closeDialog";
})(GlobalTransmitterEvent || (GlobalTransmitterEvent = {}));
export var registerGlobalMessageEvent = function (messageKey, handler) {
    return GlobalMessageTransmitter.register(messageKey, handler);
};
export var unsubscribeGlobalMessageEvent = function (listenerId) {
    GlobalMessageTransmitter.unsubscribe(listenerId);
};
