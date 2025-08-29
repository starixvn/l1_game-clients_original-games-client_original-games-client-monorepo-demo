import { v4 as uuidv4 } from "uuid";
export default function messageTransmitter() {
    var listeners = [];
    var register = function (messageKey, handleMessage) {
        var listenerId = uuidv4();
        listeners.push({ messageKey: messageKey, listenerId: listenerId, handleMessage: handleMessage });
        return listenerId;
    };
    var unsubscribe = function (listenerId) {
        var listenerIndex = listeners.findIndex(function (listener) { return listener.listenerId === listenerId; });
        listenerIndex >= 0 && listeners.splice(listenerIndex, 1);
    };
    var clearAllListener = function () {
        listeners = [];
    };
    var broadcast = function (message) {
        for (var _i = 0, listeners_1 = listeners; _i < listeners_1.length; _i++) {
            var listener = listeners_1[_i];
            if (message[listener.messageKey] != null) {
                listener.handleMessage(message);
            }
        }
    };
    return {
        register: register,
        unsubscribe: unsubscribe,
        clearAllListener: clearAllListener,
        broadcast: broadcast,
    };
}
