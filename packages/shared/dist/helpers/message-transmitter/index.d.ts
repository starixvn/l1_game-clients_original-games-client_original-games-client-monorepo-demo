export default function messageTransmitter(): {
    register: (messageKey: string, handleMessage: Function) => string;
    unsubscribe: (listenerId: string) => void;
    clearAllListener: () => void;
    broadcast: (message: any) => void;
};
