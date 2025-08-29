export var createSocketSlice = function (set, get, store) { return ({
    socket: null,
    setSocket: function (socket) { return set({ socket: socket }); },
    sendSocketEvent: function (event, data) {
        var _a;
        (_a = get().socket) === null || _a === void 0 ? void 0 : _a.emit(event, data);
    },
}); };
