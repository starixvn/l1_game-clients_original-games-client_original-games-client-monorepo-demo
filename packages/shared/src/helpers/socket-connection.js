import { io } from "socket.io-client";
import MsgpackParser from "socket.io-msgpack-parser";
import { getAppSettings } from "../app-settings";
import { buildServerUrl } from "../helpers";
import { messageEventType } from "@shared/components/game-base/handlers";
import useGameStore from "../stores/game-store/game-store";
import useBettingStore from "../stores/betting-store/betting-store";
export function InitSocketIO(socketInfo, session, gameName, gameMessageHandler) {
    var _a = getAppSettings(), proxy = _a.proxy, enableMsgpackParser = _a.enableMsgpackParser;
    var socketUri = buildServerUrl(socketInfo.namespace);
    var socketOption = {
        forceNew: true,
        transports: ["websocket"],
        path: "".concat(proxy.path, "/").concat(socketInfo.path, "/socket.io"),
        upgrade: false,
        parser: enableMsgpackParser ? MsgpackParser : undefined,
    };
    var socket = io(socketUri, socketOption);
    if (socket) {
        gameMessageHandler.registerSocketEvents();
        useGameStore.getState().setSocket(socket);
        socket.off(gameName).on(gameName, function (message) {
            gameMessageHandler.broadcastGameEvent(message);
            useGameStore.getState().registerEvent(message);
            useBettingStore.getState().registerEvent(message);
        });
        socket.off("message").on("message", function (message) {
            gameMessageHandler.broadcastGameMessage(message);
            useGameStore.getState().registerEvent(message);
        });
        socket.on(messageEventType.SOCKET_CONNECTED, function () {
            var _a;
            socket.emit("signin", session);
            gameMessageHandler.broadcastGameEvent((_a = {}, _a[messageEventType.SOCKET_CONNECTED] = true, _a));
        });
        socket.on(messageEventType.SIGNED_IN, function () {
            var _a;
            socket.emit("inGame", gameName);
            gameMessageHandler.broadcastGameEvent((_a = {}, _a[messageEventType.SIGNED_IN] = true, _a));
        });
        socket.on(messageEventType.SOCKET_CONNECT_ERROR, function () {
            var _a;
            gameMessageHandler.broadcastGameEvent((_a = {}, _a[messageEventType.SOCKET_CONNECT_ERROR] = true, _a));
        });
        socket.on(messageEventType.SOCKET_DISCONNECTED, function () {
            var _a;
            gameMessageHandler.broadcastGameEvent((_a = {}, _a[messageEventType.SOCKET_DISCONNECTED] = true, _a));
        });
    }
    return { socket: socket };
}
export var SocketState;
(function (SocketState) {
    SocketState[SocketState["None"] = 0] = "None";
    SocketState[SocketState["Connected"] = 1] = "Connected";
    SocketState[SocketState["Error"] = 2] = "Error";
    SocketState[SocketState["Disconnected"] = 3] = "Disconnected";
})(SocketState || (SocketState = {}));
