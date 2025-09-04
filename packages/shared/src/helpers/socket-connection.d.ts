import { SocketInfo } from "@shared/components/game-base/type";
import { GameMessageHandler } from "@shared/components/game-base/handlers";
export declare function InitSocketIO(socketInfo: SocketInfo, session: any, gameName: string, gameMessageHandler: GameMessageHandler): {
    socket: import("socket.io-client").Socket<import("@socket.io/component-emitter").DefaultEventsMap, import("@socket.io/component-emitter").DefaultEventsMap>;
};
export declare enum SocketState {
    None = 0,
    Connected = 1,
    Error = 2,
    Disconnected = 3
}
