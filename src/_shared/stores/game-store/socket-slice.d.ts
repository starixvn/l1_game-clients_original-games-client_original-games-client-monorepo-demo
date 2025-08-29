import { Socket } from "socket.io-client";
import { StateCreator } from "zustand";
export interface SocketSlice {
    socket: Socket;
    setSocket: (socket: Socket) => void;
    sendSocketEvent: (event: string, data: any) => void;
}
export declare const createSocketSlice: StateCreator<SocketSlice>;
